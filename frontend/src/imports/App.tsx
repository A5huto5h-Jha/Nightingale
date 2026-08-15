import { useState } from 'react'
import AuthScreen from './screens/AuthScreen'
import DashboardScreen from './screens/DashboardScreen'
import DoctorListScreen from './screens/DoctorListScreen'
import BookingScreen from './screens/BookingScreen'
import PaymentScreen from './screens/PaymentScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import BottomNav from './components/BottomNav'
import type { Screen, NavTab, Doctor, PatientProfile } from './types'

const defaultProfile: PatientProfile = {
  name: '',
  age: '',
  gender: '',
  weight: '',
  height: '',
  bloodGroup: '',
  conditions: [],
  allergies: '',
  medications: '',
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('auth')
  const [activeNav, setActiveNav] = useState<NavTab>('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [patientProfile, setPatientProfile] = useState<PatientProfile>(defaultProfile)
  const [symptoms, setSymptoms] = useState('')
  const [suggestedSpecialty, setSuggestedSpecialty] = useState('')

  const go = (s: Screen) => {
    setScreen(s)
    if (s === 'dashboard') setActiveNav('dashboard')
    if (s === 'doctors') setActiveNav('doctors')
  }

  const handleLogin = (profile: PatientProfile) => {
    setPatientProfile(profile)
    setIsLoggedIn(true)
    go('dashboard')
  }

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    go('booking')
  }

  const handleBookSlot = (slot: string) => {
    setSelectedSlot(slot)
    go('payment')
  }

  const handlePaymentConfirm = () => {
    go('confirmation')
  }

  const showNav = isLoggedIn && !['auth', 'payment', 'confirmation'].includes(screen)

  return (
    <div style={{ backgroundColor: '#F5EFE0', minHeight: '100vh' }}>
      <div
        style={{
          maxWidth: 430,
          margin: '0 auto',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: '#F5EFE0',
          boxShadow: '0 0 40px rgba(27,43,82,0.12)',
        }}
      >
        {screen === 'auth' && <AuthScreen onLogin={handleLogin} />}

        {screen === 'dashboard' && (
          <DashboardScreen
            profile={patientProfile}
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            suggestedSpecialty={suggestedSpecialty}
            setSuggestedSpecialty={setSuggestedSpecialty}
            onFindDoctors={() => go('doctors')}
          />
        )}

        {screen === 'doctors' && (
          <DoctorListScreen
            suggestedSpecialty={suggestedSpecialty}
            symptoms={symptoms}
            onSelectDoctor={handleSelectDoctor}
            onBack={() => go('dashboard')}
          />
        )}

        {screen === 'booking' && selectedDoctor && (
          <BookingScreen
            doctor={selectedDoctor}
            profile={patientProfile}
            symptoms={symptoms}
            onBook={handleBookSlot}
            onBack={() => go('doctors')}
          />
        )}

        {screen === 'payment' && selectedDoctor && selectedSlot && (
          <PaymentScreen
            doctor={selectedDoctor}
            slot={selectedSlot}
            profile={patientProfile}
            onConfirm={handlePaymentConfirm}
            onBack={() => go('booking')}
          />
        )}

        {screen === 'confirmation' && selectedDoctor && selectedSlot && (
          <ConfirmationScreen
            doctor={selectedDoctor}
            slot={selectedSlot}
            profile={patientProfile}
            onHome={() => {
              setSelectedDoctor(null)
              setSelectedSlot(null)
              go('dashboard')
            }}
          />
        )}

        {showNav && (
          <BottomNav
            active={activeNav}
            onChange={(tab) => {
              setActiveNav(tab)
              if (tab === 'dashboard') go('dashboard')
              if (tab === 'doctors') go('doctors')
            }}
          />
        )}
      </div>
    </div>
  )
}
