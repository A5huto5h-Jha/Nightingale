import { useState } from 'react'
import { C } from '../theme'
import { CHRONIC_CONDITIONS, BLOOD_GROUPS } from '../data'
import type { PatientProfile } from '../types'

interface Props {
  onLogin: (profile: PatientProfile) => void
}

const GENDERS = ['Male', 'Female', 'Other']

export default function AuthScreen({ onLogin }: Props) {
  const [step, setStep] = useState(1)
  const [profile, setProfile] = useState<PatientProfile>({
    name: '', age: '', gender: '', weight: '', height: '',
    bloodGroup: '', conditions: [], allergies: '', medications: '',
  })

  const set = (key: keyof PatientProfile, value: string | string[]) =>
    setProfile(p => ({ ...p, [key]: value }))

  const toggleCondition = (c: string) =>
    set('conditions', profile.conditions.includes(c)
      ? profile.conditions.filter(x => x !== c)
      : [...profile.conditions, c])

  const canStep1 = profile.name.trim().length > 0 && profile.age.trim().length > 0 && profile.gender.length > 0
  const canStep2 = profile.bloodGroup.length > 0
  const canStep3 = true

  const handleContinue = () => {
    if (step < 3) setStep(s => s + 1)
    else onLogin(profile)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '11px 14px',
    border: `1px solid ${C.border}`,
    borderRadius: 8,
    backgroundColor: C.bg,
    color: C.text,
    fontSize: 14,
    outline: 'none',
    transition: 'border-color 0.18s',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', backgroundColor: C.bg }}>
      {/* Header */}
      <div
        className="safe-top"
        style={{ padding: '32px 28px 24px', borderBottom: `1px solid ${C.border}` }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 6 }}>
          <h1 style={{ fontFamily: "'DM Serif Display', serif", fontSize: 26, color: C.text }}>
            NavaCare
          </h1>
          <div style={{
            width: 6, height: 6, borderRadius: '50%',
            backgroundColor: C.gold, marginBottom: 4,
          }} />
        </div>
        <p style={{ fontSize: 13, color: C.muted, letterSpacing: 0.2 }}>
          Premium healthcare, on your terms.
        </p>
      </div>

      {/* Step indicator */}
      <div style={{ padding: '20px 28px 0', display: 'flex', alignItems: 'center', gap: 6 }}>
        {[1, 2, 3].map(n => (
          <div key={n} style={{
            height: 3,
            flex: 1,
            borderRadius: 2,
            backgroundColor: n <= step ? C.gold : C.border,
            transition: 'background-color 0.3s',
          }} />
        ))}
      </div>

      <div style={{ padding: '4px 28px 8px' }}>
        <p style={{ fontSize: 11, color: C.muted, letterSpacing: 0.4 }}>
          STEP {step} OF 3
        </p>
      </div>

      {/* Form content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 28px 24px' }}>

        {step === 1 && (
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, color: C.text, marginBottom: 4 }}>
                Your profile
              </h2>
              <p style={{ fontSize: 13, color: C.muted }}>
                Basic details to personalise your experience.
              </p>
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                FULL NAME
              </label>
              <input
                className="ng-input"
                value={profile.name}
                onChange={e => set('name', e.target.value)}
                placeholder="Rahul Verma"
                autoFocus
              />
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                AGE
              </label>
              <input
                className="ng-input"
                value={profile.age}
                onChange={e => set('age', e.target.value)}
                placeholder="34"
                inputMode="numeric"
                style={{ maxWidth: 120 }}
              />
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>
                GENDER
              </label>
              <div style={{ display: 'flex', gap: 8 }}>
                {GENDERS.map(g => (
                  <button
                    key={g}
                    onClick={() => set('gender', g)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: 8,
                      border: `1px solid ${profile.gender === g ? C.gold : C.border}`,
                      backgroundColor: profile.gender === g ? C.goldDim : C.surface,
                      color: profile.gender === g ? C.gold : C.muted,
                      fontSize: 13,
                      fontWeight: profile.gender === g ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {g}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, color: C.text, marginBottom: 4 }}>
                Physical details
              </h2>
              <p style={{ fontSize: 13, color: C.muted }}>
                Helps doctors assess your health accurately.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                  HEIGHT (cm)
                </label>
                <input
                  className="ng-input"
                  value={profile.height}
                  onChange={e => set('height', e.target.value)}
                  placeholder="172"
                  inputMode="numeric"
                />
              </div>
              <div>
                <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                  WEIGHT (kg)
                </label>
                <input
                  className="ng-input"
                  value={profile.weight}
                  onChange={e => set('weight', e.target.value)}
                  placeholder="68"
                  inputMode="numeric"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>
                BLOOD GROUP
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {BLOOD_GROUPS.map(bg => (
                  <button
                    key={bg}
                    onClick={() => set('bloodGroup', bg)}
                    style={{
                      padding: '7px 14px',
                      borderRadius: 8,
                      border: `1px solid ${profile.bloodGroup === bg ? C.gold : C.border}`,
                      backgroundColor: profile.bloodGroup === bg ? C.goldDim : C.surface,
                      color: profile.bloodGroup === bg ? C.gold : C.muted,
                      fontSize: 13,
                      fontWeight: profile.bloodGroup === bg ? 600 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      minWidth: 52,
                    }}
                  >
                    {bg}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 22, color: C.text, marginBottom: 4 }}>
                Medical history
              </h2>
              <p style={{ fontSize: 13, color: C.muted }}>
                Optional — skip if not applicable.
              </p>
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 10 }}>
                CHRONIC CONDITIONS
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {CHRONIC_CONDITIONS.map(c => {
                  const sel = profile.conditions.includes(c)
                  return (
                    <button
                      key={c}
                      onClick={() => toggleCondition(c)}
                      style={{
                        padding: '7px 12px',
                        borderRadius: 8,
                        border: `1px solid ${sel ? C.sage : C.border}`,
                        backgroundColor: sel ? C.sageDim : C.surface,
                        color: sel ? C.sage : C.muted,
                        fontSize: 12,
                        fontWeight: sel ? 600 : 400,
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                    >
                      {c}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                KNOWN ALLERGIES
              </label>
              <input
                className="ng-input"
                value={profile.allergies}
                onChange={e => set('allergies', e.target.value)}
                placeholder="Penicillin, Shellfish (leave blank if none)"
              />
            </div>

            <div>
              <label style={{ fontSize: 11, color: C.muted, letterSpacing: 0.5, display: 'block', marginBottom: 6 }}>
                CURRENT MEDICATIONS
              </label>
              <textarea
                className="ng-input"
                rows={3}
                value={profile.medications}
                onChange={e => set('medications', e.target.value)}
                placeholder="Metformin 500mg, Amlodipine 5mg (leave blank if none)"
                style={{ resize: 'none' }}
              />
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 28px 28px', borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={handleContinue}
          disabled={step === 1 ? !canStep1 : step === 2 ? !canStep2 : !canStep3}
          style={{
            width: '100%',
            padding: '14px',
            borderRadius: 10,
            border: 'none',
            backgroundColor: (step === 1 ? canStep1 : step === 2 ? canStep2 : true) ? C.gold : C.border,
            color: (step === 1 ? canStep1 : step === 2 ? canStep2 : true) ? '#1E1E1E' : C.muted,
            fontSize: 14,
            fontWeight: 600,
            cursor: (step === 1 ? canStep1 : step === 2 ? canStep2 : true) ? 'pointer' : 'not-allowed',
            letterSpacing: 0.4,
            transition: 'all 0.2s',
          }}
        >
          {step < 3 ? 'Continue' : 'Enter NavaCare'}
        </button>

        {step > 1 && (
          <button
            onClick={() => setStep(s => s - 1)}
            style={{
              width: '100%',
              marginTop: 10,
              padding: '12px',
              borderRadius: 10,
              border: `1px solid ${C.border}`,
              backgroundColor: 'transparent',
              color: C.muted,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'color 0.15s',
            }}
          >
            Back
          </button>
        )}
      </div>
    </div>
  )
}
