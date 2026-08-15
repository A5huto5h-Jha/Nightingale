import { useState } from 'react'
import { C } from '../theme'
import { MORNING_SLOTS, EVENING_SLOTS, UNAVAILABLE_SLOTS, LIMITED_SLOTS, AVAILABLE_DATES } from '../data'
import type { Doctor, PatientProfile } from '../types'

interface Props {
  doctor: Doctor
  profile: PatientProfile
  symptoms: string
  onBook: (slot: string) => void
  onBack: () => void
}

export default function BookingScreen({ doctor, profile, symptoms, onBook, onBack }: Props) {
  const [selectedDate, setSelectedDate] = useState(0)
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
  const [teleConsult, setTeleConsult] = useState(false)

  function slotClass(slot: string) {
    if (UNAVAILABLE_SLOTS.has(slot)) return 'slot-booked'
    if (slot === selectedSlot) return 'slot-selected'
    if (LIMITED_SLOTS.has(slot)) return 'slot-limited'
    return 'slot-available'
  }

  function handleSlot(slot: string) {
    if (!UNAVAILABLE_SLOTS.has(slot)) setSelectedSlot(slot)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: C.bg }}>
      {/* Header */}
      <div
        className="safe-top"
        style={{ backgroundColor: C.surface, borderBottom: `1px solid ${C.border}`, padding: '20px 24px 18px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 style={{ fontSize: 18, color: C.text }}>Book Appointment</h2>
        </div>

        {/* Doctor compact card */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{
            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
            backgroundColor: C.hover, border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 15, fontWeight: 600, color: C.text }}>{doctor.name}</p>
            <p style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{doctor.specialty} · {doctor.hospital}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: C.gold }}>Rs. {doctor.fee}</p>
            <p style={{ fontSize: 11, color: C.muted }}>per visit</p>
          </div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 22 }}>

        {/* Patient summary */}
        <div style={{ padding: '14px', borderRadius: 10, backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>PATIENT</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{profile.name}</p>
              <p style={{ fontSize: 12, color: C.muted }}>{profile.age} yr · {profile.gender} · {profile.bloodGroup}</p>
            </div>
            {symptoms && (
              <div style={{ maxWidth: 200 }}>
                <p style={{ fontSize: 11, color: C.muted, marginBottom: 2 }}>Symptoms noted</p>
                <p style={{ fontSize: 12, color: C.text, lineHeight: 1.4 }}>
                  {symptoms.length > 60 ? symptoms.slice(0, 60) + '…' : symptoms}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Teleconsult toggle */}
        {doctor.teleConsult && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 10, backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
            <div>
              <p style={{ fontSize: 14, color: C.text, fontWeight: 500 }}>Video Consultation</p>
              <p style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>Attend from home via video call</p>
            </div>
            <button
              onClick={() => setTeleConsult(t => !t)}
              style={{
                width: 44, height: 24, borderRadius: 12,
                backgroundColor: teleConsult ? C.sage : C.border,
                border: 'none', cursor: 'pointer', position: 'relative',
                transition: 'background-color 0.2s', flexShrink: 0,
              }}
            >
              <div style={{
                position: 'absolute', top: 3, left: teleConsult ? 22 : 2,
                width: 18, height: 18, borderRadius: '50%', backgroundColor: '#fff',
                transition: 'left 0.2s',
              }} />
            </button>
          </div>
        )}

        {/* OPD info */}
        {!teleConsult && (
          <div style={{ padding: '14px', borderRadius: 10, backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
            <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>LOCATION</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { label: 'Block', value: doctor.opdBlock },
                { label: 'Floor', value: doctor.floor },
                { label: 'Room', value: doctor.room },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: C.muted }}>{r.label}</span>
                  <span style={{ fontSize: 12, color: C.text, fontWeight: 500 }}>{r.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Date picker */}
        <div>
          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>SELECT DATE</p>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
            {AVAILABLE_DATES.map((d, i) => (
              <button
                key={d.date}
                onClick={() => { setSelectedDate(i); setSelectedSlot(null) }}
                style={{
                  flexShrink: 0, minWidth: 64,
                  padding: '10px 12px', borderRadius: 10,
                  border: `1px solid ${selectedDate === i ? C.gold : C.border}`,
                  backgroundColor: selectedDate === i ? C.goldDim : C.surface,
                  color: selectedDate === i ? C.gold : C.muted,
                  cursor: 'pointer', textAlign: 'center', transition: 'all 0.15s',
                }}
              >
                <p style={{ fontSize: 10, letterSpacing: 0.4, marginBottom: 3, fontWeight: 600 }}>{d.label.toUpperCase()}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: selectedDate === i ? C.gold : C.text }}>{d.date}</p>
                <p style={{ fontSize: 10, color: selectedDate === i ? C.gold : C.muted, marginTop: 2 }}>{d.slots} slots</p>
              </button>
            ))}
          </div>
        </div>

        {/* Slot picker */}
        <div>
          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 10 }}>MORNING SLOTS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {MORNING_SLOTS.map(s => (
              <button
                key={s}
                onClick={() => handleSlot(s)}
                className={slotClass(s)}
                style={{ padding: '9px 0', borderRadius: 8, fontSize: 12, fontWeight: 500, border: '1px solid', transition: 'all 0.15s' }}
              >
                {s}
              </button>
            ))}
          </div>

          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, margin: '16px 0 10px' }}>EVENING SLOTS</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {EVENING_SLOTS.map(s => (
              <button
                key={s}
                onClick={() => handleSlot(s)}
                className={slotClass(s)}
                style={{ padding: '9px 0', borderRadius: 8, fontSize: 12, fontWeight: 500, border: '1px solid', transition: 'all 0.15s' }}
              >
                {s}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 14, marginTop: 12 }}>
            {[
              { cls: 'slot-available', label: 'Available' },
              { cls: 'slot-limited', label: 'Limited' },
              { cls: 'slot-booked', label: 'Booked' },
            ].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div className={l.cls} style={{ width: 12, height: 12, borderRadius: 3, border: '1px solid' }} />
                <span style={{ fontSize: 11, color: C.muted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={() => selectedSlot && onBook(selectedSlot)}
          disabled={!selectedSlot}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, border: 'none',
            backgroundColor: selectedSlot ? C.gold : C.border,
            color: selectedSlot ? '#1E1E1E' : C.muted,
            fontSize: 14, fontWeight: 700, cursor: selectedSlot ? 'pointer' : 'not-allowed',
            letterSpacing: 0.4, transition: 'all 0.2s',
          }}
        >
          {selectedSlot ? `Proceed — ${AVAILABLE_DATES[selectedDate].date}, ${selectedSlot}` : 'Select a time slot'}
        </button>
      </div>
    </div>
  )
}
