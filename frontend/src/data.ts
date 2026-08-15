import type { Doctor } from './types'

export const doctors: Doctor[] = [
  {
    id: 1,
    name: 'Dr. Anika Sharma',
    qualification: 'MD, DM (Cardiology) — AIIMS, New Delhi',
    specialty: 'Cardiology',
    hospital: 'Apollo Hospital, Koramangala',
    distance: '1.8 km',
    rating: 4.9,
    reviews: 342,
    experience: 14,
    fee: 1200,
    nextSlot: 'Today, 4:30 PM',
    queue: 16,
    queueCurrent: 11,
    opdBlock: 'Block B — Cardiac Sciences',
    floor: '3rd Floor',
    room: 'Room 312',
    icuBeds: 4,
    generalBeds: 12,
    specialties: ['Echocardiography', 'Interventional Cardiology', 'Heart Failure', 'Arrhythmia'],
    teleConsult: true,
    availableToday: true,
  },
  {
    id: 2,
    name: 'Dr. Rajesh Iyer',
    qualification: 'MD, DM (Neurology) — NIMHANS, Bengaluru',
    specialty: 'Neurology',
    hospital: 'Manipal Hospital, HAL Airport Rd',
    distance: '2.4 km',
    rating: 4.8,
    reviews: 218,
    experience: 19,
    fee: 1500,
    nextSlot: 'Today, 5:00 PM',
    queue: 9,
    queueCurrent: 6,
    opdBlock: 'Neurosciences Wing',
    floor: '5th Floor',
    room: 'Room 514',
    icuBeds: 2,
    generalBeds: 8,
    specialties: ['Epilepsy', 'Migraine & Headache', 'Stroke Management', 'Multiple Sclerosis'],
    teleConsult: false,
    availableToday: true,
  },
  {
    id: 3,
    name: 'Dr. Priya Menon',
    qualification: "MBBS, MD (Internal Medicine) — St. John's Medical College",
    specialty: 'General Medicine',
    hospital: 'Fortis Hospital, Bannerghatta Rd',
    distance: '0.9 km',
    rating: 4.7,
    reviews: 567,
    experience: 10,
    fee: 600,
    nextSlot: 'Today, 3:15 PM',
    queue: 22,
    queueCurrent: 14,
    opdBlock: 'Main OPD Block',
    floor: '2nd Floor',
    room: 'Room 201',
    icuBeds: 6,
    generalBeds: 24,
    specialties: ['Fever & Infections', 'Diabetes Management', 'Hypertension', 'Preventive Health'],
    teleConsult: true,
    availableToday: true,
  },
  {
    id: 4,
    name: 'Dr. Saurabh Gupta',
    qualification: 'MS (Orthopaedics), Fellowship Joint Replacement — PGI Chandigarh',
    specialty: 'Orthopaedics',
    hospital: 'Narayana Health, Bommasandra',
    distance: '3.2 km',
    rating: 4.6,
    reviews: 189,
    experience: 12,
    fee: 900,
    nextSlot: 'Tomorrow, 10:00 AM',
    queue: 0,
    queueCurrent: 0,
    opdBlock: 'Bone & Joint Centre',
    floor: '4th Floor',
    room: 'Room 401',
    icuBeds: 1,
    generalBeds: 16,
    specialties: ['Joint Replacement', 'Sports Injuries', 'Spine Surgery', 'Arthroscopy'],
    teleConsult: false,
    availableToday: false,
  },
  {
    id: 5,
    name: 'Dr. Lakshmi Nair',
    qualification: 'MD, DGO (Obstetrics & Gynaecology) — Kasturba Medical College',
    specialty: 'Gynaecology',
    hospital: 'Columbia Asia, Whitefield',
    distance: '4.1 km',
    rating: 4.9,
    reviews: 423,
    experience: 16,
    fee: 1100,
    nextSlot: 'Today, 6:00 PM',
    queue: 7,
    queueCurrent: 4,
    opdBlock: "Women's Health Wing",
    floor: '2nd Floor',
    room: 'Room 208',
    icuBeds: 0,
    generalBeds: 20,
    specialties: ['High-risk Pregnancy', 'PCOS & Hormonal Health', 'Endometriosis', 'Laparoscopic Surgery'],
    teleConsult: true,
    availableToday: true,
  },
  {
    id: 6,
    name: 'Dr. Arjun Mathur',
    qualification: 'MD (Dermatology, Venereology & Leprosy) — Maulana Azad Medical College',
    specialty: 'Dermatology',
    hospital: 'Sakra World Hospital, Marathahalli',
    distance: '2.1 km',
    rating: 4.7,
    reviews: 291,
    experience: 8,
    fee: 800,
    nextSlot: 'Today, 4:00 PM',
    queue: 12,
    queueCurrent: 8,
    opdBlock: 'Skin & Aesthetics Centre',
    floor: '1st Floor',
    room: 'Room 106',
    icuBeds: 0,
    generalBeds: 6,
    specialties: ['Acne & Eczema', 'Hair Loss & Alopecia', 'Cosmetic Dermatology', 'Psoriasis'],
    teleConsult: true,
    availableToday: true,
  },
]

export const symptomDomainMap: Array<{ keywords: string[]; domain: string; specialty: string }> = [
  { keywords: ['chest pain', 'chest tightness', 'palpitation', 'heart'], domain: 'Cardiology', specialty: 'Cardiology' },
  { keywords: ['shortness of breath', 'breathing', 'breathless'], domain: 'Pulmonology / Cardiology', specialty: 'Cardiology' },
  { keywords: ['headache', 'migraine', 'seizure', 'vertigo', 'dizziness', 'numbness', 'memory'], domain: 'Neurology', specialty: 'Neurology' },
  { keywords: ['fever', 'flu', 'cold', 'body pain', 'fatigue', 'weakness', 'vomiting', 'nausea', 'diarrhea'], domain: 'General Medicine', specialty: 'General Medicine' },
  { keywords: ['joint pain', 'knee pain', 'back pain', 'shoulder pain', 'fracture', 'sprain'], domain: 'Orthopaedics', specialty: 'Orthopaedics' },
  { keywords: ['skin rash', 'acne', 'itching', 'hair loss', 'fungal', 'eczema', 'psoriasis'], domain: 'Dermatology', specialty: 'Dermatology' },
  { keywords: ['period', 'pregnancy', 'pcos', 'fertility', 'menstrual', 'ovarian', 'uterine'], domain: 'Gynaecology', specialty: 'Gynaecology' },
]

export function analyzeSymptoms(text: string): { domain: string; specialty: string } | null {
  const lower = text.toLowerCase()
  for (const entry of symptomDomainMap) {
    for (const kw of entry.keywords) {
      if (lower.includes(kw)) return { domain: entry.domain, specialty: entry.specialty }
    }
  }
  return null
}

const EMERGENCY_KEYWORDS = ['chest pain', 'cannot breathe', "can't breathe", 'unconscious', 'stroke', 'heart attack', 'severe bleeding', 'seizure']

export function isEmergency(text: string): boolean {
  const lower = text.toLowerCase()
  return EMERGENCY_KEYWORDS.some(kw => lower.includes(kw))
}

export const MORNING_SLOTS = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
export const EVENING_SLOTS = ['04:00 PM', '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM']
export const UNAVAILABLE_SLOTS = new Set(['09:30 AM', '10:30 AM', '04:00 PM', '05:30 PM'])
export const LIMITED_SLOTS = new Set(['11:00 AM', '06:00 PM'])

export const CHRONIC_CONDITIONS = [
  'Type 2 Diabetes', 'Hypertension', 'Asthma', 'Heart Condition',
  'Thyroid Disorder', 'Arthritis', 'PCOD / PCOS', 'Chronic Kidney Disease',
]

export const BLOOD_GROUPS = ['A+', 'A−', 'B+', 'B−', 'O+', 'O−', 'AB+', 'AB−', 'Unknown']

export const QUICK_SYMPTOMS = [
  'High Fever', 'Severe Headache', 'Chest Tightness', 'Joint Pain',
  'Skin Rash', 'Nausea', 'Breathlessness', 'Fatigue',
]

export const AVAILABLE_DATES = [
  { label: 'Today', date: '15 Aug', slots: 14 },
  { label: 'Tomorrow', date: '16 Aug', slots: 22 },
  { label: 'Sun', date: '17 Aug', slots: 9 },
  { label: 'Mon', date: '18 Aug', slots: 31 },
  { label: 'Tue', date: '19 Aug', slots: 28 },
  { label: 'Wed', date: '20 Aug', slots: 18 },
]
