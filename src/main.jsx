import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  BadgeCheck,
  BookOpen,
  Camera,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  CloudOff,
  FileDown,
  FileCheck2,
  FileSearch,
  Filter,
  Gavel,
  History,
  ListChecks,
  Loader2,
  MapPin,
  MessageSquareText,
  Mic,
  Moon,
  Plus,
  PenLine,
  Radio,
  Search,
  Send,
  Save,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Upload,
  Wifi,
  X
} from 'lucide-react';
import './styles.css';

const APPROVED_DOCS = [
  {
    id: 'gwinnett-food-code-2025',
    title: 'Gwinnett County Food Code Field References',
    jurisdiction: 'Gwinnett County GA',
    source: 'Gwinnett County Environmental Health',
    status: 'Approved',
    version: '2026.1',
    effective: '2026-01-01',
    expires: '2027-01-01',
    owner: 'Food Service Program',
    sections: [
      {
        ref: '81.09(a)',
        page: 42,
        severity: 'Critical',
        topic: 'Cold holding',
        text:
          'Time/temperature control for safety food held cold must be maintained at 41 F or below, except during active preparation or other approved limited periods.'
      },
      {
        ref: '81.09(b)',
        page: 43,
        severity: 'Critical',
        topic: 'Hot holding',
        text:
          'Time/temperature control for safety food held hot must be maintained at 135 F or above unless a written, approved time-control procedure is in use.'
      },
      {
        ref: '81.07(c)',
        page: 29,
        severity: 'Critical',
        topic: 'Handwashing',
        text:
          'Employees must wash hands at a dedicated handwashing sink before food preparation, after contamination events, and after handling raw animal foods.'
      },
      {
        ref: '81.17(d)',
        page: 68,
        severity: 'General',
        topic: 'Date marking',
        text:
          'Ready-to-eat refrigerated food prepared on site and held more than 24 hours must be clearly date marked and discarded within the approved holding period.'
      },
      {
        ref: '2-102.11',
        page: 18,
        severity: 'Priority Foundation',
        topic: 'Person in charge',
        text:
          'The person in charge must be present during food service operations, demonstrate knowledge of food safety requirements, and ensure employees follow required procedures.'
      },
      {
        ref: '2-201.11',
        page: 21,
        severity: 'Priority',
        topic: 'Employee health',
        text:
          'Food employees with reportable symptoms or diagnoses must be restricted or excluded as required, and the person in charge must apply employee health reporting procedures.'
      },
      {
        ref: '3-201.11',
        page: 36,
        severity: 'Priority',
        topic: 'Approved source',
        text:
          'Food must be obtained from sources that comply with law and must be safe, unadulterated, and honestly presented when received and used.'
      },
      {
        ref: '3-302.11',
        page: 49,
        severity: 'Priority',
        topic: 'Protection from contamination',
        text:
          'Food must be protected from cross-contamination by separating raw animal foods, ready-to-eat foods, equipment, utensils, and other contamination sources.'
      },
      {
        ref: '4-601.11(A)',
        page: 86,
        severity: 'Priority Foundation',
        topic: 'Food-contact surfaces',
        text:
          'Equipment food-contact surfaces and utensils must be clean to sight and touch before use and after interruption that may contaminate them.'
      },
      {
        ref: '5-205.11',
        page: 108,
        severity: 'Priority Foundation',
        topic: 'Handwashing facilities',
        text:
          'A handwashing sink must be maintained accessible at all times for employee use and may not be used for purposes other than handwashing.'
      }
    ]
  },
  {
    id: 'ga-food-service-rules-2025',
    title: 'Georgia Food Service Rules and Regulations 511-6-1',
    jurisdiction: 'Georgia',
    appliesTo: ['Gwinnett County GA', 'Fulton County GA'],
    source: 'Georgia Department of Public Health / Georgia Secretary of State',
    status: 'Approved',
    version: '2025 revision',
    effective: '2025-02-12',
    expires: 'Superseded by state rule update',
    owner: 'Georgia Department of Public Health',
    sections: [
      {
        ref: '511-6-1-.01',
        page: 1,
        severity: 'Reference',
        topic: 'Definitions',
        text:
          'Georgia Rule 511-6-1 defines the controlling food service terms that should be used when interpreting inspection findings and checklist language.'
      },
      {
        ref: '511-6-1-.02',
        page: 8,
        severity: 'Administrative',
        topic: 'Administration',
        text:
          'Food service permits, responsibilities, inspection authority, and enforcement administration are controlled through Georgia Rule 511-6-1.'
      },
      {
        ref: '511-6-1-.03(1)',
        page: 12,
        severity: 'Priority Foundation',
        topic: 'Person in charge',
        text:
          'The person in charge is responsible for active managerial control, employee supervision, and demonstrating knowledge of food safety requirements during operation.'
      },
      {
        ref: '511-6-1-.03(2)',
        page: 14,
        severity: 'Priority',
        topic: 'Employee health',
        text:
          'The food service establishment must manage employee illness reporting, exclusions, and restrictions when symptoms or diagnosed illnesses create risk of foodborne disease transmission.'
      },
      {
        ref: '511-6-1-.04(4)(a)',
        page: 31,
        severity: 'Priority',
        topic: 'Approved source',
        text:
          'Food must be safe, unadulterated, honestly presented, and obtained from sources that comply with law before it is received or offered for service.'
      },
      {
        ref: '511-6-1-.04(4)(c)',
        page: 45,
        severity: 'Priority',
        topic: 'Cold holding',
        text:
          'Time/temperature control for safety food held cold is expected to remain at 41 F or below unless a rule-recognized exception or approved time-control procedure applies.'
      },
      {
        ref: '511-6-1-.04(4)(c)',
        page: 46,
        severity: 'Priority',
        topic: 'Hot holding',
        text:
          'Time/temperature control for safety food held hot is expected to remain at 135 F or above unless a rule-recognized exception or approved time-control procedure applies.'
      },
      {
        ref: '511-6-1-.04(6)',
        page: 57,
        severity: 'Priority',
        topic: 'Protection from contamination',
        text:
          'Food must be protected from cross-contamination during storage, preparation, holding, display, and service, including separation of raw animal foods and ready-to-eat foods.'
      },
      {
        ref: '511-6-1-.04(7)',
        page: 63,
        severity: 'Priority Foundation',
        topic: 'Date marking',
        text:
          'Ready-to-eat time/temperature control for safety food held under refrigeration must be marked and controlled so the holding period can be verified.'
      },
      {
        ref: '511-6-1-.05',
        page: 78,
        severity: 'Priority Foundation',
        topic: 'Food-contact surfaces',
        text:
          'Equipment and utensils must be designed, maintained, cleaned, and sanitized so food-contact surfaces do not contaminate food.'
      },
      {
        ref: '511-6-1-.06',
        page: 96,
        severity: 'Priority Foundation',
        topic: 'Handwashing facilities',
        text:
          'Plumbing and handwashing facilities must be available, supplied, accessible, and used in a way that supports required employee handwashing.'
      },
      {
        ref: '511-6-1-.07',
        page: 114,
        severity: 'Core',
        topic: 'Physical facilities',
        text:
          'The physical facility must be maintained so floors, walls, ceilings, lighting, ventilation, and premises conditions do not create food safety risks.'
      },
      {
        ref: '511-6-1-.10',
        page: 141,
        severity: 'Administrative',
        topic: 'Enforcement',
        text:
          'Compliance actions should be tied to the controlling Georgia rule, inspection findings, correction status, and local enforcement procedures.'
      }
    ]
  },
  {
    id: 'ga-food-service-interpretation-manual-2025',
    title: 'Georgia Food Service Interpretation Manual',
    jurisdiction: 'Georgia',
    appliesTo: ['Gwinnett County GA', 'Fulton County GA'],
    source: 'Georgia Department of Public Health',
    status: 'Approved',
    version: 'February 2025 update',
    effective: '2025-02-12',
    expires: 'Superseded by state manual update',
    owner: 'Georgia Department of Public Health',
    sections: [
      {
        ref: 'DPH Manual · Public health reasons',
        page: 6,
        severity: 'Guidance',
        topic: 'Public health reason',
        text:
          'Inspection decisions should connect the observed condition to the public health reason behind the rule, especially for priority and priority foundation items.'
      },
      {
        ref: 'DPH Manual · Marking instructions',
        page: 18,
        severity: 'Procedure',
        topic: 'Evidence capture',
        text:
          'Inspection marking should distinguish compliant, out-of-compliance, not applicable, and not observed findings, and should preserve clear notes for cited out items.'
      },
      {
        ref: 'DPH Manual · Temperature chart',
        page: 41,
        severity: 'Guidance',
        topic: 'Cold holding',
        text:
          'Temperature findings should include the food item, measured temperature, equipment or location, time context when relevant, and corrective action taken or required.'
      },
      {
        ref: 'DPH Manual · Corrective actions',
        page: 64,
        severity: 'Procedure',
        topic: 'Corrective action',
        text:
          'Corrective action language should state what was corrected during inspection or what must be corrected by the assigned date, tied to the observed out item.'
      },
      {
        ref: 'DPH Manual · Employee health tools',
        page: 73,
        severity: 'Guidance',
        topic: 'Employee health',
        text:
          'Employee health review should verify reporting awareness, symptom controls, exclusion or restriction decisions, and documentation when illness risk is observed.'
      }
    ]
  },
  {
    id: 'fulton-food-code-2025',
    title: 'Fulton County Food Protection Field Manual',
    jurisdiction: 'Fulton County GA',
    source: 'Fulton County Board of Health',
    status: 'Approved',
    version: '2026.0',
    effective: '2026-03-15',
    expires: '2027-03-15',
    owner: 'Food Protection Program',
    sections: [
      {
        ref: '3-501.16(A)(2)',
        page: 57,
        severity: 'Priority',
        topic: 'Cold holding',
        text:
          'Refrigerated time/temperature control for safety food must be maintained at 41 F or less during storage, display, and service.'
      },
      {
        ref: '2-301.14',
        page: 22,
        severity: 'Priority',
        topic: 'Handwashing',
        text:
          'Food employees must clean hands and exposed portions of arms after touching bare human body parts, using the toilet room, coughing, sneezing, eating, or handling soiled equipment.'
      },
      {
        ref: '4-601.11(A)',
        page: 88,
        severity: 'Priority Foundation',
        topic: 'Food-contact surfaces',
        text:
          'Equipment food-contact surfaces and utensils must be clean to sight and touch before use and after any interruption that may contaminate them.'
      }
    ]
  },
  {
    id: 'gwinnett-inspection-sop-2025',
    title: 'Import-Food 2025 Inspection Form and Field SOP',
    jurisdiction: 'Gwinnett County GA',
    source: 'Gwinnett County Environmental Health',
    status: 'Approved',
    version: '2026.2',
    effective: '2026-05-01',
    expires: '2026-12-31',
    owner: 'Food Service Program',
    sections: [
      {
        ref: 'SOP-14.2',
        page: 13,
        severity: 'Procedure',
        topic: 'Evidence capture',
        text:
          'Inspection notes must identify the observed condition, measured value when applicable, location, corrective action requested, and whether correction occurred during inspection.'
      },
      {
        ref: 'SOP-21.4',
        page: 31,
        severity: 'Procedure',
        topic: 'Embargo',
        text:
          'Food may be embargoed when adulteration, unsafe temperature exposure, or loss of source integrity is documented and a supervisor confirms the action.'
      },
      {
        ref: 'SOP-18.7',
        page: 25,
        severity: 'Procedure',
        topic: 'Photo review',
        text:
          'Photo evidence may support inspection findings only when the inspector confirms location, date, observed condition, and the applicable code reference.'
      }
    ]
  }
];

const HEALTH_DEPARTMENTS = [
  {
    id: 'gwinnett-ga',
    name: 'Gwinnett County GA',
    agency: 'Gwinnett County Environmental Health',
    docs: [
      'gwinnett-food-code-2025',
      'ga-food-service-rules-2025',
      'ga-food-service-interpretation-manual-2025',
      'gwinnett-inspection-sop-2025'
    ],
    checklist: 'Import-Food 2025',
    status: 'Ready'
  },
  {
    id: 'fulton-ga',
    name: 'Fulton County GA',
    agency: 'Fulton County Board of Health',
    docs: ['fulton-food-code-2025', 'ga-food-service-rules-2025', 'ga-food-service-interpretation-manual-2025'],
    checklist: 'Food Protection Field Manual',
    status: 'Pilot'
  }
];

const FDA_FOOD_CODE_PRELOAD = [
  {
    id: 'fda-food-code-2022-official',
    title: 'FDA Food Code 2022',
    jurisdiction: 'United States',
    authority: 'U.S. Food and Drug Administration',
    version: '2022, January 18 2023 version',
    effective: '2023-01-18',
    status: 'Available',
    scope: 'Model code',
    sourceUrl: 'https://www.fda.gov/food/fda-food-code/food-code-2022',
    fingerprint: 'fda-food-code:2022:2023-01-18'
  },
  {
    id: 'fda-food-code-2022-supplement',
    title: 'Supplement to the FDA Food Code 2022',
    jurisdiction: 'United States',
    authority: 'U.S. Food and Drug Administration',
    version: '2022 Supplement, December 2024 corrections',
    effective: '2024-12-01',
    status: 'Available',
    scope: 'Model code supplement',
    sourceUrl: 'https://www.fda.gov/food/fda-food-code/food-code-2022',
    fingerprint: 'fda-food-code-supplement:2022:2024-12'
  },
  {
    id: 'fda-food-code-2017-official',
    title: 'FDA Food Code 2017',
    jurisdiction: 'United States',
    authority: 'U.S. Food and Drug Administration',
    version: '2017',
    effective: '2017-01-01',
    status: 'Available',
    scope: 'Model code',
    sourceUrl: 'https://www.fda.gov/food/fda-food-code/food-code-2017',
    fingerprint: 'fda-food-code:2017'
  },
  {
    id: 'fda-food-code-2017-supplement',
    title: 'Supplement to the FDA Food Code 2017',
    jurisdiction: 'United States',
    authority: 'U.S. Food and Drug Administration',
    version: '2017 Supplement',
    effective: '2019-01-01',
    status: 'Available',
    scope: 'Model code supplement',
    sourceUrl: 'https://www.fda.gov/food/fda-food-code/food-code-2017',
    fingerprint: 'fda-food-code-supplement:2017'
  }
];

const STATE_NAMES = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming'
];

const STATE_CODE_PRELOAD = STATE_NAMES.map((state) => ({
  id: `state-code-${state.toLowerCase().replaceAll(' ', '-')}`,
  title: `${state} current retail and food service code locator`,
  jurisdiction: state,
  authority: `${state} state retail food regulatory authority`,
  version: 'Current source verification needed',
  effective: 'Pending verification',
  status: state === 'Georgia' ? 'Available' : 'Needs verification',
  scope: 'State food code locator',
  sourceUrl: 'https://www.fda.gov/food/fda-food-code/state-retail-and-food-service-codes-and-regulations-state',
  fingerprint: `state-food-code:${state.toLowerCase().replaceAll(' ', '-')}:pending-current`
}));

const MASTER_CODE_LIBRARY = APPROVED_DOCS.map((doc) => ({
  id: doc.id,
  title: doc.title,
  jurisdiction: doc.jurisdiction,
  authority: doc.source,
  version: doc.version,
  effective: doc.effective,
  status: doc.status,
  scope: doc.id.includes('sop') ? 'Local SOP / form' : 'Official code reference',
  fingerprint: `${doc.id}:${doc.version}`
})).concat(FDA_FOOD_CODE_PRELOAD, STATE_CODE_PRELOAD);

const REQUIRED_SOURCE_TOPICS = [
  'Definitions',
  'Administration',
  'Person in charge',
  'Employee health',
  'Approved source',
  'Protection from contamination',
  'Cold holding',
  'Hot holding',
  'Date marking',
  'Food-contact surfaces',
  'Handwashing facilities',
  'Physical facilities',
  'Evidence capture',
  'Corrective action',
  'Enforcement'
];

const QUICK_PROMPTS = [
  'Cold holding chicken at 48 F in Gwinnett County',
  'When do I cite handwashing?',
  'Can I embargo food after temperature abuse?',
  'What should my inspection note include?',
  'Food-contact surface not clean before use'
];

const PHOTO_SIGNALS = [
  {
    label: 'Thermometer / temperature display',
    topic: 'Cold holding',
    risk: 'Check whether the measured food temperature is 41 F or below for cold-held TCS foods.'
  },
  {
    label: 'Hand sink blocked or missing supplies',
    topic: 'Handwashing',
    risk: 'Verify dedicated handwashing access, soap, drying method, and recent employee behavior.'
  },
  {
    label: 'Residue on slicer, cutting board, or utensil',
    topic: 'Food-contact surfaces',
    risk: 'Confirm surfaces are clean to sight and touch before use.'
  },
  {
    label: 'Prepared food container without date label',
    topic: 'Date marking',
    risk: 'Check whether ready-to-eat refrigerated food is held over 24 hours and needs a discard date.'
  }
];

const FEATURES = [
  { id: 'ask', label: 'Ask', icon: MessageSquareText },
  { id: 'inspection', label: 'AI Inspection', icon: Sparkles },
  { id: 'configure', label: 'Configure', icon: SlidersHorizontal },
  { id: 'photo', label: 'Photo Aid', icon: Camera },
  { id: 'workflow', label: 'Workflow', icon: ClipboardCheck },
  { id: 'knowledge', label: 'Knowledge', icon: FileCheck2 }
];

const CHECKLIST_ITEMS = [
  ['Supervision', '1-2', 'A', 'PIC present, demonstrates knowledge, performs duties'],
  ['Supervision', '1-2', 'B', 'Certified Food Protection Manager'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-1', 'A', 'Proper use of restriction and exclusion'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-1', 'B', 'Hands clean and properly washed'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-1', 'C', 'No bare hand contact with ready-to-eat foods or approved alternate method properly followed'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-2', 'A', 'Management knowledge, responsibilities, reporting'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-2', 'B', 'Proper eating, tasting, drinking, or tobacco use'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-2', 'C', 'No discharge from eyes, nose, and mouth'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-2', 'D', 'Adequate handwashing facilities supplied & accessible'],
  ['Employee Health, Good Hygienic Practices, Preventing Contamination by Hand', '2-2', 'E', 'Response procedures for vomiting & diarrheal events'],
  ['Approved Source', '3-1', 'A', 'Food obtained from approved source'],
  ['Approved Source', '3-1', 'B', 'Food received at proper temperature'],
  ['Approved Source', '3-1', 'C', 'Food in good condition, safe, and unadulterated'],
  ['Approved Source', '3-1', 'D', 'Required records: shellstock tags, parasite destruction'],
  ['Protection From Contamination', '4-1', 'A', 'Food separated and protected'],
  ['Protection From Contamination', '4-1', 'B', 'Proper disposition of returned, previously served, reconditioned, and unsafe food'],
  ['Protection From Contamination', '4-2', 'A', 'Food stored covered'],
  ['Protection From Contamination', '4-2', 'B', 'Food-contact surfaces: cleaned & sanitized'],
  ['Cooking and Reheating of TCS Foods, Consumer Advisory', '5-1', 'A', 'Proper cooking time and temperatures'],
  ['Cooking and Reheating of TCS Foods, Consumer Advisory', '5-1', 'B', 'Proper reheating procedures for hot holding'],
  ['Cooking and Reheating of TCS Foods, Consumer Advisory', '5-2', '', 'Consumer advisory provided for raw and undercooked foods'],
  ['Holding of TCS Foods, Date Marking of TCS Foods', '6-1', 'A', 'Proper cold holding temperatures'],
  ['Holding of TCS Foods, Date Marking of TCS Foods', '6-1', 'B', 'Proper hot holding temperatures'],
  ['Holding of TCS Foods, Date Marking of TCS Foods', '6-1', 'C', 'Proper cooling time and temperature'],
  ['Holding of TCS Foods, Date Marking of TCS Foods', '6-1', 'D', 'Time as a public health control: procedures and records'],
  ['Holding of TCS Foods, Date Marking of TCS Foods', '6-2', '', 'Proper date marking and disposition'],
  ['Highly Susceptible Populations', '7-1', '', 'Pasteurized foods used: Prohibited foods not offered'],
  ['Chemicals', '8-2', 'A', 'Food additives: approved and properly used'],
  ['Chemicals', '8-2', 'B', 'Toxic substances properly identified, stored, used'],
  ['Conformance with Approved Procedures', '9-2', '', 'Compliance with variance, specialized process and HACCP plan'],
  ['Safe Food and Water, Food Identification', '10', 'A', 'Pasteurized eggs used where required'],
  ['Safe Food and Water, Food Identification', '10', 'B', 'Water and ice from approved source'],
  ['Safe Food and Water, Food Identification', '10', 'C', 'Variance obtained for specialized processing methods'],
  ['Safe Food and Water, Food Identification', '10', 'D', 'Food properly labeled; original container'],
  ['Food Temperature Control', '11', 'A', 'Proper cooling methods used: adequate equipment for temperature control'],
  ['Food Temperature Control', '11', 'B', 'Plant food properly cooked for hot holding'],
  ['Food Temperature Control', '11', 'C', 'Approved thawing methods used'],
  ['Food Temperature Control', '11', 'D', 'Thermometers provided and accurate'],
  ['Prevention of Food Contamination', '12', 'A', 'Contamination prevented during food preparation, storage, display'],
  ['Prevention of Food Contamination', '12', 'B', 'Personal cleanliness'],
  ['Prevention of Food Contamination', '12', 'C', 'Wiping cloths: properly used and stored'],
  ['Prevention of Food Contamination', '12', 'D', 'Washing fruits and vegetables'],
  ['Postings and Compliance with Clean Air Act', '13', 'A', 'Posted: Permit/Inspection/Choking Poster/Handwashing'],
  ['Postings and Compliance with Clean Air Act', '13', 'B', 'Compliance with Georgia Smoke Free Air Act'],
  ['Proper Use of Utensils', '14', 'A', 'In-use utensils: properly stored'],
  ['Proper Use of Utensils', '14', 'B', 'Utensils, equipment and linens: properly stored, dried, handled'],
  ['Proper Use of Utensils', '14', 'C', 'Single-use/single-service articles: properly stored, used'],
  ['Proper Use of Utensils', '14', 'D', 'Gloves used properly'],
  ['Utensils, Equipment and Vending', '15', 'A', 'Food and nonfood-contact surfaces cleanable, properly designed, constructed, and used'],
  ['Utensils, Equipment and Vending', '15', 'B', 'Warewashing facilities: installed, maintained, used; test strips'],
  ['Utensils, Equipment and Vending', '15', 'C', 'Nonfood-contact surfaces clean'],
  ['Water, Plumbing and Waste', '16', 'A', 'Hot and cold water available; adequate pressure'],
  ['Water, Plumbing and Waste', '16', 'B', 'Plumbing installed; proper backflow devices'],
  ['Water, Plumbing and Waste', '16', 'C', 'Sewage and waste water properly disposed'],
  ['Physical Facilities', '17', 'A', 'Toilet facilities: properly constructed, supplied, cleaned'],
  ['Physical Facilities', '17', 'B', 'Garbage/refuse properly disposed; facilities maintained'],
  ['Physical Facilities', '17', 'C', 'Physical facilities installed, maintained, and clean'],
  ['Physical Facilities', '17', 'D', 'Adequate ventilation and lighting; designated areas used'],
  ['Pest and Animal Control', '18', '', 'Insects, rodents, and animals not present']
].map(([category, number, letter, short], index) => ({
  id: `${number}-${letter || 'base'}-${index}`,
  category,
  number,
  letter,
  short,
  sort: index + 1
}));

const INSPECTION_STATUSES = [
  { id: 'IN', label: 'In', description: 'In compliance' },
  { id: 'OUT', label: 'Out', description: 'Out of compliance' },
  { id: 'NA', label: 'N/A', description: 'Not applicable' },
  { id: 'NO', label: 'N/O', description: 'Not observed' }
];

const CHECKLIST_VIEW_FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'unmarked', label: 'Unmarked' },
  { id: 'out', label: 'Out' },
  { id: 'done', label: 'Done' }
];

const VIOLATION_STATUS_OPTIONS = ['Violation', 'Repeat', 'COS'];

const VIOLATION_HISTORY = {
  '1-2-A-0': [
    {
      date: '06/18/2025',
      status: 'Out',
      citation: '511-6-1-.03(1)',
      observation:
        'Person in charge did not demonstrate adequate knowledge of food safety requirements during inspection.',
      correctiveAction:
        'PIC was instructed to maintain active managerial control and review required food safety procedures with staff.'
    }
  ]
};

const CANNED_VIOLATION_COMMENTS = [
  'Observed condition does not meet the approved food code requirement. Corrective action was discussed with the person in charge.',
  'Food item was observed outside approved temperature control limits. Product disposition and corrective action must be documented.',
  'Handwashing or handwashing facility condition was not in compliance at the time of inspection.',
  'Food-contact surface or equipment was not clean to sight and touch before use.',
  'Required records, labels, or date marking were missing or incomplete at the time of inspection.'
];

const CANNED_CORRECTIVE_ACTIONS = [
  'Correct violation immediately and maintain active managerial control to prevent recurrence.',
  'Discard affected food or rapidly return it to approved temperature control only if allowed by code and supervisor policy.',
  'Wash hands at an approved handwashing sink and restock or unblock handwashing facilities before resuming food work.',
  'Clean and sanitize affected food-contact surfaces before use.',
  'Provide required records, labels, dates, or written procedures and maintain them for review.'
];

const TEMPERATURE_STANDARDS = [
  {
    id: 'cold',
    label: 'Cold holding',
    limitLabel: '41 F max',
    violationItemNumber: '6-1',
    violationItemLetter: 'A',
    isViolation: (value) => value > 41,
    defaultCorrectiveAction:
      'Rapidly cool, move to approved cold holding, or discard affected TCS food as required. Maintain cold holding at 41 F or below.'
  },
  {
    id: 'hot',
    label: 'Hot holding',
    limitLabel: '135 F min',
    violationItemNumber: '6-1',
    violationItemLetter: 'B',
    isViolation: (value) => value < 135,
    defaultCorrectiveAction:
      'Reheat, restore approved hot holding, or discard affected TCS food as required. Maintain hot holding at 135 F or above.'
  }
];

const DEFAULT_FINALIZE_INFO = {
  establishmentName: 'Demo Food Service',
  address: '455 Grayson Hwy',
  cityStateZip: 'Lawrenceville, GA 30046',
  permitNumber: 'FS-2026-001',
  cfsm: '',
  inspectionType: 'Routine',
  timeIn: '09:15',
  timeOut: '',
  followUpRequired: 'No',
  notes: ''
};

function escapePdfText(value) {
  return String(value ?? '').replaceAll('\\', '\\\\').replaceAll('(', '\\(').replaceAll(')', '\\)');
}

function wrapPdfText(value, maxLength = 88) {
  const words = String(value ?? '').split(/\s+/).filter(Boolean);
  const lines = [];
  let line = '';
  words.forEach((word) => {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxLength) {
      if (line) lines.push(line);
      line = word;
    } else {
      line = next;
    }
  });
  if (line) lines.push(line);
  return lines.length ? lines : [''];
}

function buildInspectionPdf(record) {
  const pageWidth = 612;
  const pageHeight = 792;
  const margin = 44;
  const pages = [];
  let lines = [];
  let y = pageHeight - margin;

  const pushPage = () => {
    pages.push(lines);
    lines = [];
    y = pageHeight - margin;
  };

  const addText = (text, size = 10, x = margin, spacing = 15) => {
    if (y < margin + 32) pushPage();
    lines.push(`BT /F1 ${size} Tf ${x} ${y} Td (${escapePdfText(text)}) Tj ET`);
    y -= spacing;
  };

  const addWrapped = (text, size = 10, x = margin, maxLength = 88) => {
    wrapPdfText(text, maxLength).forEach((line) => addText(line, size, x, size + 4));
  };

  addText('GNR Public Health - Food Service Establishment Inspection Report', 16);
  addText(`Inspection ID: ${record.id}`, 9);
  addText(`Saved: ${record.savedAt}`, 9);
  addText(`Jurisdiction: ${record.department}`, 10);
  addText(`Establishment: ${record.info.establishmentName || '-'}`, 11);
  addText(`Address: ${record.info.address || '-'} ${record.info.cityStateZip || ''}`, 10);
  addText(`Permit: ${record.info.permitNumber || '-'}   CFSM: ${record.info.cfsm || '-'}`, 10);
  addText(`Type: ${record.info.inspectionType}   Time in: ${record.info.timeIn || '-'}   Time out: ${record.info.timeOut || '-'}`, 10);
  addText(`Follow-up required: ${record.info.followUpRequired}`, 10);
  addText(`Score: ${record.violations.length ? 'Draft' : '100'}   OUT violations: ${record.violations.length}`, 11);
  addText('Signatures', 13, margin, 18);
  addText(`Operator signature captured: ${record.signatures.operator ? 'Yes' : 'No'}`, 10);
  addText(`Inspector signature captured: ${record.signatures.inspector ? 'Yes' : 'No'}`, 10);

  if (record.info.notes) {
    addText('Final notes', 13, margin, 18);
    addWrapped(record.info.notes);
  }

  addText('Temperature Observations', 13, margin, 18);
  if (record.temperatureReadings.length) {
    record.temperatureReadings.forEach((reading, index) => {
      addWrapped(`${index + 1}. ${reading.item || 'Item'} - ${reading.temperature || '-'} - ${reading.location || 'Location'} - ${reading.standardLabel} (${reading.limitLabel})`);
    });
  } else {
    addText('No temperature readings recorded.', 10);
  }

  addText('Checklist Status Summary', 13, margin, 18);
  record.checklist.forEach((item) => {
    addWrapped(`${item.number}${item.letter || ''}. ${item.short}: ${item.status || '-'}`, 9, margin, 98);
  });

  addText('Observations and Corrective Actions', 13, margin, 18);
  if (record.violations.length) {
    record.violations.forEach((violation) => {
      addWrapped(`${violation.number}${violation.letter || ''}. ${violation.short} - ${violation.violationStatus}`);
      addWrapped(`Observation: ${violation.comment || 'No observation entered.'}`, 9, margin + 14, 92);
      addWrapped(`Corrective action: ${violation.correctiveAction || 'No corrective action entered.'}`, 9, margin + 14, 92);
      if (violation.correctByDate) addText(`Correct by: ${violation.correctByDate}`, 9, margin + 14);
    });
  } else {
    addText('No OUT violations recorded.', 10);
  }

  if (!pages.length || lines.length) pushPage();

  const objects = [];
  const addObject = (content) => {
    objects.push(content);
    return objects.length;
  };
  const fontId = addObject('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  const pageIds = [];
  const contentIds = [];

  pages.forEach((pageLines) => {
    const stream = pageLines.join('\n');
    const contentId = addObject(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
    contentIds.push(contentId);
    pageIds.push(null);
  });

  pages.forEach((_, index) => {
    const pageId = addObject(`<< /Type /Page /Parent ${objects.length + pages.length - index + 1} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentIds[index]} 0 R >>`);
    pageIds[index] = pageId;
  });
  const kids = pageIds.map((id) => `${id} 0 R`).join(' ');
  const pagesId = addObject(`<< /Type /Pages /Kids [${kids}] /Count ${pages.length} >>`);
  pageIds.forEach((pageId, index) => {
    const contentId = contentIds[index];
    objects[pageId - 1] = `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
  });
  const catalogId = addObject(`<< /Type /Catalog /Pages ${pagesId} 0 R >>`);

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  return new Blob([pdf], { type: 'application/pdf' });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildInspectionCsv(record) {
  const rows = [
    ['inspection_id', record.id],
    ['saved_at', record.savedAt],
    ['department', record.department],
    ['establishment_name', record.info.establishmentName],
    ['address', record.info.address],
    ['city_state_zip', record.info.cityStateZip],
    ['permit_number', record.info.permitNumber],
    ['inspection_type', record.info.inspectionType],
    ['time_in', record.info.timeIn],
    ['time_out', record.info.timeOut],
    ['follow_up_required', record.info.followUpRequired],
    ['out_violation_count', record.violations.length],
    [],
    ['violations'],
    ['item', 'status', 'correct_by', 'observation', 'corrective_action'],
    ...record.violations.map((violation) => [
      `${violation.number}${violation.letter || ''} ${violation.short}`,
      violation.violationStatus,
      violation.correctByDate,
      violation.comment,
      violation.correctiveAction
    ]),
    [],
    ['temperature_readings'],
    ['location', 'item', 'temperature', 'standard'],
    ...record.temperatureReadings.map((reading) => [
      reading.location,
      reading.item,
      reading.temperature,
      `${reading.standardLabel} ${reading.limitLabel}`
    ])
  ];
  return rows.map((row) => row.map((cell) => `"${String(cell ?? '').replaceAll('"', '""')}"`).join(',')).join('\n');
}

function SignaturePad({ label, value, onChange }) {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || value) return;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, [value]);

  function pointForEvent(event) {
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * canvasRef.current.width,
      y: ((event.clientY - rect.top) / rect.height) * canvasRef.current.height
    };
  }

  function startDrawing(event) {
    event.preventDefault();
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const point = pointForEvent(event);
    drawingRef.current = true;
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.strokeStyle = '#1f6f5b';
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  function draw(event) {
    if (!drawingRef.current) return;
    event.preventDefault();
    const context = canvasRef.current.getContext('2d');
    const point = pointForEvent(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function stopDrawing() {
    if (!drawingRef.current) return;
    drawingRef.current = false;
    onChange(canvasRef.current.toDataURL('image/png'));
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.fillStyle = '#fff';
    context.fillRect(0, 0, canvas.width, canvas.height);
    onChange('');
  }

  return (
    <div className="signature-pad">
      <div>
        <strong>{label}</strong>
        <button type="button" onClick={clearSignature}>Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width="620"
        height="170"
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
      />
      <small>{value ? 'Signature captured' : 'Sign in the box'}</small>
    </div>
  );
}

const WIZARD_STEPS = [
  'Jurisdiction',
  'Trusted sources',
  'Draft checklist',
  'Approval',
  'Versioned profile'
];

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9. ]/g, ' ');
}

function tokenize(value) {
  return normalize(value)
    .split(/\s+/)
    .filter((word) => word.length > 2 && !['the', 'and', 'for', 'with', 'that', 'this', 'what', 'when'].includes(word));
}

function scoreSection(query, doc, section) {
  const words = tokenize(query);
  const haystack = normalize(`${doc.jurisdiction} ${doc.title} ${section.topic} ${section.text} ${section.ref}`);
  const exactTopic = normalize(query).includes(normalize(section.topic));
  const wordScore = words.reduce((score, word) => score + (haystack.includes(word) ? 1 : 0), 0);
  const tempBoost = /\b(41|48|cold|refrigerat|temperature|tcs)\b/i.test(query) && /cold|temperature|tcs|41/i.test(haystack) ? 3 : 0;
  const handBoost = /hand|sink|wash|soap/i.test(query) && /hand/i.test(haystack) ? 3 : 0;
  const photoBoost = /photo|picture|image|evidence/i.test(query) && /photo|evidence/i.test(haystack) ? 3 : 0;
  return wordScore + (exactTopic ? 4 : 0) + tempBoost + handBoost + photoBoost;
}

function docAppliesToJurisdiction(doc, jurisdiction) {
  if (jurisdiction === 'All jurisdictions') return true;
  if (doc.jurisdiction === jurisdiction) return true;
  if (doc.appliesTo?.includes(jurisdiction)) return true;
  if (doc.jurisdiction === 'Georgia' && jurisdiction.endsWith(' GA')) return true;
  return false;
}

function sourceCoverageForDocs(docs) {
  const loadedTopics = new Set(docs.flatMap((doc) => doc.sections.map((section) => section.topic)));
  const coveredTopics = REQUIRED_SOURCE_TOPICS.filter((topic) => loadedTopics.has(topic));
  const missingTopics = REQUIRED_SOURCE_TOPICS.filter((topic) => !loadedTopics.has(topic));
  return {
    coveredTopics,
    missingTopics,
    total: REQUIRED_SOURCE_TOPICS.length,
    covered: coveredTopics.length,
    percent: Math.round((coveredTopics.length / REQUIRED_SOURCE_TOPICS.length) * 100)
  };
}

function inferredTopics(query) {
  const text = normalize(query);
  const topics = [];
  if (/(pic|person in charge|certified food protection|manager|supervision|knowledge|duties)/.test(text)) topics.push('Person in charge');
  if (/(employee health|restriction|exclusion|symptom|diagnos|discharge|vomit|diarrh)/.test(text)) topics.push('Employee health');
  if (/(approved source|obtained from approved|received|shellstock|parasite|records|condition|unadulterated)/.test(text)) topics.push('Approved source');
  if (/(contamination|cross|separat|storage|display|preparation|raw|ready-to-eat|bare hand)/.test(text)) topics.push('Protection from contamination');
  if (/(cold|41|48|refrigerat|temperature|tcs)/.test(text)) topics.push('Cold holding');
  if (/(hot|135)/.test(text)) topics.push('Hot holding');
  if (/(hand|sink|wash|soap)/.test(text)) topics.push('Handwashing');
  if (/(handwashing facilities|accessible|supplied|sink)/.test(text)) topics.push('Handwashing facilities');
  if (/(surface|slicer|utensil|board|clean|residue)/.test(text)) topics.push('Food-contact surfaces');
  if (/(date|label|discard|ready to eat|rte)/.test(text)) topics.push('Date marking');
  if (/(permit|inspection authority|compliance|enforcement|suspend|revoke|hearing|administrat)/.test(text)) topics.push('Enforcement');
  if (/(definition|means|define|term)/.test(text)) topics.push('Definitions');
  if (/(corrective action|correct by|corrected during|cos|follow up)/.test(text)) topics.push('Corrective action');
  if (/(embargo|adulterat|source integrity)/.test(text)) topics.push('Embargo');
  if (/(photo|picture|image)/.test(text)) topics.push('Photo review');
  if (/(note|document|wording|write|include|evidence)/.test(text)) topics.push('Evidence capture');
  return topics;
}

function findEvidence(query, jurisdiction, activeDocIds = APPROVED_DOCS.map((doc) => doc.id)) {
  const topics = inferredTopics(query);
  const matches = APPROVED_DOCS.flatMap((doc) =>
    doc.sections.map((section) => ({
      doc,
      section,
      score: scoreSection(query, doc, section)
    }))
  )
    .filter((item) => {
      const docIsActive = activeDocIds.includes(item.doc.id);
      const jurisdictionMatches = docAppliesToJurisdiction(item.doc, jurisdiction);
      const topicMatches = !topics.length || topics.includes(item.section.topic);
      return docIsActive && item.score > 1 && jurisdictionMatches && topicMatches;
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return matches;
}

function composeAnswer(query, evidence, sourceContext = {}) {
  if (!evidence.length) {
    const coverageLine = sourceContext.coverage
      ? ` Current source coverage is ${sourceContext.coverage.covered}/${sourceContext.coverage.total} core topics.`
      : '';
    return {
      status: 'Unsupported',
      title: 'No approved-source answer found',
      body:
        `I cannot determine this from the approved documentation currently loaded for ${sourceContext.jurisdiction ?? 'this jurisdiction'}.${coverageLine} Use supervisor review or add the controlling document before relying on an answer.`,
      note: 'No citation is available because no approved excerpt matched the question.'
    };
  }

  const primary = evidence[0];
  const topic = primary.section.topic.toLowerCase();
  const isTemperature = /cold|temperature|41|48|tcs|refrigerat/i.test(query + topic);
  const isHand = /hand|sink|wash|soap/i.test(query + topic);
  const isEmbargo = /embargo|hold|destroy|discard/i.test(query + topic);
  const isNote = /note|write|word|document|include/i.test(query + topic);

  let body = primary.section.text;
  if (isTemperature) {
    body =
      'Treat this as a temperature-control question. The approved guidance says cold-held TCS food must be maintained at 41 F or below. If the observed food is above that threshold, document the measured value, location, food item, corrective action, and whether correction occurred during the inspection.';
  } else if (isHand) {
    body =
      'Use the handwashing standard when employee behavior or handwashing facilities create a contamination risk. Document what you observed, where it happened, and whether the employee washed at a dedicated handwashing sink before returning to food work.';
  } else if (isEmbargo) {
    body =
      'Embargo may be appropriate only when the unsafe condition is documented and the local procedure is followed. The approved SOP requires evidence of adulteration, unsafe temperature exposure, or source-integrity loss, plus supervisor confirmation.';
  } else if (isNote) {
    body =
      'A defensible inspection note should include the observed condition, measured value if applicable, location, corrective action requested, and whether correction occurred during inspection.';
  }

  return {
    status: primary.section.severity,
    title: `Grounded answer from ${evidence.length} approved source${evidence.length === 1 ? '' : 's'}`,
    body,
    note:
      `This answer is constrained to the approved ${sourceContext.jurisdiction ?? 'jurisdiction'} library. Review the cited sections before taking enforcement action.`
  };
}

function checklistQuery(item) {
  return `${item.short} ${item.category}`;
}

function findChecklistEvidence(item, jurisdiction, activeDocIds) {
  const query = checklistQuery(item);
  const direct = findEvidence(query, jurisdiction, activeDocIds);
  if (direct.length) return direct;

  const sop = findEvidence(`${query} note document evidence corrective action`, jurisdiction, activeDocIds);
  if (sop.length) return sop;

  return APPROVED_DOCS.flatMap((doc) =>
    doc.sections
      .filter(
        (section) =>
          activeDocIds.includes(doc.id) && docAppliesToJurisdiction(doc, jurisdiction) && section.topic === 'Evidence capture'
      )
      .map((section) => ({ doc, section, score: 1 }))
  ).slice(0, 1);
}

function composeInspectionAssist(item, status, jurisdiction, activeDocIds) {
  const evidence = findChecklistEvidence(item, jurisdiction, activeDocIds);
  const selectedStatus = INSPECTION_STATUSES.find((option) => option.id === status);
  const statusText = selectedStatus ? selectedStatus.description : 'not marked yet';
  const isOut = status === 'OUT';
  const citation = evidence[0];
  const citationLine = citation ? `${citation.section.ref} (${citation.section.topic})` : 'the checklist item and supervisor review';

  return {
    evidence,
    title: `${item.number}${item.letter ? item.letter : ''}: ${item.short}`,
    body: citation
      ? `This item is being assisted against ${citationLine}. ${composeAnswer(checklistQuery(item), evidence).body}`
      : 'No approved source excerpt is currently mapped to this checklist item. Use the checklist item text and supervisor review until the controlling code section is approved in the library.',
    suggestedNote: isOut
      ? `Observed ${item.short.toLowerCase()} out of compliance at [location]. Document the condition, measured value if applicable, corrective action requested, and whether correction occurred during inspection.`
      : `Current mark: ${statusText}. Use AI Assist again after selecting OUT to draft violation-ready observation language.`
  };
}

function composeViolationChatAnswer(question, item, evidence, details) {
  if (!evidence.length) {
    return 'I do not have an approved controlling excerpt mapped to this checklist item yet. I can help structure the observation, but enforcement interpretation should wait for an approved source or supervisor review.';
  }

  const text = normalize(question);
  const primary = evidence[0];
  const detailContext = details?.commentText ? ` Your current draft observation says: "${details.commentText}"` : '';
  if (/(what|explain|why|standard|code|require)/.test(text)) {
    return `${primary.section.ref} says: ${primary.section.text} For this checklist item, focus on whether the observed condition meets that standard.${detailContext}`;
  }
  if (/(document|note|write|include|comment)/.test(text)) {
    return `For this violation note, include the observed condition, exact location, relevant measurement or behavior, corrective action requested, and whether it was corrected during inspection. Citation to review: ${primary.section.ref}, ${primary.section.topic}.${detailContext}`;
  }
  if (/(cos|corrected|repeat|status|correct by|date)/.test(text)) {
    return `Use the violation status based on what happened during the inspection: choose COS only if correction occurred during the inspection, repeat if the department record supports recurrence, and set a correct-by date when the condition remains unresolved. Review ${primary.section.ref} before finalizing.`;
  }
  return `Based on ${primary.section.ref} (${primary.section.topic}), the approved excerpt says: ${primary.section.text} Tie your decision back to the actual observed condition and document corrective action.`;
}

function seedViolationPrompts(item) {
  return [
    `What does the code require for ${item.short}?`,
    'What should my violation note include?',
    'When should I mark this COS or repeat?'
  ];
}

function severityForItem(item) {
  const text = normalize(`${item.category} ${item.short}`);
  if (/(cold|hot|temperature|cooling|cooking|reheating|hand|bare hand|source|contamination|sanitized|toxic|sewage|pest)/.test(text)) {
    return 'High';
  }
  if (/(date|records|label|thermometer|water|plumbing|variance|haccp)/.test(text)) {
    return 'Medium';
  }
  return 'Routine';
}

function correctivePromptForItem(item) {
  const text = normalize(`${item.category} ${item.short}`);
  if (/(cold|hot|temperature|cooling|cooking|reheating)/.test(text)) {
    return 'Record measured temperature, food item, location, time, disposition, and corrective action taken.';
  }
  if (/(hand|bare hand|hygienic)/.test(text)) {
    return 'Document observed employee behavior, handwashing facility condition, immediate correction, and retraining if needed.';
  }
  if (/(surface|sanitized|utensil|equipment)/.test(text)) {
    return 'Document affected surface or equipment, contamination condition, cleaning/sanitizing action, and whether use stopped until corrected.';
  }
  return 'Document observed condition, location, corrective action requested, and whether correction occurred during inspection.';
}

function generateDraftChecklist(selectedDocs, jurisdictionName) {
  const sourceNames = selectedDocs.map((doc) => doc.title);
  const hasFoodCode = selectedDocs.some((doc) => /food code|food service|food protection|rules/i.test(doc.title));
  const hasSop = selectedDocs.some((doc) => /sop|form|inspection/i.test(doc.title));
  const count = hasFoodCode && hasSop ? 18 : 10;
  return CHECKLIST_ITEMS.slice(0, count).map((item, index) => {
    const evidence = findEvidence(checklistQuery(item), jurisdictionName, selectedDocs.map((doc) => doc.id));
    const citation = evidence[0];
    return {
      id: `draft-${item.id}`,
      approved: Boolean(citation),
      number: item.number,
      letter: item.letter,
      category: item.category,
      short: item.short,
      citation: citation ? `${citation.section.ref} · ${citation.doc.title}, p. ${citation.section.page}` : 'Citation mapping required before approval',
      severity: severityForItem(item),
      statuses: 'In / Out / N/A / N/O',
      correctivePrompt: correctivePromptForItem(item),
      sourceSummary: sourceNames.slice(0, 2).join(' + ')
    };
  });
}

function App() {
  const [query, setQuery] = useState('Cold holding chicken at 48 F in Gwinnett County');
  const [jurisdiction, setJurisdiction] = useState('Gwinnett County GA');
  const [answer, setAnswer] = useState(null);
  const [history, setHistory] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [photoName, setPhotoName] = useState('');
  const [photoFindings, setPhotoFindings] = useState([]);
  const [listening, setListening] = useState(false);
  const [activeFeature, setActiveFeature] = useState('ask');
  const [checklistStatuses, setChecklistStatuses] = useState({});
  const [violationDetails, setViolationDetails] = useState({});
  const [violationChats, setViolationChats] = useState({});
  const [violationChatDrafts, setViolationChatDrafts] = useState({});
  const [showReportPreview, setShowReportPreview] = useState(false);
  const [temperatureReadings, setTemperatureReadings] = useState([]);
  const [temperatureDraft, setTemperatureDraft] = useState({ location: '', item: '', temperature: '', standard: 'cold' });
  const [temperatureViolationPrompt, setTemperatureViolationPrompt] = useState(null);
  const [showFinalizeModal, setShowFinalizeModal] = useState(false);
  const [finalizeStage, setFinalizeStage] = useState('info');
  const [finalizeInfo, setFinalizeInfo] = useState(DEFAULT_FINALIZE_INFO);
  const [operatorSignature, setOperatorSignature] = useState('');
  const [inspectorSignature, setInspectorSignature] = useState('');
  const [finalizedRecord, setFinalizedRecord] = useState(null);
  const [historyModalItem, setHistoryModalItem] = useState(null);
  const [activeChecklistItem, setActiveChecklistItem] = useState(CHECKLIST_ITEMS[3]);
  const [violationModalItem, setViolationModalItem] = useState(null);
  const [checklistCategory, setChecklistCategory] = useState('All categories');
  const [checklistViewFilter, setChecklistViewFilter] = useState('all');
  const [departmentOpen, setDepartmentOpen] = useState(false);
  const [departmentSearch, setDepartmentSearch] = useState('');
  const [activeDepartmentId, setActiveDepartmentId] = useState('gwinnett-ga');
  const [agencyDocSelections, setAgencyDocSelections] = useState(() =>
    Object.fromEntries(HEALTH_DEPARTMENTS.map((department) => [department.id, department.docs]))
  );
  const [registrySearch, setRegistrySearch] = useState('');
  const [pendingUploads, setPendingUploads] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [configDepartmentId, setConfigDepartmentId] = useState('gwinnett-ga');
  const [configSourceIds, setConfigSourceIds] = useState([
    'gwinnett-food-code-2025',
    'ga-food-service-rules-2025',
    'ga-food-service-interpretation-manual-2025',
    'gwinnett-inspection-sop-2025'
  ]);
  const [draftChecklist, setDraftChecklist] = useState([]);
  const [lockedProfile, setLockedProfile] = useState(null);
  const recognitionRef = useRef(null);

  const jurisdictions = useMemo(() => ['All jurisdictions', ...new Set(APPROVED_DOCS.map((doc) => doc.jurisdiction))], []);
  const activeDepartment = HEALTH_DEPARTMENTS.find((department) => department.id === activeDepartmentId) ?? HEALTH_DEPARTMENTS[0];
  const configDepartment = HEALTH_DEPARTMENTS.find((department) => department.id === configDepartmentId) ?? HEALTH_DEPARTMENTS[0];
  const configSources = MASTER_CODE_LIBRARY.filter((doc) => configSourceIds.includes(doc.id));
  const activeDocIds = agencyDocSelections[activeDepartment.id] ?? activeDepartment.docs;
  const departmentMatches = useMemo(() => {
    const search = normalize(departmentSearch);
    return HEALTH_DEPARTMENTS.filter((department) =>
      normalize(`${department.name} ${department.agency} ${department.status}`).includes(search)
    );
  }, [departmentSearch]);
  const registryMatches = useMemo(() => {
    const search = normalize(registrySearch);
    return MASTER_CODE_LIBRARY.filter((doc) =>
      normalize(`${doc.title} ${doc.jurisdiction} ${doc.authority} ${doc.scope}`).includes(search)
    );
  }, [registrySearch]);
  const preloadStats = useMemo(() => {
    const stateAvailable = STATE_CODE_PRELOAD.filter((doc) => doc.status === 'Available').length;
    return {
      fda: FDA_FOOD_CODE_PRELOAD.length,
      states: STATE_CODE_PRELOAD.length,
      verifiedStates: stateAvailable,
      pendingStates: STATE_CODE_PRELOAD.length - stateAvailable
    };
  }, []);
  const checklistCategories = useMemo(() => ['All categories', ...new Set(CHECKLIST_ITEMS.map((item) => item.category))], []);
  const visibleChecklistItems = useMemo(() => {
    return CHECKLIST_ITEMS.filter((item) => {
      const categoryMatches = checklistCategory === 'All categories' || item.category === checklistCategory;
      const status = checklistStatuses[item.id];
      const filterMatches =
        checklistViewFilter === 'all' ||
        (checklistViewFilter === 'unmarked' && !status) ||
        (checklistViewFilter === 'out' && status === 'OUT') ||
        (checklistViewFilter === 'done' && Boolean(status));
      return categoryMatches && filterMatches;
    });
  }, [checklistCategory, checklistStatuses, checklistViewFilter]);
  const checklistCounts = useMemo(() => {
    const counts = { IN: 0, OUT: 0, NA: 0, NO: 0, blank: 0 };
    CHECKLIST_ITEMS.forEach((item) => {
      const status = checklistStatuses[item.id];
      if (status) counts[status] += 1;
      else counts.blank += 1;
    });
    return counts;
  }, [checklistStatuses]);
  const activeEvidence = answer?.evidence ?? [];
  const activeDocs = MASTER_CODE_LIBRARY.filter((doc) => activeDocIds.includes(doc.id));
  const activeSourceDocs = APPROVED_DOCS.filter((doc) => activeDocIds.includes(doc.id));
  const approvedCount = activeSourceDocs.reduce((count, doc) => count + doc.sections.length, 0);
  const sourceCoverage = sourceCoverageForDocs(activeSourceDocs);
  const activeAssist = activeChecklistItem
    ? composeInspectionAssist(activeChecklistItem, checklistStatuses[activeChecklistItem.id], jurisdiction, activeDocIds)
    : null;
  const activeViolationDetails = activeChecklistItem ? violationDetails[activeChecklistItem.id] : null;
  const activeViolationChat = activeChecklistItem ? violationChats[activeChecklistItem.id] ?? [] : [];
  const activeViolationChatDraft = activeChecklistItem ? violationChatDrafts[activeChecklistItem.id] ?? '' : '';
  const activeCachedDate =
    activeChecklistItem && typeof window !== 'undefined' ? window.__violationDateCache?.[activeChecklistItem.id] : '';
  const modalViolationDetails = violationModalItem ? violationDetails[violationModalItem.id] : null;
  const modalViolationAssist = violationModalItem
    ? composeInspectionAssist(violationModalItem, checklistStatuses[violationModalItem.id], jurisdiction, activeDocIds)
    : null;
  const modalViolationChat = violationModalItem ? violationChats[violationModalItem.id] ?? [] : [];
  const modalViolationChatDraft = violationModalItem ? violationChatDrafts[violationModalItem.id] ?? '' : '';
  const modalCachedDate =
    violationModalItem && typeof window !== 'undefined' ? window.__violationDateCache?.[violationModalItem.id] : '';
  const approvedDraftCount = draftChecklist.filter((item) => item.approved).length;
  const historyModalEntries = historyModalItem ? VIOLATION_HISTORY[historyModalItem.id] ?? [] : [];
  const reportViolations = useMemo(() => {
    return CHECKLIST_ITEMS.filter((item) => checklistStatuses[item.id] === 'OUT').map((item) => ({
      item,
      details: violationDetails[item.id] ?? {}
    }));
  }, [checklistStatuses, violationDetails]);
  const canSaveTemperatureReading =
    temperatureDraft.location.trim() || temperatureDraft.item.trim() || temperatureDraft.temperature.trim();

  useEffect(() => {
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`).catch(() => {});
    }

    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  useEffect(() => {
    if (!activeChecklistItem || checklistStatuses[activeChecklistItem.id] !== 'OUT') return undefined;
    const saveVisibleViolationForm = () => {
      const form = document.querySelector('.violation-capture');
      if (!form) return;
      const selects = form.querySelectorAll('select');
      const textareas = form.querySelectorAll('textarea');
      const date = form.querySelector('input[type="date"]');
      window.__violationDateCache = {
        ...(window.__violationDateCache ?? {}),
        [activeChecklistItem.id]: date?.value ?? ''
      };
      setViolationDetails((current) => ({
        ...current,
        [activeChecklistItem.id]: {
          violationStatus: selects[0]?.value ?? 'Violation',
          correctByDate: date?.value ?? '',
          cannedComment: selects[1]?.value ?? '',
          commentText: textareas[0]?.value ?? '',
          cannedCorrectiveAction: selects[2]?.value ?? '',
          correctiveActionText: textareas[1]?.value ?? ''
        }
      }));
    };
    const interval = window.setInterval(saveVisibleViolationForm, 250);
    return () => {
      saveVisibleViolationForm();
      window.clearInterval(interval);
    };
  }, [activeChecklistItem, checklistStatuses]);

  function ask(nextQuery = query) {
    const trimmed = nextQuery.trim();
    if (!trimmed) return;
    const evidence = findEvidence(trimmed, jurisdiction, activeDocIds);
    const composed = composeAnswer(trimmed, evidence, { jurisdiction, coverage: sourceCoverage });
    const result = {
      id: crypto.randomUUID(),
      query: trimmed,
      jurisdiction,
      ...composed,
      evidence,
      createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setAnswer(result);
    setHistory((items) => [result, ...items].slice(0, 6));
  }

  function handleVoice() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setAnswer({
        id: 'voice-unavailable',
        query: 'Voice input',
        jurisdiction,
        status: 'Unavailable',
        title: 'Voice input is not available in this browser',
        body: 'Use the text box for now. The product architecture still supports a voice layer for field use.',
        note: 'Browser speech recognition support varies by platform.',
        evidence: [],
        createdAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      ask(transcript);
    };
    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;
    setListening(true);
    recognition.start();
  }

  function handlePhoto(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setPhotoName(file.name);
    const selected = PHOTO_SIGNALS.filter((_, index) => index < 3);
    setPhotoFindings(selected);
  }

  function markChecklistItem(item, status) {
    captureActiveViolationForm();
    setChecklistStatuses((current) => ({ ...current, [item.id]: status }));
    setActiveChecklistItem(item);
    if (status === 'OUT') {
      setViolationDetails((current) => ({
        ...current,
        [item.id]: {
          repeat: false,
          violationStatus: 'Violation',
          correctByDate: '',
          cannedComment: '',
          commentText: '',
          cannedCorrectiveAction: '',
          correctiveActionText: '',
          ...(current[item.id] ?? {})
        }
      }));
      setViolationModalItem(item);
    } else if (violationModalItem?.id === item.id) {
      setViolationModalItem(null);
    }
  }

  function openChecklistAssist(item) {
    captureActiveViolationForm();
    setActiveChecklistItem(item);
  }

  function captureActiveViolationForm() {
    if (!activeChecklistItem) return;
    const form = document.querySelector('.violation-capture');
    if (!form) return;
    const selects = form.querySelectorAll('select');
    const textareas = form.querySelectorAll('textarea');
    const date = form.querySelector('input[type="date"]');
    window.__violationDateCache = {
      ...(window.__violationDateCache ?? {}),
      [activeChecklistItem.id]: date?.value ?? ''
    };
    setViolationDetails((current) => ({
      ...current,
      [activeChecklistItem.id]: {
        violationStatus: selects[0]?.value ?? 'Violation',
        correctByDate: date?.value ?? '',
        cannedComment: selects[1]?.value ?? '',
        commentText: textareas[0]?.value ?? '',
        cannedCorrectiveAction: selects[2]?.value ?? '',
        correctiveActionText: textareas[1]?.value ?? ''
      }
    }));
  }

  function updateViolationDetail(itemId, field, value) {
    setViolationDetails((current) => ({
      ...current,
      [itemId]: {
        repeat: false,
        violationStatus: 'Violation',
        correctByDate: '',
        cannedComment: '',
        commentText: '',
        cannedCorrectiveAction: '',
        correctiveActionText: '',
        ...(current[itemId] ?? {}),
        [field]: value
      }
    }));
  }

  function selectCannedComment(itemId, value) {
    setViolationDetails((current) => ({
      ...current,
      [itemId]: {
        repeat: false,
        violationStatus: 'Violation',
        correctByDate: '',
        cannedComment: '',
        commentText: '',
        cannedCorrectiveAction: '',
        correctiveActionText: '',
        ...(current[itemId] ?? {}),
        cannedComment: value,
        commentText: value || (current[itemId]?.commentText ?? '')
      }
    }));
  }

  function selectCannedCorrectiveAction(itemId, value) {
    setViolationDetails((current) => ({
      ...current,
      [itemId]: {
        repeat: false,
        violationStatus: 'Violation',
        correctByDate: '',
        cannedComment: '',
        commentText: '',
        cannedCorrectiveAction: '',
        correctiveActionText: '',
        ...(current[itemId] ?? {}),
        cannedCorrectiveAction: value,
        correctiveActionText: value || (current[itemId]?.correctiveActionText ?? '')
      }
    }));
  }

  function updateTemperatureDraft(field, value) {
    setTemperatureDraft((current) => ({ ...current, [field]: value }));
  }

  function parseTemperature(value) {
    const match = value.match(/-?\d+(\.\d+)?/);
    return match ? Number(match[0]) : null;
  }

  function buildTemperatureReading() {
    const standard = TEMPERATURE_STANDARDS.find((item) => item.id === temperatureDraft.standard) ?? TEMPERATURE_STANDARDS[0];
    const location = temperatureDraft.location.trim();
    const item = temperatureDraft.item.trim();
    const temperature = temperatureDraft.temperature.trim();
    return {
      id: crypto.randomUUID(),
      location,
      item,
      temperature,
      standard: standard.id,
      standardLabel: standard.label,
      limitLabel: standard.limitLabel,
      capturedAt: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    };
  }

  function commitTemperatureReading(reading) {
    setTemperatureReadings((current) => [...current, reading]);
    setTemperatureDraft({ location: '', item: '', temperature: '', standard: reading.standard });
  }

  function saveTemperatureReading() {
    if (!canSaveTemperatureReading) return;
    const reading = buildTemperatureReading();
    const standard = TEMPERATURE_STANDARDS.find((item) => item.id === reading.standard) ?? TEMPERATURE_STANDARDS[0];
    const numericTemperature = parseTemperature(reading.temperature);
    if (numericTemperature !== null && standard.isViolation(numericTemperature)) {
      const violationItem = CHECKLIST_ITEMS.find(
        (item) => item.number === standard.violationItemNumber && item.letter === standard.violationItemLetter
      );
      const defaultComment = `${reading.standardLabel} temperature observed out of compliance: ${reading.item || 'food item'} at ${reading.temperature || '[temperature]'}${reading.location ? ` in ${reading.location}` : ''}.`;
      setTemperatureViolationPrompt({
        reading,
        standard,
        violationItem,
        commentText: defaultComment,
        correctiveActionText: standard.defaultCorrectiveAction
      });
      return;
    }
    commitTemperatureReading(reading);
  }

  function removeTemperatureReading(readingId) {
    setTemperatureReadings((current) => current.filter((reading) => reading.id !== readingId));
  }

  function saveTemperatureOnly() {
    if (!temperatureViolationPrompt) return;
    commitTemperatureReading(temperatureViolationPrompt.reading);
    setTemperatureViolationPrompt(null);
  }

  function saveTemperatureViolation() {
    if (!temperatureViolationPrompt) return;
    const { reading, violationItem, commentText, correctiveActionText } = temperatureViolationPrompt;
    commitTemperatureReading(reading);
    if (violationItem) {
      setChecklistStatuses((current) => ({ ...current, [violationItem.id]: 'OUT' }));
      setViolationDetails((current) => ({
        ...current,
        [violationItem.id]: {
          repeat: false,
          violationStatus: 'Violation',
          correctByDate: '',
          cannedComment: '',
          commentText,
          cannedCorrectiveAction: '',
          correctiveActionText,
          ...(current[violationItem.id] ?? {}),
          violationStatus: current[violationItem.id]?.violationStatus ?? 'Violation',
          commentText,
          correctiveActionText
        }
      }));
      setActiveChecklistItem(violationItem);
    }
    setTemperatureViolationPrompt(null);
  }

  function updateFinalizeInfo(field, value) {
    setFinalizeInfo((current) => ({ ...current, [field]: value }));
  }

  function buildFinalInspectionRecord() {
    const savedAt = new Date().toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
    const violations = reportViolations.map(({ item, details }) => ({
      id: item.id,
      number: item.number,
      letter: item.letter,
      category: item.category,
      short: item.short,
      violationStatus: details.violationStatus || 'Violation',
      correctByDate: details.correctByDate || '',
      comment:
        details.commentText ||
        `Observed ${item.short.toLowerCase()} out of compliance. Corrective action must be documented before final report approval.`,
      correctiveAction:
        details.correctiveActionText || 'Correct violation and maintain active managerial control to prevent recurrence.'
    }));

    return {
      id: `INS-${Date.now()}`,
      savedAt,
      department: activeDepartment.name,
      jurisdiction,
      info: finalizeInfo,
      signatures: {
        operator: operatorSignature,
        inspector: inspectorSignature
      },
      checklist: CHECKLIST_ITEMS.map((item) => ({
        id: item.id,
        number: item.number,
        letter: item.letter,
        short: item.short,
        category: item.category,
        status: checklistStatuses[item.id] || ''
      })),
      counts: checklistCounts,
      violations,
      temperatureReadings
    };
  }

  function saveInspectionRecord(record) {
    const stored = JSON.parse(window.localStorage.getItem('inspectaid.inspectionRecords') || '[]');
    window.localStorage.setItem('inspectaid.inspectionRecords', JSON.stringify([record, ...stored].slice(0, 25)));
  }

  function downloadFinalPdf(record = finalizedRecord) {
    if (!record) return;
    downloadBlob(buildInspectionPdf(record), `${record.id}-inspection-report.pdf`);
  }

  function downloadSheetRecord(record = finalizedRecord) {
    if (!record) return;
    downloadBlob(new Blob([buildInspectionCsv(record)], { type: 'text/csv;charset=utf-8' }), `${record.id}-sheet-record.csv`);
  }

  function completeFinalInspection() {
    const record = buildFinalInspectionRecord();
    saveInspectionRecord(record);
    setFinalizedRecord(record);
    downloadFinalPdf(record);
  }

  function askViolationQuestion(item, evidence) {
    const question = (violationChatDrafts[item.id] ?? '').trim();
    if (!question) return;
    const answerText = composeViolationChatAnswer(question, item, evidence, violationDetails[item.id]);
    setViolationChats((current) => ({
      ...current,
      [item.id]: [
        ...(current[item.id] ?? []),
        { id: crypto.randomUUID(), role: 'inspector', text: question },
        { id: crypto.randomUUID(), role: 'assist', text: answerText }
      ].slice(-8)
    }));
    setViolationChatDrafts((current) => ({ ...current, [item.id]: '' }));
  }

  function useViolationPrompt(item, prompt, evidence) {
    const answerText = composeViolationChatAnswer(prompt, item, evidence, violationDetails[item.id]);
    setViolationChats((current) => ({
      ...current,
      [item.id]: [
        ...(current[item.id] ?? []),
        { id: crypto.randomUUID(), role: 'inspector', text: prompt },
        { id: crypto.randomUUID(), role: 'assist', text: answerText }
      ].slice(-8)
    }));
    setViolationChatDrafts((current) => ({ ...current, [item.id]: '' }));
  }

  function renderViolationChat(item, assist, messages, draft) {
    return (
      <div className="violation-chat">
        <div className="panel-title">
          <Sparkles size={17} />
          Ask AI about this item
        </div>
        <div className="code-context">
          {assist.evidence.length ? (
            assist.evidence.map(({ doc, section }) => (
              <div key={`${doc.id}-${section.ref}`}>
                <strong>{section.ref}</strong>
                <span>{section.topic} · {doc.title}</span>
              </div>
            ))
          ) : (
            <p>No approved citation mapped yet.</p>
          )}
        </div>
        <div className="prompt-row">
          {seedViolationPrompts(item).map((prompt) => (
            <button key={prompt} type="button" onClick={() => useViolationPrompt(item, prompt, assist.evidence)}>
              {prompt}
            </button>
          ))}
        </div>
        <div className="chat-thread">
          {messages.length ? (
            messages.map((message) => (
              <div className={`chat-message ${message.role}`} key={message.id}>
                <span>{message.role === 'assist' ? 'AI Assist' : 'Inspector'}</span>
                <p>{message.text}</p>
              </div>
            ))
          ) : (
            <p className="muted">Ask a question about this checklist item, citation, documentation, COS, repeat, or corrective action.</p>
          )}
        </div>
        <div className="chat-input-row">
          <textarea
            value={draft}
            onChange={(event) => setViolationChatDrafts((current) => ({ ...current, [item.id]: event.target.value }))}
            onKeyDown={(event) => {
              if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') askViolationQuestion(item, assist.evidence);
            }}
            placeholder="Ask for clarification about this violation"
            aria-label="Ask AI about this violation"
          />
          <button className="send-button" type="button" onClick={() => askViolationQuestion(item, assist.evidence)} aria-label="Ask violation AI">
            <Send size={18} />
          </button>
        </div>
      </div>
    );
  }

  function renderViolationCapture(item, details, cachedDate) {
    const historyEntries = VIOLATION_HISTORY[item.id] ?? [];
    const hasPossibleRepeat = historyEntries.length > 0;
    return (
      <div className="violation-capture">
        <div className={hasPossibleRepeat ? 'repeat-warning active' : 'repeat-warning'}>
          <div>
            <AlertTriangle size={18} />
            <span>{hasPossibleRepeat ? 'Possible repeat' : 'No prior violation match loaded'}</span>
          </div>
          <button type="button" onClick={() => setHistoryModalItem(item)}>
            <History size={16} />
            Violation history
          </button>
        </div>
        <label>
          <span>Violation status</span>
          <select
            value={details?.violationStatus ?? 'Violation'}
            onChange={(event) => updateViolationDetail(item.id, 'violationStatus', event.target.value)}
          >
            {VIOLATION_STATUS_OPTIONS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Correct by date</span>
          <input
            type="date"
            value={details?.correctByDate || cachedDate || ''}
            onInput={(event) => {
              window.__violationDateCache = {
                ...(window.__violationDateCache ?? {}),
                [item.id]: event.currentTarget.value
              };
              updateViolationDetail(item.id, 'correctByDate', event.currentTarget.value);
            }}
            onChange={(event) => {
              window.__violationDateCache = {
                ...(window.__violationDateCache ?? {}),
                [item.id]: event.target.value
              };
              updateViolationDetail(item.id, 'correctByDate', event.target.value);
            }}
            onBlur={(event) => {
              window.__violationDateCache = {
                ...(window.__violationDateCache ?? {}),
                [item.id]: event.currentTarget.value
              };
              updateViolationDetail(item.id, 'correctByDate', event.currentTarget.value);
            }}
          />
        </label>
        <label>
          <span>Canned violation comments</span>
          <select
            value={details?.cannedComment ?? ''}
            onChange={(event) => selectCannedComment(item.id, event.target.value)}
          >
            <option value="">Select canned comment</option>
            {CANNED_VIOLATION_COMMENTS.map((comment) => (
              <option key={comment} value={comment}>{comment}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Violation comment</span>
          <textarea
            value={details?.commentText ?? ''}
            onChange={(event) => updateViolationDetail(item.id, 'commentText', event.target.value)}
            placeholder="Enter violation observation details"
          />
        </label>
        <label>
          <span>Pre-defined corrective actions</span>
          <select
            value={details?.cannedCorrectiveAction ?? ''}
            onChange={(event) => selectCannedCorrectiveAction(item.id, event.target.value)}
          >
            <option value="">Select corrective action</option>
            {CANNED_CORRECTIVE_ACTIONS.map((action) => (
              <option key={action} value={action}>{action}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Corrective action</span>
          <textarea
            value={details?.correctiveActionText ?? ''}
            onChange={(event) => updateViolationDetail(item.id, 'correctiveActionText', event.target.value)}
            placeholder="Enter corrective action details"
          />
        </label>
      </div>
    );
  }

  function renderReportPreview() {
    const completedCount = CHECKLIST_ITEMS.length - checklistCounts.blank;
    const previewDate = new Date().toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
    const info = finalizedRecord?.info ?? finalizeInfo;
    const signatures = finalizedRecord?.signatures ?? { operator: operatorSignature, inspector: inspectorSignature };
    const mappedViolations = reportViolations.map(({ item, details }) => {
      const statusLabel = details.violationStatus || 'Violation';
      const comment =
        details.commentText ||
        `Observed ${item.short.toLowerCase()} out of compliance. Corrective action must be documented before final report approval.`;
      const correctiveAction =
        details.correctiveActionText || 'Correct violation and maintain active managerial control to prevent recurrence.';
      return { item, details, statusLabel, comment, correctiveAction };
    });

    return (
      <div className="report-preview-stack">
        <section className="official-report-page main-report-page" aria-label="Gwinnett inspection report preview page 1">
          <div className="official-page-count">Page 1 of 3</div>
          <div className="official-top">
            <div className="gnr-logo">GNR</div>
            <div className="official-title">
              <strong>GNR PUBLIC HEALTH</strong>
              <span>Food Service Establishment Inspection Report</span>
            </div>
            <div className="score-box">
              <strong>Current score</strong>
              <span>{reportViolations.length ? 'Draft' : '100'}</span>
            </div>
            <div className="score-box">
              <strong>Current grade</strong>
              <span>{reportViolations.length ? '-' : 'A'}</span>
            </div>
          </div>
          <div className="official-field-grid">
            <div><strong>Establishment Name:</strong><span>{info.establishmentName}</span></div>
            <div><strong>Address:</strong><span>{info.address}</span></div>
            <div><strong>City:</strong><span>{info.cityStateZip}</span></div>
            <div><strong>Inspection Date:</strong><span>{previewDate}</span></div>
            <div><strong>Time In:</strong><span>{info.timeIn}</span></div>
            <div><strong>Time Out:</strong><span>{info.timeOut}</span></div>
            <div><strong>CFSM:</strong><span>{info.cfsm}</span></div>
            <div><strong>Permit#:</strong><span>{info.permitNumber}</span></div>
          </div>
          <div className="official-band">Foodborne illness risk factors and public health interventions</div>
          <div className="official-status-summary">
            <div><strong>{completedCount}</strong><span>items marked</span></div>
            <div><strong>{checklistCounts.IN}</strong><span>in</span></div>
            <div><strong>{checklistCounts.OUT}</strong><span>out</span></div>
            <div><strong>{checklistCounts.NA + checklistCounts.NO}</strong><span>n/a or n/o</span></div>
          </div>
          <div className="mapped-checklist-grid">
            {CHECKLIST_ITEMS.slice(0, 18).map((item) => {
              const status = checklistStatuses[item.id];
              return (
                <div className={status === 'OUT' ? 'mapped-row out' : 'mapped-row'} key={`preview-${item.id}`}>
                  <span>{item.number}{item.letter ? item.letter : ''}</span>
                  <strong>{item.short}</strong>
                  <em>{status || '-'}</em>
                </div>
              );
            })}
          </div>
          <div className="official-footer">
            <span>{signatures.operator ? <img src={signatures.operator} alt="Operator signature" /> : 'Person in Charge (Signature)'}</span>
            <span>{signatures.inspector ? <img src={signatures.inspector} alt="Inspector signature" /> : 'Inspector (Signature)'}</span>
            <span>Follow-up: {info.followUpRequired === 'Yes' ? 'YES' : 'NO'}</span>
          </div>
        </section>

        <section className="official-report-page addendum-report-page" aria-label="Gwinnett inspection report preview addendum">
          <div className="official-page-count">Page 2 of 3</div>
          <h3>Food Service Establishment Inspection Report Addendum</h3>
          <div className="official-addendum-fields">
            <div><strong>Establishment</strong>{info.establishmentName}</div>
            <div><strong>Permit #</strong>{info.permitNumber}</div>
            <div><strong>Date</strong>{previewDate}</div>
            <div><strong>Address</strong>{info.address}</div>
            <div><strong>City/State</strong>{activeDepartment.name}</div>
            <div><strong>Zip Code</strong>{info.cityStateZip}</div>
          </div>
          <div className="official-band">Temperature observations</div>
          <div className="official-temperature-grid">
            <div className="official-temperature-head">Item/Location</div>
            <div className="official-temperature-head">Temp</div>
            <div className="official-temperature-head">Item/Location</div>
            <div className="official-temperature-head">Temp</div>
            <div className="official-temperature-head">Item/Location</div>
            <div className="official-temperature-head">Temp</div>
            {Array.from({ length: Math.max(24, Math.ceil(temperatureReadings.length / 3) * 3) }).map((_, index) => {
              const reading = temperatureReadings[index];
              return (
                <React.Fragment key={`temp-preview-${index}`}>
                  <div>{reading ? `${reading.item || 'Item'} / ${reading.location || 'Location'} (${reading.standardLabel})` : ''}</div>
                  <div>{reading?.temperature ?? ''}</div>
                </React.Fragment>
              );
            })}
          </div>
          <div className="official-band">Observations and corrective actions</div>
          {mappedViolations.length ? (
            <div className="official-violation-table">
              {mappedViolations.map(({ item, details, statusLabel, comment, correctiveAction }) => (
                <article key={`report-${item.id}`}>
                  <div className="official-item-number">
                    {item.number}{item.letter ? item.letter : ''}
                  </div>
                  <div>
                    <strong>{item.short}</strong>
                    <p>{comment}</p>
                    <p><b>Corrective action:</b> {correctiveAction}</p>
                    <small>
                      {statusLabel}
                      {details.correctByDate ? ` · Correct by ${details.correctByDate}` : ''}
                    </small>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="official-empty-report">
              No OUT violations have been marked yet.
            </div>
          )}
          <div className="official-footer">
            <span>{signatures.operator ? <img src={signatures.operator} alt="Operator signature" /> : 'Person in Charge (Signature)'}</span>
            <span>{signatures.inspector ? <img src={signatures.inspector} alt="Inspector signature" /> : 'Inspector (Signature)'}</span>
            <span>Date</span>
          </div>
        </section>
      </div>
    );
  }

  function selectDepartment(department) {
    setActiveDepartmentId(department.id);
    setJurisdiction(department.name);
    setDepartmentOpen(false);
    setDepartmentSearch('');
  }

  function addMasterDocument(docId) {
    setAgencyDocSelections((current) => {
      const existing = current[activeDepartment.id] ?? [];
      if (existing.includes(docId)) return current;
      return { ...current, [activeDepartment.id]: [...existing, docId] };
    });
  }

  function removeAgencyDocument(docId) {
    setAgencyDocSelections((current) => {
      const existing = current[activeDepartment.id] ?? [];
      if (existing.length === 1) return current;
      return { ...current, [activeDepartment.id]: existing.filter((id) => id !== docId) };
    });
  }

  function handleAdminUpload(event) {
    const files = Array.from(event.target.files ?? []);
    if (!files.length) return;
    const newUploads = files.map((file) => {
      const possibleDuplicate = MASTER_CODE_LIBRARY.find((doc) =>
        normalize(file.name).includes(normalize(doc.title).split(' ').slice(0, 3).join(' '))
      );
      return {
        id: crypto.randomUUID(),
        name: file.name,
        size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
        status: possibleDuplicate ? 'Possible duplicate' : 'Needs approval',
        duplicate: possibleDuplicate?.title
      };
    });
    setPendingUploads((items) => [...newUploads, ...items]);
    setShowUpload(true);
    event.target.value = '';
  }

  function toggleConfigSource(docId) {
    setConfigSourceIds((current) => {
      if (current.includes(docId) && current.length === 1) return current;
      if (current.includes(docId)) return current.filter((id) => id !== docId);
      return [...current, docId];
    });
  }

  function runChecklistGeneration() {
    const generated = generateDraftChecklist(configSources, configDepartment.name);
    setDraftChecklist(generated);
    setWizardStep(2);
  }

  function toggleDraftApproval(itemId) {
    setDraftChecklist((items) =>
      items.map((item) => (item.id === itemId ? { ...item, approved: !item.approved } : item))
    );
  }

  function approveCitedDraftItems() {
    setDraftChecklist((items) =>
      items.map((item) => ({
        ...item,
        approved: item.citation !== 'Citation mapping required before approval'
      }))
    );
  }

  function lockJurisdictionProfile() {
    const approvedItems = draftChecklist.filter((item) => item.approved);
    setLockedProfile({
      id: `${configDepartment.id}-profile-v1`,
      jurisdiction: configDepartment.name,
      agency: configDepartment.agency,
      version: 'v1.0-draft',
      effective: new Date().toISOString().slice(0, 10),
      docs: configSources,
      approvedItems,
      superseded: 'None',
      approvalHistory: [
        'AI generated draft checklist from selected trusted sources',
        `${approvedItems.length} checklist items approved for inspector-facing use`,
        'Profile locked by department admin for prototype testing'
      ]
    });
    setWizardStep(4);
  }

  return (
    <main className="shell">
      <section className="workspace">
        <header className="topbar">
          <div className="topbar-left">
            <div className="brand compact">
              <div className="mark"><ShieldCheck size={22} /></div>
              <div>
                <strong>InspectAid</strong>
                <span>Approved-source field support</span>
              </div>
            </div>
            <div className="library-picker">
              <button className="library-trigger" type="button" onClick={() => setDepartmentOpen((value) => !value)}>
                <FileCheck2 size={17} />
                <span>{activeDepartment.name}</span>
                <strong>{activeDocIds.length}</strong>
                <ChevronDown size={16} />
              </button>
              {departmentOpen && (
                <div className="library-menu">
                  <label className="library-search">
                    <Search size={16} />
                    <input
                      value={departmentSearch}
                      onChange={(event) => setDepartmentSearch(event.target.value)}
                      placeholder="Search health departments"
                      autoFocus
                    />
                  </label>
                  <div className="library-summary">
                    <span>Health department</span>
                    <span>{approvedCount} citable sections</span>
                  </div>
                  <div className="library-options">
                    {departmentMatches.map((department) => (
                      <button
                        key={department.id}
                        className={activeDepartmentId === department.id ? 'selected' : ''}
                        type="button"
                        onClick={() => selectDepartment(department)}
                      >
                        <CheckCircle2 size={16} />
                        <span>
                          <strong>{department.name}</strong>
                          <small>{department.agency} · {department.docs.length} approved docs · {department.status}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="status-strip">
            <span className={isOnline ? 'online' : 'offline'}>
              {isOnline ? <Wifi size={15} /> : <CloudOff size={15} />}
              {isOnline ? 'Online' : 'Offline ready'}
            </span>
            <span><ShieldCheck size={15} /> Approved sources only</span>
            <span><Clock3 size={15} /> Audit trail on</span>
          </div>
          <button className="icon-button" type="button" aria-label="Display mode">
            <Moon size={18} />
          </button>
        </header>

        <div className="hero-band">
          <div>
            <p className="eyebrow"><Radio size={15} /> Field decision support</p>
            <h1>Ask inspection questions. Get cited, jurisdiction-aware guidance.</h1>
          </div>
          <div className="trust-panel">
            <ShieldCheck size={20} />
            <span>Unsupported answers are blocked instead of improvised.</span>
          </div>
        </div>

        <section className="feature-shell">
          <nav className="feature-menu" aria-label="Feature menu">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <button
                  key={feature.id}
                  className={activeFeature === feature.id ? 'active' : ''}
                  type="button"
                  onClick={() => setActiveFeature(feature.id)}
                >
                  <Icon size={18} />
                  <span>{feature.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="feature-stage">
            {activeFeature === 'ask' && (
              <>
                <section className="ask-panel" aria-label="Ask InspectAid">
                  <div className="controls-row">
                    <label>
                      <MapPin size={16} />
                      <select value={jurisdiction} onChange={(event) => setJurisdiction(event.target.value)}>
                        {jurisdictions.map((item) => (
                          <option key={item}>{item}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} />
                    </label>
                    <button className={`voice-button ${listening ? 'active' : ''}`} type="button" onClick={handleVoice}>
                      <Mic size={17} />
                      {listening ? 'Listening' : 'Voice'}
                    </button>
                    <button className="ghost-button" type="button">
                      <SlidersHorizontal size={17} />
                      Strict mode
                    </button>
                  </div>

                  <div className="ask-box">
                    <MessageSquareText size={20} />
                    <textarea
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      onKeyDown={(event) => {
                        if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') ask();
                      }}
                      aria-label="Inspection question"
                    />
                    <button className="send-button" type="button" onClick={() => ask()} aria-label="Ask question">
                      <Send size={20} />
                    </button>
                  </div>

                  <div className="quick-prompts">
                    {QUICK_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => {
                          setQuery(prompt);
                          ask(prompt);
                        }}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </section>

                <section className="source-pack-panel" aria-label="Active trusted source pack">
                  <div>
                    <span className="source-pack-kicker"><ShieldCheck size={15} /> {activeDepartment.name} trusted source pack</span>
                    <h2>{sourceCoverage.percent}% core topic coverage</h2>
                    <p>
                      {activeSourceDocs.length} approved documents · {approvedCount} searchable sections ·
                      Georgia statewide rules applied to {activeDepartment.name}
                    </p>
                  </div>
                  <div className="source-pack-meter" aria-hidden="true">
                    <span style={{ width: `${sourceCoverage.percent}%` }} />
                  </div>
                  <div className="source-doc-list">
                    {activeSourceDocs.map((doc) => (
                      <span key={doc.id}>
                        <FileCheck2 size={14} />
                        {doc.title}
                      </span>
                    ))}
                  </div>
                  {sourceCoverage.missingTopics.length > 0 && (
                    <p className="source-pack-note">
                      Remaining ingestion targets: {sourceCoverage.missingTopics.slice(0, 4).join(', ')}
                      {sourceCoverage.missingTopics.length > 4 ? '...' : ''}
                    </p>
                  )}
                </section>

                <section className="results-grid">
                  <article className="answer-panel">
                    {answer ? (
                      <>
                        <div className="answer-head">
                          <span className={`severity ${answer.status.toLowerCase().replaceAll(' ', '-')}`}>
                            {answer.status === 'Unsupported' ? <AlertTriangle size={16} /> : <CheckCircle2 size={16} />}
                            {answer.status}
                          </span>
                          <small>{answer.jurisdiction}</small>
                        </div>
                        <h2>{answer.title}</h2>
                        <p>{answer.body}</p>
                        <div className="note">
                          <CircleHelp size={17} />
                          <span>{answer.note}</span>
                        </div>
                      </>
                    ) : (
                      <div className="empty-state">
                        <FileSearch size={32} />
                        <h2>Ask a question to generate a source-bound answer.</h2>
                        <p>The assistant will cite approved sections or decline to answer.</p>
                      </div>
                    )}
                  </article>

                  <article className="citation-panel">
                    <div className="panel-title">
                      <BookOpen size={18} />
                      Citations
                    </div>
                    {activeEvidence.length ? (
                      activeEvidence.map(({ doc, section }) => (
                        <div className="citation" key={`${doc.id}-${section.ref}`}>
                          <span className="pill"><Gavel size={13} /> {section.ref}</span>
                          <h3>{section.topic}</h3>
                          <p>{section.text}</p>
                          <small>{doc.title} · p. {section.page} · {doc.source}</small>
                        </div>
                      ))
                    ) : (
                      <p className="muted">No citations yet.</p>
                    )}
                  </article>
                </section>
              </>
            )}

            {activeFeature === 'inspection' && (
              <section className="inspection-screen">
                <div className="inspection-header">
                  <div>
                    <span className="premium-badge"><Sparkles size={15} /> Premium</span>
                    <h2>AI-assisted inspection</h2>
                    <p>Checklist imported from Import-Food 2025. Each item can be marked and assisted in its own violation context.</p>
                  </div>
                  <div className="inspection-controls">
                    <button className="report-preview-button" type="button" onClick={() => setShowReportPreview(true)}>
                      <FileSearch size={17} />
                      Preview report
                      <span>{reportViolations.length}</span>
                    </button>
                    <label>
                      <Filter size={16} />
                      <select value={checklistCategory} onChange={(event) => setChecklistCategory(event.target.value)}>
                        {checklistCategories.map((category) => (
                          <option key={category}>{category}</option>
                        ))}
                      </select>
                      <ChevronDown size={16} />
                    </label>
                    <div className="checklist-filter-tabs" aria-label="Checklist work queue filter">
                      {CHECKLIST_VIEW_FILTERS.map((filter) => (
                        <button
                          key={filter.id}
                          className={checklistViewFilter === filter.id ? 'active' : ''}
                          type="button"
                          onClick={() => setChecklistViewFilter(filter.id)}
                        >
                          {filter.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="inspection-metrics">
                  <div><strong>{visibleChecklistItems.length}</strong><span>showing</span></div>
                  <div><strong>{checklistCounts.IN}</strong><span>in</span></div>
                  <div><strong>{checklistCounts.OUT}</strong><span>out</span></div>
                  <div><strong>{checklistCounts.NA + checklistCounts.NO}</strong><span>n/a or n/o</span></div>
                </div>

                <div className="inspection-layout">
                  <div className="checklist-list" aria-label="Inspection checklist">
                    {visibleChecklistItems.map((item) => {
                      const status = checklistStatuses[item.id];
                      return (
                        <article className={`inspection-item ${activeChecklistItem?.id === item.id ? 'selected' : ''}`} key={item.id}>
                          <div className="inspection-item-main">
                            <button
                              className="item-title"
                              type="button"
                              onMouseDown={captureActiveViolationForm}
                              onClick={() => openChecklistAssist(item)}
                            >
                              <span>{item.number}{item.letter ? item.letter : ''}</span>
                              <strong>{item.short}</strong>
                              <small>{item.category}</small>
                            </button>
                            <button
                              className="assist-badge"
                              type="button"
                              onMouseDown={captureActiveViolationForm}
                              onClick={() => openChecklistAssist(item)}
                            >
                              <Sparkles size={15} />
                              AI Assist
                            </button>
                          </div>
                          <div className="status-buttons" aria-label={`${item.short} status`}>
                            {INSPECTION_STATUSES.map((option) => (
                              <button
                                key={option.id}
                                className={status === option.id ? `active ${option.id.toLowerCase()}` : ''}
                                type="button"
                                title={option.description}
                                onMouseDown={captureActiveViolationForm}
                                onClick={() => markChecklistItem(item, option.id)}
                              >
                                {option.label}
                              </button>
                            ))}
                          </div>
                        </article>
                      );
                    })}
                  </div>

                  <aside className="assist-panel" aria-label="AI Assist context">
                    {activeAssist && activeChecklistItem ? (
                      <>
                        <span className="premium-badge"><Sparkles size={15} /> AI Assist</span>
                        <h3>{activeAssist.title}</h3>
                        <p className="assist-category">{activeChecklistItem.category}</p>
                        <div className="assist-status-row">
                          {INSPECTION_STATUSES.map((option) => (
                            <button
                              key={option.id}
                              className={checklistStatuses[activeChecklistItem.id] === option.id ? `active ${option.id.toLowerCase()}` : ''}
                              type="button"
                              onMouseDown={captureActiveViolationForm}
                              onClick={() => markChecklistItem(activeChecklistItem, option.id)}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                        <div className="assist-block">
                          <strong>Contextual guidance</strong>
                          <p>{activeAssist.body}</p>
                        </div>
                        <div className="assist-block">
                          <strong>Inspection note support</strong>
                          <p>{activeAssist.suggestedNote}</p>
                        </div>
                        <div className="assist-block">
                          {renderViolationChat(activeChecklistItem, activeAssist, activeViolationChat, activeViolationChatDraft)}
                        </div>
                        {checklistStatuses[activeChecklistItem.id] === 'OUT' && (
                          <div className="assist-block violation-summary">
                            <strong>Violation details</strong>
                            <p>{activeViolationDetails?.commentText || 'No violation comment entered yet.'}</p>
                            <button className="draft-button" type="button" onClick={() => setViolationModalItem(activeChecklistItem)}>
                              <AlertTriangle size={17} />
                              Edit violation details
                            </button>
                          </div>
                        )}
                        <div className="assist-block">
                          <strong>Citations</strong>
                          {activeAssist.evidence.length ? (
                            activeAssist.evidence.map(({ doc, section }) => (
                              <p key={`${doc.id}-${section.ref}`}>
                                {section.ref} · {section.topic} · {doc.title}, p. {section.page}
                              </p>
                            ))
                          ) : (
                            <p>No approved citation mapped yet.</p>
                          )}
                        </div>
                      </>
                    ) : (
                      <p className="muted">Select an inspection item to open item-specific AI support.</p>
                    )}
                  </aside>
                </div>

                <section className="temperature-panel" aria-label="Temperature readings">
                  <div className="temperature-head">
                    <div>
                      <span className="premium-badge"><Clock3 size={15} /> Temperature readings</span>
                      <h3>Temperature observations</h3>
                    </div>
                    <strong>{temperatureReadings.length}</strong>
                  </div>
                  <div className="temperature-entry">
                    <label>
                      <span>Standard</span>
                      <select
                        value={temperatureDraft.standard}
                        onChange={(event) => updateTemperatureDraft('standard', event.target.value)}
                      >
                        {TEMPERATURE_STANDARDS.map((standard) => (
                          <option key={standard.id} value={standard.id}>
                            {standard.label} · {standard.limitLabel}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label>
                      <span>Location</span>
                      <input
                        value={temperatureDraft.location}
                        onChange={(event) => updateTemperatureDraft('location', event.target.value)}
                        placeholder="Prep cooler"
                      />
                    </label>
                    <label>
                      <span>Item</span>
                      <input
                        value={temperatureDraft.item}
                        onChange={(event) => updateTemperatureDraft('item', event.target.value)}
                        placeholder="Chicken salad"
                      />
                    </label>
                    <label>
                      <span>Temperature</span>
                      <input
                        value={temperatureDraft.temperature}
                        onChange={(event) => updateTemperatureDraft('temperature', event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter') saveTemperatureReading();
                        }}
                        placeholder="41 F"
                      />
                    </label>
                    <button className="send-button temperature-save" type="button" onClick={saveTemperatureReading} disabled={!canSaveTemperatureReading}>
                      <Plus size={18} />
                      Save
                    </button>
                  </div>
                  {temperatureReadings.length ? (
                    <div className="temperature-list">
                      {temperatureReadings.map((reading, index) => (
                        <article key={reading.id}>
                          <span>{index + 1}</span>
                          <div>
                            <strong>{reading.item || 'Item not entered'}</strong>
                            <small>{reading.location || 'Location not entered'} · {reading.standardLabel} · {reading.limitLabel} · {reading.capturedAt}</small>
                          </div>
                          <b>{reading.temperature || '-'}</b>
                          <button type="button" onClick={() => removeTemperatureReading(reading.id)} aria-label="Remove temperature reading">
                            <X size={16} />
                          </button>
                        </article>
                      ))}
                    </div>
                  ) : (
                    <p className="muted">Saved temperatures will appear in the report preview under Temperature Observations.</p>
                  )}
                </section>

                <section className="finalize-panel" aria-label="Finalize inspection">
                  <div>
                    <span className="premium-badge"><FileCheck2 size={15} /> Inspection closeout</span>
                    <h3>Finalize inspection</h3>
                    <p>
                      Collect final report details, capture operator and inspector signatures, save the inspection record, and generate the filled report PDF.
                    </p>
                  </div>
                  <div className="finalize-summary">
                    <span>{reportViolations.length} OUT</span>
                    <span>{temperatureReadings.length} temps</span>
                    <span>{finalizedRecord ? 'Finalized' : 'Draft'}</span>
                  </div>
                  <button
                    className="send-button finalize-button"
                    type="button"
                    onClick={() => {
                      captureActiveViolationForm();
                      setFinalizeStage('info');
                      setShowFinalizeModal(true);
                    }}
                  >
                    <FileCheck2 size={18} />
                    Finalize inspection
                  </button>
                </section>
              </section>
            )}

            {activeFeature === 'configure' && (
              <section className="config-wizard">
                <div className="config-hero">
                  <div>
                    <span className="premium-badge"><Sparkles size={15} /> Agency onboarding</span>
                    <h2>Configure AI-assisted inspection</h2>
                    <p>Select a jurisdiction, bind trusted legal sources, generate a cited draft checklist, approve items, and lock a versioned inspector profile.</p>
                  </div>
                  <div className="profile-stamp">
                    <ShieldCheck size={22} />
                    <span>Nothing becomes trusted until approved.</span>
                  </div>
                </div>

                <div className="wizard-steps">
                  {WIZARD_STEPS.map((step, index) => (
                    <button
                      key={step}
                      className={wizardStep === index ? 'active' : wizardStep > index ? 'complete' : ''}
                      type="button"
                      onClick={() => setWizardStep(index)}
                    >
                      <span>{index + 1}</span>
                      {step}
                    </button>
                  ))}
                </div>

                {wizardStep === 0 && (
                  <div className="wizard-panel">
                    <div className="wizard-copy">
                      <h3>Select jurisdiction</h3>
                      <p>This creates the agency profile that will own source selection, checklist approval, version history, and inspector-facing release.</p>
                    </div>
                    <div className="department-grid">
                      {HEALTH_DEPARTMENTS.map((department) => (
                        <button
                          key={department.id}
                          className={configDepartmentId === department.id ? 'selected' : ''}
                          type="button"
                          onClick={() => {
                            setConfigDepartmentId(department.id);
                            setConfigSourceIds(agencyDocSelections[department.id] ?? department.docs);
                          }}
                        >
                          <span className="pill good">{department.status}</span>
                          <strong>{department.name}</strong>
                          <small>{department.agency}</small>
                        </button>
                      ))}
                    </div>
                    <button className="draft-button wizard-next" type="button" onClick={() => setWizardStep(1)}>
                      <Send size={17} />
                      Continue to trusted sources
                    </button>
                  </div>
                )}

                {wizardStep === 1 && (
                  <div className="wizard-panel">
                    <div className="wizard-copy">
                      <h3>Select trusted legal sources</h3>
                      <p>Choose only sources that are in force for {configDepartment.name}. Shared master documents are reused; local documents enter review before approval.</p>
                    </div>
                    <div className="source-picker">
                      {MASTER_CODE_LIBRARY.filter((doc) =>
                        ['Gwinnett County GA', 'Georgia', 'United States'].includes(doc.jurisdiction) || configSourceIds.includes(doc.id)
                      ).slice(0, 14).map((doc) => {
                        const selected = configSourceIds.includes(doc.id);
                        return (
                          <button
                            key={doc.id}
                            className={selected ? 'selected' : ''}
                            type="button"
                            onClick={() => toggleConfigSource(doc.id)}
                          >
                            <CheckCircle2 size={17} />
                            <span>
                              <strong>{doc.title}</strong>
                              <small>{doc.authority} · {doc.scope} · {doc.version}</small>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                    <button className="draft-button wizard-next" type="button" onClick={runChecklistGeneration}>
                      <Sparkles size={17} />
                      Generate cited draft checklist
                    </button>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div className="wizard-panel">
                    <div className="wizard-copy split-copy">
                      <div>
                        <h3>Generated draft checklist</h3>
                        <p>AI proposes items from selected sources. Items without mapped citations remain blocked from approval.</p>
                      </div>
                      <div className="wizard-actions">
                        <button type="button" onClick={approveCitedDraftItems}>
                          <BadgeCheck size={16} />
                          Approve citable
                        </button>
                        <button type="button" onClick={() => setWizardStep(3)}>
                          <Send size={16} />
                          Review approval
                        </button>
                      </div>
                    </div>
                    <div className="draft-checklist">
                      {draftChecklist.length ? draftChecklist.map((item) => (
                        <article className={item.approved ? 'approved' : ''} key={item.id}>
                          <div>
                            <span className={`severity ${item.severity.toLowerCase()}`}>{item.severity}</span>
                            <h4>{item.number}{item.letter}: {item.short}</h4>
                            <p>{item.category}</p>
                            <small>{item.citation}</small>
                          </div>
                          <div>
                            <span>{item.statuses}</span>
                            <p>{item.correctivePrompt}</p>
                            <button type="button" onClick={() => toggleDraftApproval(item.id)}>
                              {item.approved ? <CheckCircle2 size={16} /> : <CircleHelp size={16} />}
                              {item.approved ? 'Approved' : 'Needs review'}
                            </button>
                          </div>
                        </article>
                      )) : (
                        <p className="muted">Generate a draft checklist from trusted sources first.</p>
                      )}
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="wizard-panel approval-panel">
                    <div className="wizard-copy">
                      <h3>Human approval</h3>
                      <p>Department admins approve only items with citation support. Approved items become eligible for the inspector-facing checklist.</p>
                    </div>
                    <div className="approval-summary">
                      <div><strong>{draftChecklist.length}</strong><span>draft items</span></div>
                      <div><strong>{approvedDraftCount}</strong><span>approved items</span></div>
                      <div><strong>{configSources.length}</strong><span>trusted sources</span></div>
                      <div><strong>{draftChecklist.length - approvedDraftCount}</strong><span>blocked or pending</span></div>
                    </div>
                    <div className="approval-list">
                      {draftChecklist.filter((item) => item.approved).slice(0, 8).map((item) => (
                        <span key={item.id}><CheckCircle2 size={15} /> {item.number}{item.letter}: {item.short}</span>
                      ))}
                    </div>
                    <button className="draft-button wizard-next" type="button" onClick={lockJurisdictionProfile} disabled={!approvedDraftCount}>
                      <ShieldCheck size={17} />
                      Lock versioned profile
                    </button>
                  </div>
                )}

                {wizardStep === 4 && (
                  <div className="wizard-panel profile-panel">
                    <div className="wizard-copy">
                      <h3>Versioned profile</h3>
                      <p>This is the inspector-facing configuration created from selected legal sources and human-approved checklist items.</p>
                    </div>
                    {lockedProfile ? (
                      <div className="locked-profile">
                        <span className="premium-badge"><ShieldCheck size={15} /> Locked</span>
                        <h3>{lockedProfile.jurisdiction} · {lockedProfile.version}</h3>
                        <p>{lockedProfile.agency} · effective {lockedProfile.effective}</p>
                        <div className="profile-grid">
                          <div><strong>{lockedProfile.docs.length}</strong><span>active trusted docs</span></div>
                          <div><strong>{lockedProfile.approvedItems.length}</strong><span>approved checklist items</span></div>
                          <div><strong>{lockedProfile.superseded}</strong><span>superseded sources</span></div>
                        </div>
                        <div className="approval-history">
                          {lockedProfile.approvalHistory.map((event) => (
                            <span key={event}><Clock3 size={15} /> {event}</span>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="muted">No locked profile yet. Complete approval to create one.</p>
                    )}
                  </div>
                )}
              </section>
            )}

            {activeFeature === 'photo' && (
              <article className="photo-panel feature-panel">
                <div className="panel-title">
                  <Camera size={18} />
                  Photo analysis aid
                </div>
                <label className="upload-target">
                  <Upload size={20} />
                  <input type="file" accept="image/*" onChange={handlePhoto} />
                  <span>{photoName || 'Attach inspection photo'}</span>
                </label>
                <div className="photo-results">
                  {photoFindings.length ? (
                    photoFindings.map((finding) => (
                      <div key={finding.label}>
                        <strong>{finding.label}</strong>
                        <p>{finding.risk}</p>
                        <button type="button" onClick={() => ask(finding.topic)}>
                          <Search size={15} />
                          Check approved rule
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="muted">The MVP flags review prompts. A later model can analyze images against local approved code and require inspector confirmation.</p>
                  )}
                </div>
              </article>
            )}

            {activeFeature === 'workflow' && (
              <article className="workflow-panel feature-panel">
                <div className="panel-title">
                  <ClipboardCheck size={18} />
                  Inspection workflow
                </div>
                <div className="checklist">
                  <label><input type="checkbox" defaultChecked /> Approved source matched</label>
                  <label><input type="checkbox" defaultChecked /> Citation displayed</label>
                  <label><input type="checkbox" /> Supervisor review needed</label>
                  <label><input type="checkbox" /> Corrected during inspection</label>
                </div>
                <button className="draft-button" type="button" onClick={() => ask('What should my inspection note include?')}>
                  <ListChecks size={17} />
                  Draft note requirements
                </button>
              </article>
            )}

            {activeFeature === 'knowledge' && (
              <article className="admin-panel feature-panel">
                <div className="panel-title">
                  <Filter size={18} />
                  Department knowledge admin
                </div>
                <div className="department-admin-head">
                  <span className="premium-badge"><ShieldCheck size={15} /> {activeDepartment.status}</span>
                  <h2>{activeDepartment.name}</h2>
                  <p>{activeDepartment.agency}</p>
                </div>
                <div className="control-list">
                  <span><CheckCircle2 size={15} /> Versioned documents</span>
                  <span><CheckCircle2 size={15} /> Effective-date tracking</span>
                  <span><CheckCircle2 size={15} /> Jurisdiction filters</span>
                  <span><CheckCircle2 size={15} /> Unsupported-answer refusal</span>
                </div>
                <div className="admin-library-grid">
                  <section>
                    <h3>Agency approved pool</h3>
                    {activeDocs.map((doc) => (
                      <div className="admin-doc-row" key={doc.id}>
                        <span className="pill good"><BadgeCheck size={13} /> Selected</span>
                        <strong>{doc.title}</strong>
                        <small>{doc.authority} · {doc.scope} · v{doc.version} · effective {doc.effective}</small>
                        <button type="button" onClick={() => removeAgencyDocument(doc.id)}>
                          <X size={14} />
                          Remove from agency
                        </button>
                      </div>
                    ))}
                  </section>
                  <section>
                    <h3>Trained elements</h3>
                    <div className="trained-elements">
                      <div><strong>{approvedCount}</strong><span>citable source sections</span></div>
                      <div><strong>{CHECKLIST_ITEMS.length}</strong><span>inspection checklist items</span></div>
                      <div><strong>{checklistCategories.length - 1}</strong><span>checklist categories</span></div>
                      <div><strong>{activeDepartment.checklist}</strong><span>active inspection form</span></div>
                    </div>
                  </section>
                </div>
                <div className="master-registry">
                  <div className="registry-head">
                    <div>
                      <h3>Master official-code registry</h3>
                      <p>Reuse shared official documents across agencies. Upload only local material that is not already in the registry.</p>
                    </div>
                    <label className="library-search registry-search">
                      <Search size={16} />
                      <input
                        value={registrySearch}
                        onChange={(event) => setRegistrySearch(event.target.value)}
                        placeholder="Search official codes, state rules, SOPs"
                      />
                    </label>
                  </div>
                  <div className="preload-panel">
                    <div>
                      <span className="premium-badge"><Sparkles size={15} /> AI preload project</span>
                      <h4>National food-code foundation</h4>
                      <p>Seed official FDA model codes and every state code locator, then promote each source only after source verification, dedupe, chunking, and approval.</p>
                    </div>
                    <div className="preload-metrics">
                      <div><strong>{preloadStats.fda}</strong><span>FDA editions / supplements</span></div>
                      <div><strong>{preloadStats.states}</strong><span>state code locators</span></div>
                      <div><strong>{preloadStats.verifiedStates}</strong><span>state sources ready</span></div>
                      <div><strong>{preloadStats.pendingStates}</strong><span>need verification</span></div>
                    </div>
                    <div className="preload-steps">
                      <span><CheckCircle2 size={15} /> Seed from official FDA Food Code pages</span>
                      <span><CheckCircle2 size={15} /> Track 2017, 2022, and supplements separately</span>
                      <span><Clock3 size={15} /> Verify each current state code from official state source</span>
                      <span><Clock3 size={15} /> Chunk, fingerprint, approve, then expose to agencies</span>
                    </div>
                  </div>
                  <div className="registry-list">
                    {registryMatches.map((doc) => {
                      const selected = activeDocIds.includes(doc.id);
                      return (
                        <article className={selected ? 'registry-row selected' : 'registry-row'} key={doc.id}>
                          <div>
                            <span className="pill"><FileCheck2 size={13} /> {doc.scope}</span>
                            <h4>{doc.title}</h4>
                            <p>{doc.authority} · {doc.jurisdiction} · v{doc.version} · effective {doc.effective}</p>
                            <small>Fingerprint: {doc.fingerprint}</small>
                          </div>
                          <button type="button" disabled={selected} onClick={() => addMasterDocument(doc.id)}>
                            {selected ? <CheckCircle2 size={16} /> : <Plus size={16} />}
                            {selected ? 'In agency pool' : 'Use shared doc'}
                          </button>
                        </article>
                      );
                    })}
                  </div>
                </div>
                <div className="upload-review">
                  <button className="draft-button" type="button" onClick={() => setShowUpload((value) => !value)}>
                    <Upload size={17} />
                    Upload new local document
                  </button>
                  {showUpload && (
                    <div className="upload-review-body">
                      <label className="upload-target compact-upload">
                        <Upload size={20} />
                        <input type="file" multiple accept=".pdf,.doc,.docx,.xlsx,.csv,.txt" onChange={handleAdminUpload} />
                        <span>Drop in ordinance, SOP, guidance, or form file</span>
                      </label>
                      <div className="pending-list">
                        {pendingUploads.length ? (
                          pendingUploads.map((upload) => (
                            <div className="pending-row" key={upload.id}>
                              <strong>{upload.name}</strong>
                              <span>{upload.size} · {upload.status}</span>
                              {upload.duplicate && <small>Looks similar to: {upload.duplicate}</small>}
                            </div>
                          ))
                        ) : (
                          <p className="muted">New uploads enter dedupe, source validation, versioning, and approval before they become available to any agency.</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            )}
          </div>
        </section>
      </section>
      {violationModalItem && (
        <div className="modal-backdrop" role="presentation">
          <section className="violation-modal" role="dialog" aria-modal="true" aria-labelledby="violation-modal-title">
            <div className="modal-header">
              <div>
                <span className="premium-badge alert-badge">
                  <AlertTriangle size={15} />
                  Out violation
                </span>
                <h2 id="violation-modal-title">Violation details</h2>
                <p>
                  {violationModalItem.number}{violationModalItem.letter ? violationModalItem.letter : ''}: {violationModalItem.short}
                </p>
              </div>
              <button className="icon-button" type="button" aria-label="Close violation details" onClick={() => setViolationModalItem(null)}>
                <X size={20} />
              </button>
            </div>
            {renderViolationCapture(violationModalItem, modalViolationDetails, modalCachedDate)}
            {modalViolationAssist &&
              renderViolationChat(violationModalItem, modalViolationAssist, modalViolationChat, modalViolationChatDraft)}
            <div className="modal-actions">
              <button className="ghost-button" type="button" onClick={() => setViolationModalItem(null)}>
                Close
              </button>
              <button className="send-button modal-save" type="button" onClick={() => setViolationModalItem(null)}>
                <CheckCircle2 size={18} />
                Save details
              </button>
            </div>
          </section>
        </div>
      )}
      {historyModalItem && (
        <div className="modal-backdrop" role="presentation">
          <section className="violation-modal history-modal" role="dialog" aria-modal="true" aria-labelledby="history-modal-title">
            <div className="modal-header">
              <div>
                <span className={historyModalEntries.length ? 'premium-badge alert-badge' : 'premium-badge'}>
                  <History size={15} />
                  Violation history
                </span>
                <h2 id="history-modal-title">
                  {historyModalItem.number}{historyModalItem.letter ? historyModalItem.letter : ''}: {historyModalItem.short}
                </h2>
                <p>{historyModalEntries.length ? 'Prior inspection data suggests this may be a repeat.' : 'No prior inspection history is loaded in this prototype.'}</p>
              </div>
              <button className="icon-button" type="button" aria-label="Close violation history" onClick={() => setHistoryModalItem(null)}>
                <X size={20} />
              </button>
            </div>
            {historyModalEntries.length ? (
              <div className="history-list">
                {historyModalEntries.map((entry) => (
                  <article key={`${entry.date}-${entry.citation}`}>
                    <div>
                      <strong>{entry.date}</strong>
                      <span>{entry.status} · {entry.citation}</span>
                    </div>
                    <p>{entry.observation}</p>
                    <p><b>Corrective action:</b> {entry.correctiveAction}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="history-empty">
                Production mode will pull prior inspection results, cited observations, correction status, and dates from the jurisdiction record system.
              </div>
            )}
            <div className="modal-actions">
              <button className="ghost-button" type="button" onClick={() => setHistoryModalItem(null)}>
                Close
              </button>
              {historyModalEntries.length > 0 && (
                <button
                  className="send-button modal-save"
                  type="button"
                  onClick={() => {
                    updateViolationDetail(historyModalItem.id, 'violationStatus', 'Repeat');
                    setHistoryModalItem(null);
                  }}
                >
                  <AlertTriangle size={18} />
                  Mark repeat
                </button>
              )}
            </div>
          </section>
        </div>
      )}
      {temperatureViolationPrompt && (
        <div className="modal-backdrop" role="presentation">
          <section className="violation-modal temperature-alert-modal" role="dialog" aria-modal="true" aria-labelledby="temperature-alert-title">
            <div className="modal-header">
              <div>
                <span className="premium-badge alert-badge">
                  <AlertTriangle size={15} />
                  Temperature violation check
                </span>
                <h2 id="temperature-alert-title">This temperature appears out of compliance.</h2>
                <p>
                  {temperatureViolationPrompt.standard.label} standard is {temperatureViolationPrompt.standard.limitLabel}.
                  {' '}Recorded: {temperatureViolationPrompt.reading.temperature || 'No temperature entered'}.
                </p>
              </div>
              <button className="icon-button" type="button" aria-label="Close temperature violation check" onClick={() => setTemperatureViolationPrompt(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="temperature-alert-summary">
              <div><strong>Location</strong><span>{temperatureViolationPrompt.reading.location || '-'}</span></div>
              <div><strong>Item</strong><span>{temperatureViolationPrompt.reading.item || '-'}</span></div>
              <div><strong>Checklist item</strong><span>{temperatureViolationPrompt.violationItem ? `${temperatureViolationPrompt.violationItem.number}${temperatureViolationPrompt.violationItem.letter}: ${temperatureViolationPrompt.violationItem.short}` : 'Mapping needed'}</span></div>
            </div>
            <div className="violation-capture">
              <label>
                <span>Violation comment</span>
                <textarea
                  value={temperatureViolationPrompt.commentText}
                  onChange={(event) =>
                    setTemperatureViolationPrompt((current) =>
                      current ? { ...current, commentText: event.target.value } : current
                    )
                  }
                />
              </label>
              <label>
                <span>Corrective action</span>
                <textarea
                  value={temperatureViolationPrompt.correctiveActionText}
                  onChange={(event) =>
                    setTemperatureViolationPrompt((current) =>
                      current ? { ...current, correctiveActionText: event.target.value } : current
                    )
                  }
                />
              </label>
            </div>
            <div className="modal-actions">
              <button className="ghost-button" type="button" onClick={saveTemperatureOnly}>
                Save temp only
              </button>
              <button className="send-button modal-save" type="button" onClick={saveTemperatureViolation}>
                <AlertTriangle size={18} />
                Save as violation
              </button>
            </div>
          </section>
        </div>
      )}
      {showFinalizeModal && (
        <div className="modal-backdrop" role="presentation">
          <section className="violation-modal finalize-modal" role="dialog" aria-modal="true" aria-labelledby="finalize-modal-title">
            <div className="modal-header">
              <div>
                <span className="premium-badge">
                  <FileCheck2 size={15} />
                  Final inspection package
                </span>
                <h2 id="finalize-modal-title">{finalizeStage === 'info' ? 'Additional report information' : 'Capture signatures'}</h2>
                <p>
                  {finalizeStage === 'info'
                    ? 'Confirm the details needed before the report can be completed.'
                    : 'Signatures lock the draft, save the inspection record, and generate the downloadable PDF.'}
                </p>
              </div>
              <button className="icon-button" type="button" aria-label="Close finalize inspection" onClick={() => setShowFinalizeModal(false)}>
                <X size={20} />
              </button>
            </div>

            {finalizeStage === 'info' ? (
              <div className="finalize-form">
                <label>
                  <span>Establishment name</span>
                  <input value={finalizeInfo.establishmentName} onChange={(event) => updateFinalizeInfo('establishmentName', event.target.value)} />
                </label>
                <label>
                  <span>Permit number</span>
                  <input value={finalizeInfo.permitNumber} onChange={(event) => updateFinalizeInfo('permitNumber', event.target.value)} />
                </label>
                <label className="wide">
                  <span>Address</span>
                  <input value={finalizeInfo.address} onChange={(event) => updateFinalizeInfo('address', event.target.value)} />
                </label>
                <label>
                  <span>City / State / ZIP</span>
                  <input value={finalizeInfo.cityStateZip} onChange={(event) => updateFinalizeInfo('cityStateZip', event.target.value)} />
                </label>
                <label>
                  <span>CFSM</span>
                  <input value={finalizeInfo.cfsm} onChange={(event) => updateFinalizeInfo('cfsm', event.target.value)} placeholder="Certified food safety manager" />
                </label>
                <label>
                  <span>Inspection type</span>
                  <select value={finalizeInfo.inspectionType} onChange={(event) => updateFinalizeInfo('inspectionType', event.target.value)}>
                    <option>Routine</option>
                    <option>Follow-up</option>
                    <option>Complaint</option>
                    <option>Opening</option>
                  </select>
                </label>
                <label>
                  <span>Time in</span>
                  <input type="time" value={finalizeInfo.timeIn} onChange={(event) => updateFinalizeInfo('timeIn', event.target.value)} />
                </label>
                <label>
                  <span>Time out</span>
                  <input type="time" value={finalizeInfo.timeOut} onChange={(event) => updateFinalizeInfo('timeOut', event.target.value)} />
                </label>
                <label>
                  <span>Follow-up required</span>
                  <select value={finalizeInfo.followUpRequired} onChange={(event) => updateFinalizeInfo('followUpRequired', event.target.value)}>
                    <option>No</option>
                    <option>Yes</option>
                  </select>
                </label>
                <label className="wide">
                  <span>Final notes</span>
                  <textarea
                    value={finalizeInfo.notes}
                    onChange={(event) => updateFinalizeInfo('notes', event.target.value)}
                    placeholder="Optional closeout notes"
                  />
                </label>
                <div className="finalize-readiness wide">
                  <div><strong>{CHECKLIST_ITEMS.length - checklistCounts.blank}</strong><span>Checklist items marked</span></div>
                  <div><strong>{reportViolations.length}</strong><span>OUT violations</span></div>
                  <div><strong>{temperatureReadings.length}</strong><span>Temperature readings</span></div>
                </div>
              </div>
            ) : (
              <div className="signature-stage">
                <SignaturePad label="Operator / person in charge signature" value={operatorSignature} onChange={setOperatorSignature} />
                <SignaturePad label="Inspector signature" value={inspectorSignature} onChange={setInspectorSignature} />
                {finalizedRecord && (
                  <div className="finalized-confirmation">
                    <CheckCircle2 size={20} />
                    <div>
                      <strong>Inspection finalized</strong>
                      <span>{finalizedRecord.id} was saved locally and the report PDF was generated.</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="modal-actions">
              {finalizeStage === 'signature' && (
                <button className="ghost-button" type="button" onClick={() => setFinalizeStage('info')}>
                  Back
                </button>
              )}
              <button className="ghost-button" type="button" onClick={() => setShowFinalizeModal(false)}>
                Close
              </button>
              {finalizeStage === 'info' ? (
                <button className="send-button modal-save" type="button" onClick={() => setFinalizeStage('signature')}>
                  <PenLine size={18} />
                  Complete report
                </button>
              ) : (
                <>
                  {finalizedRecord && (
                    <button className="ghost-button" type="button" onClick={() => downloadSheetRecord()}>
                      <Save size={18} />
                      Sheet record
                    </button>
                  )}
                  <button
                    className="send-button modal-save"
                    type="button"
                    onClick={finalizedRecord ? () => downloadFinalPdf() : completeFinalInspection}
                    disabled={!operatorSignature || !inspectorSignature}
                  >
                    <FileDown size={18} />
                    {finalizedRecord ? 'Download PDF' : 'Finalize and download PDF'}
                  </button>
                </>
              )}
            </div>
          </section>
        </div>
      )}
      {showReportPreview && (
        <div className="modal-backdrop report-backdrop" role="presentation">
          <section className="report-modal" role="dialog" aria-modal="true" aria-labelledby="report-preview-title">
            <div className="modal-header report-modal-header">
              <div>
                <span className="premium-badge">
                  <FileCheck2 size={15} />
                  Gwinnett output form
                </span>
                <h2 id="report-preview-title">Preview report</h2>
                <p>{reportViolations.length} OUT violation{reportViolations.length === 1 ? '' : 's'} mapped to the official form preview.</p>
              </div>
              <button className="icon-button" type="button" aria-label="Close report preview" onClick={() => setShowReportPreview(false)}>
                <X size={20} />
              </button>
            </div>
            {renderReportPreview()}
            <div className="modal-actions report-actions">
              <button className="ghost-button" type="button" onClick={() => setShowReportPreview(false)}>
                Close
              </button>
              <button className="send-button modal-save" type="button" onClick={() => window.print()}>
                <FileCheck2 size={18} />
                Print preview
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
