const CORE_SETTINGS_KEY = 'inspectaid.coreAiSettings';

export const CONFIGURED_CORE_API_URL = import.meta.env.VITE_INSPECTORAI_CORE_URL || '';
export const DEFAULT_CORE_API_URL = CONFIGURED_CORE_API_URL || 'https://inspectorai-core.onrender.com';

export function coreControlsEnabled() {
  if (typeof window === 'undefined') return false;
  const params = new URLSearchParams(window.location.search);
  const localHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  return import.meta.env.VITE_ENABLE_CORE_CONTROLS === 'true' || params.get('coreControls') === '1' || localHost;
}

export function coreRuntimeAvailable(baseUrl) {
  return Boolean((baseUrl || '').trim()) && (coreControlsEnabled() || Boolean(CONFIGURED_CORE_API_URL));
}

export function jurisdictionIdForName(jurisdictionName, fallback = 'gwinnett-ga') {
  const normalized = jurisdictionName.toLowerCase();
  if (normalized.includes('gwinnett')) return 'gwinnett-ga';
  if (normalized.includes('fulton')) return 'fulton-ga';
  if (normalized.includes('georgia')) return 'georgia';
  return fallback;
}

export function getStoredCoreSettings() {
  if (typeof window === 'undefined') {
    return { mode: 'demo', baseUrl: DEFAULT_CORE_API_URL, token: '' };
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem(CORE_SETTINGS_KEY) || '{}');
    const coreAllowed = coreControlsEnabled() || Boolean(CONFIGURED_CORE_API_URL);
    const isLocalHost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    const storedBaseUrl = stored.baseUrl || DEFAULT_CORE_API_URL;
    const localDevUrlSaved = /^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i.test(storedBaseUrl);
    const baseUrl = !isLocalHost && localDevUrlSaved ? DEFAULT_CORE_API_URL : storedBaseUrl;
    return {
      mode: stored.mode === 'core' && coreAllowed ? 'core' : 'demo',
      baseUrl,
      token: stored.token || ''
    };
  } catch {
    return { mode: 'demo', baseUrl: DEFAULT_CORE_API_URL, token: '' };
  }
}

export function saveCoreSettings(settings) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CORE_SETTINGS_KEY, JSON.stringify(settings));
}

function normalizeBaseUrl(baseUrl) {
  return (baseUrl || DEFAULT_CORE_API_URL).replace(/\/+$/, '');
}

function mapCoreEvidence(citations = []) {
  return citations.map((citation) => ({
    doc: {
      id: citation.sourceId,
      title: citation.sourceTitle,
      source: citation.sourceTitle,
      version: citation.sourceVersion ?? ''
    },
    section: {
      ref: citation.citation,
      topic: citation.topic,
      page: citation.page,
      text: citation.excerpt,
      severity: citation.severity ?? ''
    }
  }));
}

function displayStatus(status) {
  if (!status) return 'Unsupported';
  return status.toLowerCase() === 'unsupported' ? 'Unsupported' : status;
}

function friendlyCoreError(status, detail = {}) {
  const raw = detail.message || detail.error || '';
  if (detail.error === 'invalid_invite_code') {
    return 'That is not the pilot invite code. Use the invite code from Render, not the OpenAI API key.';
  }
  if (detail.error === 'pilot_auth_not_configured') {
    return 'Core pilot login is not fully configured in Render. Add the pilot invite code and session secret, then redeploy Core.';
  }
  if (detail.error === 'unauthorized') {
    return 'Your Core session is missing or expired. Sign in with the pilot invite code again.';
  }
  if (/insufficient_quota|quota|billing/i.test(raw)) {
    return 'Core AI billing or quota is not available. Demo guidance is still active.';
  }
  if (/OPENAI_API_KEY|api key/i.test(raw)) {
    return 'Core AI is missing a valid provider key. Demo guidance is still active.';
  }
  if (/OpenAI Responses request failed|OpenAI-compatible request failed|Ollama request failed/i.test(raw)) {
    return 'Core AI provider is unavailable right now. Demo guidance is still active.';
  }
  return raw || `InspectorAI Core returned ${status}`;
}

async function postCore(baseUrl, path, body, token = '') {
  const headers = { 'content-type': 'application/json' };
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(`${normalizeBaseUrl(baseUrl)}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const detail = await response.json().catch(() => ({}));
    throw new Error(friendlyCoreError(response.status, detail));
  }

  return response.json();
}

export async function createCorePilotSession({ baseUrl, inviteCode, userLabel = 'InspectorAI pilot' }) {
  const payload = await postCore(baseUrl, '/v1/auth/pilot-login', { inviteCode, userLabel });
  return {
    token: payload.token,
    expiresAt: payload.expiresAt
  };
}

export async function askCoreApprovedSources({ baseUrl, token = '', query, jurisdiction, jurisdictionId }) {
  const payload = await postCore(baseUrl, '/v1/ask', { query, jurisdictionId }, token);
  const response = payload.response ?? {};

  return {
    id: crypto.randomUUID(),
    query,
    jurisdiction,
    status: displayStatus(response.status),
    title: response.title ?? 'InspectorAI Core response',
    body: response.answer ?? '',
    note:
      response.warnings?.join(' ') ||
      'Answer generated through InspectorAI Core with approved-source retrieval and citation validation.',
    evidence: mapCoreEvidence(response.citations),
    runtime: 'core',
    validation: response.validation ?? null,
    audit: payload.audit ?? null,
    createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };
}

export async function inspectionAssistCore({ baseUrl, token = '', jurisdictionId, item, status, observedFacts = '' }) {
  const payload = await postCore(baseUrl, '/v1/inspection-assist', {
    jurisdictionId,
    checklistItemId: item.id,
    checklistItemNumber: `${item.number}${item.letter ?? ''}`,
    checklistItemLabel: item.short,
    status,
    observedFacts
  }, token);
  const response = payload.response ?? {};
  const evidence = mapCoreEvidence(response.citations);

  return {
    evidence,
    title: `${item.number}${item.letter ? item.letter : ''}: ${item.short}`,
    body: response.answer || 'InspectorAI Core did not return guidance for this item.',
    suggestedNote:
      response.status?.toLowerCase() === 'unsupported'
        ? 'Core could not map this item to an approved citation. Use supervisor review before relying on AI guidance.'
        : 'Core returned approved-source guidance. Document observed condition, location, measurement if applicable, corrective action, and whether correction occurred.',
    runtime: 'core',
    validation: response.validation ?? null,
    audit: payload.audit ?? null
  };
}

export async function photoAssistCore({ baseUrl, token = '', jurisdictionId, imageDataUrl, context = '' }) {
  const payload = await postCore(baseUrl, '/v1/photo-assist', {
    jurisdictionId,
    imageDataUrl,
    context
  }, token);
  const response = payload.response ?? {};

  return {
    title: response.title ?? 'AI photo review',
    summary: response.summary || response.answer || 'Photo reviewed. Confirm facts in the field before citing.',
    findings: (response.findings ?? []).map((finding, index) => ({
      label: finding.label || `Photo finding ${index + 1}`,
      risk: finding.risk || 'Possible inspection concern visible in the uploaded image.',
      verification: finding.verification || 'Confirm the condition in person before citing.',
      topic: finding.topic || 'Evidence capture',
      confidence: finding.confidence || 'low',
      evidence: mapCoreEvidence(response.citations)
    })),
    limitations: response.limitations ?? [],
    evidence: mapCoreEvidence(response.citations),
    runtime: 'core',
    validation: response.validation ?? null,
    audit: payload.audit ?? null
  };
}
