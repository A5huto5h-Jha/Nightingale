import { useState } from 'react'
import { C } from '../theme'
import { analyzeSymptoms, isEmergency, QUICK_SYMPTOMS } from '../data'
import type { PatientProfile } from '../types'

interface Props {
  profile: PatientProfile
  symptoms: string
  setSymptoms: (s: string) => void
  suggestedSpecialty: string
  setSuggestedSpecialty: (s: string) => void
  onFindDoctors: () => void
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

export default function DashboardScreen({
  profile, symptoms, setSymptoms,
  suggestedSpecialty, setSuggestedSpecialty, onFindDoctors,
}: Props) {
  const [analyzed, setAnalyzed] = useState(false)
  const emergency = symptoms ? isEmergency(symptoms) : false

  const handleAnalyze = () => {
    const result = analyzeSymptoms(symptoms)
    setSuggestedSpecialty(result?.specialty ?? '')
    setAnalyzed(true)
  }

  const handleQuickSymptom = (s: string) => {
    const next = symptoms ? `${symptoms}, ${s.toLowerCase()}` : s.toLowerCase()
    setSymptoms(next)
    setSuggestedSpecialty('')
    setAnalyzed(false)
  }

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: C.bg }}>
      {/* Header */}
      <div
        className="safe-top"
        style={{
          padding: '28px 24px 20px',
          borderBottom: `1px solid ${C.border}`,
          backgroundColor: C.surface,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, marginBottom: 4 }}>
              {today.toUpperCase()}
            </p>
            <h2 style={{ fontSize: 22, color: C.text }}>
              {getGreeting()}, {profile.name.split(' ')[0]}
            </h2>
          </div>
          <div style={{
            width: 40, height: 40, borderRadius: '50%',
            backgroundColor: C.goldDim,
            border: `1px solid ${C.gold}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.gold }}>
              {profile.name.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Health summary row */}
        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          {[
            { label: 'Blood', value: profile.bloodGroup || '—' },
            { label: 'Age', value: profile.age ? `${profile.age} yr` : '—' },
            { label: 'Weight', value: profile.weight ? `${profile.weight} kg` : '—' },
          ].map(stat => (
            <div key={stat.label} style={{
              flex: 1,
              padding: '8px 10px',
              borderRadius: 8,
              backgroundColor: C.hover,
              textAlign: 'center',
            }}>
              <p style={{ fontSize: 10, color: C.muted, letterSpacing: 0.4, marginBottom: 2 }}>
                {stat.label}
              </p>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* Emergency alert */}
        {emergency && (
          <div
            className="animate-pulse-red"
            style={{
              padding: '14px 16px',
              borderRadius: 10,
              backgroundColor: C.redDim,
              border: `1px solid ${C.red}`,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: C.red, marginBottom: 2 }}>
                Emergency Detected
              </p>
              <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.5 }}>
                Please call 108 immediately or go to the nearest emergency ward.
              </p>
            </div>
          </div>
        )}

        {/* Symptom input */}
        <div>
          <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>
            DESCRIBE YOUR SYMPTOMS
          </label>
          <textarea
            className="ng-input"
            rows={4}
            value={symptoms}
            onChange={e => {
              setSymptoms(e.target.value)
              setAnalyzed(false)
              setSuggestedSpecialty('')
            }}
            placeholder="e.g. I have had a persistent headache and mild fever for the past two days..."
            style={{ resize: 'none', lineHeight: 1.55 }}
          />
          {symptoms.trim().length > 0 && (
            <button
              onClick={handleAnalyze}
              style={{
                marginTop: 10,
                padding: '10px 20px',
                borderRadius: 8,
                border: `1px solid ${C.gold}`,
                backgroundColor: C.goldDim,
                color: C.gold,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                letterSpacing: 0.3,
                transition: 'all 0.15s',
              }}
            >
              Analyse Symptoms
            </button>
          )}
        </div>

        {/* Quick symptoms */}
        <div>
          <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>
            QUICK SELECT
          </label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {QUICK_SYMPTOMS.map(s => (
              <button
                key={s}
                onClick={() => handleQuickSymptom(s)}
                style={{
                  padding: '7px 12px',
                  borderRadius: 20,
                  border: `1px solid ${C.border}`,
                  backgroundColor: C.surface,
                  color: C.muted,
                  fontSize: 12,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Specialty suggestion */}
        {analyzed && suggestedSpecialty && (
          <div
            className="animate-fade-up"
            style={{
              padding: '16px',
              borderRadius: 10,
              backgroundColor: C.sageDim,
              border: `1px solid ${C.sage}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: C.sage }} />
              <p style={{ fontSize: 11, color: C.sage, letterSpacing: 0.5, fontWeight: 600 }}>
                RECOMMENDED SPECIALTY
              </p>
            </div>
            <p style={{ fontSize: 18, color: C.text, fontFamily: "'DM Serif Display', serif" }}>
              {suggestedSpecialty}
            </p>
            <p style={{ fontSize: 12, color: C.muted, marginTop: 4, lineHeight: 1.5 }}>
              Based on your symptoms, we suggest consulting a {suggestedSpecialty} specialist.
            </p>
          </div>
        )}

        {analyzed && !suggestedSpecialty && (
          <div
            className="animate-fade-in"
            style={{
              padding: '14px 16px',
              borderRadius: 10,
              backgroundColor: C.surface,
              border: `1px solid ${C.border}`,
            }}
          >
            <p style={{ fontSize: 13, color: C.muted }}>
              No specific specialty matched. A General Medicine consultation is recommended.
            </p>
          </div>
        )}

        {/* Upcoming placeholder */}
        <div>
          <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>
            UPCOMING APPOINTMENTS
          </label>
          <div style={{
            padding: '16px',
            borderRadius: 10,
            backgroundColor: C.surface,
            border: `1px solid ${C.border}`,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 13, color: C.muted }}>No upcoming appointments.</p>
          </div>
        </div>
      </div>

      {/* Find doctors CTA */}
      <div style={{ padding: '16px 24px 24px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={onFindDoctors}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 10,
            border: 'none',
            backgroundColor: C.gold,
            color: '#1E1E1E',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: 0.4,
            transition: 'opacity 0.15s',
          }}
        >
          {suggestedSpecialty ? `Find ${suggestedSpecialty} Specialists` : 'Browse Doctors'}
        </button>
      </div>
    </div>
  )
}
