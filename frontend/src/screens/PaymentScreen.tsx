import { useState } from 'react'
import { C } from '../theme'
import type { Doctor, PatientProfile } from '../types'

interface Props {
  doctor: Doctor
  slot: string
  profile: PatientProfile
  onConfirm: () => void
  onBack: () => void
}

type PaymentMethod = 'upi' | 'card' | 'cash'

const METHODS: Array<{ id: PaymentMethod; label: string; sub: string }> = [
  { id: 'upi',  label: 'UPI',         sub: 'Google Pay, PhonePe, BHIM' },
  { id: 'card', label: 'Card',        sub: 'Credit or debit card' },
  { id: 'cash', label: 'Pay at OPD',  sub: 'Cash at hospital counter' },
]

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: 13, color: C.muted }}>{label}</span>
      <span style={{ fontSize: 13, fontWeight: highlight ? 700 : 500, color: highlight ? C.gold : C.text }}>
        {value}
      </span>
    </div>
  )
}

export default function PaymentScreen({ doctor, slot, profile, onConfirm, onBack }: Props) {
  const [method, setMethod] = useState<PaymentMethod>('upi')

  const tax = Math.round(doctor.fee * 0.18)
  const total = doctor.fee + tax

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: C.bg }}>
      {/* Header */}
      <div
        className="safe-top"
        style={{ backgroundColor: C.surface, borderBottom: `1px solid ${C.border}`, padding: '20px 24px 18px' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <button onClick={onBack} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 0, display: 'flex', alignItems: 'center' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 style={{ fontSize: 18, color: C.text }}>Payment</h2>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Booking summary */}
        <div style={{ padding: '16px', borderRadius: 10, backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 12 }}>APPOINTMENT SUMMARY</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <Row label="Doctor" value={doctor.name} />
            <Row label="Specialty" value={doctor.specialty} />
            <Row label="Hospital" value={doctor.hospital} />
            <Row label="Slot" value={slot} />
            <Row label="Patient" value={profile.name} />
          </div>
        </div>

        {/* Payment methods */}
        <div>
          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 12 }}>PAYMENT METHOD</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {METHODS.map(m => {
              const active = method === m.id
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '14px 16px', borderRadius: 10,
                    border: `1px solid ${active ? C.gold : C.border}`,
                    backgroundColor: active ? C.goldDim : C.surface,
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                >
                  <div style={{
                    width: 18, height: 18, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${active ? C.gold : C.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {active && <div style={{ width: 9, height: 9, borderRadius: '50%', backgroundColor: C.gold }} />}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: active ? 600 : 400, color: active ? C.gold : C.text }}>
                      {m.label}
                    </p>
                    <p style={{ fontSize: 12, color: C.muted, marginTop: 1 }}>{m.sub}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Price breakdown */}
        <div style={{ padding: '16px', borderRadius: 10, backgroundColor: C.surface, border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 12 }}>PRICE BREAKDOWN</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Row label="Consultation fee" value={`Rs. ${doctor.fee}`} />
            <Row label="GST (18%)" value={`Rs. ${tax}`} />
            <div style={{ height: 1, backgroundColor: C.border, margin: '4px 0' }} />
            <Row label="Total payable" value={`Rs. ${total}`} highlight />
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={onConfirm}
          style={{
            width: '100%', padding: '14px', borderRadius: 10, border: 'none',
            backgroundColor: C.gold, color: '#1E1E1E',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            letterSpacing: 0.4,
          }}
        >
          Confirm & Pay — Rs. {total}
        </button>
        <p style={{ fontSize: 11, color: C.muted, textAlign: 'center', marginTop: 10, lineHeight: 1.5 }}>
          By confirming, you agree to our cancellation policy. Full refund within 4 hours of the appointment.
        </p>
      </div>
    </div>
  )
}
