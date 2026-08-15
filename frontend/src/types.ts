export type Screen = 'auth' | 'dashboard' | 'doctors' | 'booking' | 'payment' | 'confirmation'
export type NavTab = 'dashboard' | 'doctors' | 'appointments' | 'profile'

export interface Doctor {
  id: number
  name: string
  qualification: string
  specialty: string
  hospital: string
  distance: string
  rating: number
  reviews: number
  experience: number
  fee: number
  nextSlot: string
  queue: number
  queueCurrent: number
  opdBlock: string
  floor: string
  room: string
  icuBeds: number
  generalBeds: number
  specialties: string[]
  teleConsult: boolean
  availableToday: boolean
}

export interface PatientProfile {
  name: string
  age: string
  gender: string
  weight: string
  height: string
  bloodGroup: string
  conditions: string[]
  allergies: string
  medications: string
}
