import { C } from '../theme'
import type { Doctor, PatientProfile } from '../types'

interface Props {
  doctor: Doctor
  slot: string
  profile: PatientProfile
  onHome: () => void
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
      <span style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 12, color: C.text, fontWeight: 500, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

export default function ConfirmationScreen({ doctor, slot, profile, onHome }: Props) {
  const appointmentId = `NC-${Date.now().toString(36).toUpperCase().slice(-6)}`

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: C.bg }}>
      <div
        className="safe-top"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 28px' }}
      >
        {/* Checkmark */}
        <div
          className="animate-check"
          style={{
            width: 80, height: 80, borderRadius: '50%',
            border: `2px solid ${C.sage}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={C.sage} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>

        <h2 style={{ fontSize: 26, color: C.text, textAlign: 'center', marginBottom: 8 }}>
          Appointment Confirmed
        </h2>
        <p style={{ fontSize: 13, color: C.muted, textAlign: 'center', marginBottom: 32, lineHeight: 1.6 }}>
          Your booking is confirmed. A summary has been noted below.
        </p>

        {/* Details card */}
        <div style={{
          width: '100%', padding: '20px',
          borderRadius: 12, backgroundColor: C.surface,
          border: `1px solid ${C.border}`,
          display: 'flex', flexDirection: 'column', gap: 12,
          marginBottom: 32,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
            <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5 }}>BOOKING DETAILS</p>
            <span style={{
              padding: '3px 10px', borderRadius: 20,
              backgroundColor: C.sageDim, color: C.sage,
              fontSize: 11, fontWeight: 600,
            }}>
              {appointmentId}
            </span>
          </div>
          <div style={{ height: 1, backgroundColor: C.border }} />
          <Detail label="Doctor" value={doctor.name} />
          <Detail label="Specialty" value={doctor.specialty} />
          <Detail label="Hospital" value={doctor.hospital} />
          <Detail label="Block / Room" value={`${doctor.opdBlock} · ${doctor.room}`} />
          <Detail label="Appointment" value={slot} />
          <Detail label="Patient" value={profile.name} />
          <Detail label="Age / Gender" value={`${profile.age} yr · ${profile.gender}`} />
        </div>

        {/* Reminder note */}
        <div style={{
          width: '100%', padding: '14px 16px',
          borderRadius: 10, backgroundColor: C.goldDim,
          border: `1px solid rgba(226,183,20,0.25)`,
          marginBottom: 8,
        }}>
          <p style={{ fontSize: 12, color: C.gold, lineHeight: 1.6 }}>
            Please arrive 15 minutes before your appointment. Carry a valid ID and any previous prescriptions.
          </p>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 28px 28px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={onHome}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, border: 'none',
            backgroundColor: C.gold, color: '#1E1E1E',
            fontSize: 14, fontWeight: 700, cursor: 'pointer', letterSpacing: 0.4,
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  )
}
