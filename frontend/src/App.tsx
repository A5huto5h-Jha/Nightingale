import { useState } from 'react'
import AuthScreen from './screens/AuthScreen'
import DashboardScreen from './screens/DashboardScreen'
import DoctorListScreen from './screens/DoctorListScreen'
import BookingScreen from './screens/BookingScreen'
import PaymentScreen from './screens/PaymentScreen'
import ConfirmationScreen from './screens/ConfirmationScreen'
import BottomNav from './components/BottomNav'
import type { Screen, NavTab, Doctor, PatientProfile } from './types'
import { C } from './theme'

const defaultProfile: PatientProfile = {
  name: '', age: '', gender: '', weight: '', height: '',
  bloodGroup: '', conditions: [], allergies: '', medications: '',
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
    <div className="desktop-wrapper">
      {/* Desktop Left Sidebar Panel - Gorgeous premium look on large displays */}
      <div className="desktop-sidebar">
        <div className="desktop-sidebar-content">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
            <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 42, color: C.text, margin: 0 }}>
              NavaCare
            </h1>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              backgroundColor: C.gold,
            }} />
          </div>
          <p style={{ fontSize: 16, color: C.muted, marginBottom: 48, letterSpacing: 0.2 }}>
            Premium healthcare, on your terms.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 48 }}>
            {[
              { icon: '✨', title: 'AI Symptom Triage', desc: 'Describe your symptoms naturally. Our engine suggests the correct specialist instantly.' },
              { icon: '⚡', title: 'Live Queue Engine', desc: 'Monitor real-time waiting queues and consultation progress directly from your device.' },
              { icon: '💳', title: 'Seamless Payments', desc: 'Confirm appointments instantly with integrated UPI and secure digital payment modes.' },
              { icon: '🏥', title: 'Premium OPD Care', desc: 'Access top-tier hospital rooms and blocks with structured directional assistance.' },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{
                  fontSize: 20, padding: 8,
                  backgroundColor: C.goldDim, border: `1px solid rgba(226, 183, 20, 0.15)`,
                  borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40, flexShrink: 0,
                }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: C.text, marginBottom: 4, fontFamily: "'Inter', sans-serif" }}>
                    {f.title}
                  </h4>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, margin: 0 }}>
                     {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 11, color: '#5C6066', lineHeight: 1.6 }}>
            <p style={{ margin: 0 }}>© 2026 NavaCare Technologies. All rights reserved.</p>
            <p style={{ marginTop: 4, marginBottom: 0 }}>Optimised for all modern desktop, laptop and mobile browsers.</p>
          </div>
        </div>
      </div>

      {/* Interactive Frame Container */}
      <div className="app-frame-container">
        <div className="app-frame">
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
    </div>
  )
}
