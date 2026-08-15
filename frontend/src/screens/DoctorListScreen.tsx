import { useState } from 'react'
import { C } from '../theme'
import { doctors } from '../data'
import type { Doctor } from '../types'

interface Props {
  suggestedSpecialty: string
  symptoms: string
  onSelectDoctor: (doctor: Doctor) => void
  onBack: () => void
}

const SPECIALTIES = ['All', 'Cardiology', 'Neurology', 'General Medicine', 'Orthopaedics', 'Gynaecology', 'Dermatology']

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill={C.gold} stroke="none">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
      <span style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{rating}</span>
    </div>
  )
}

function DoctorCard({ doctor, onSelect }: { doctor: Doctor; onSelect: () => void }) {
  const queueRemaining = doctor.queue - doctor.queueCurrent
  const queueFrac = doctor.queue > 0 ? doctor.queueCurrent / doctor.queue : 0

  return (
    <div style={{
      backgroundColor: C.surface,
      border: `1px solid ${C.border}`,
      borderRadius: 12,
      padding: '18px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
    }}>
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        {/* Avatar */}
        <div style={{
          width: 48, height: 48, borderRadius: 10, flexShrink: 0,
          backgroundColor: C.hover,
          border: `1px solid ${C.border}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
            <h3 style={{ fontSize: 15, color: C.text, fontFamily: "'DM Serif Display', serif", margin: 0 }}>
              {doctor.name}
            </h3>
            <StarRating rating={doctor.rating} />
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.4 }}>
            {doctor.qualification}
          </p>
        </div>
      </div>

      {/* Specialty + Availability */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <span style={{
          padding: '4px 10px', borderRadius: 20,
          backgroundColor: C.goldDim, color: C.gold,
          fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
        }}>
          {doctor.specialty}
        </span>
        {doctor.availableToday && (
          <span style={{
            padding: '4px 10px', borderRadius: 20,
            backgroundColor: C.sageDim, color: C.sage,
            fontSize: 11, fontWeight: 600, letterSpacing: 0.3,
          }}>
            Available Today
          </span>
        )}
        {doctor.teleConsult && (
          <span style={{
            padding: '4px 10px', borderRadius: 20,
            backgroundColor: C.hover, color: C.muted,
            fontSize: 11, letterSpacing: 0.3,
          }}>
            Teleconsult
          </span>
        )}
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {[
          { label: 'Experience', value: `${doctor.experience} yr` },
          { label: 'Consultation', value: `Rs. ${doctor.fee}` },
          { label: 'Reviews', value: doctor.reviews.toString() },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '8px',
            borderRadius: 8,
            backgroundColor: C.hover,
            textAlign: 'center',
          }}>
            <p style={{ fontSize: 10, color: C.muted, letterSpacing: 0.3, marginBottom: 2 }}>{stat.label}</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Location */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <p style={{ fontSize: 12, color: C.muted }}>
          {doctor.hospital} · {doctor.distance}
        </p>
      </div>

      {/* Queue indicator */}
      {doctor.availableToday && doctor.queue > 0 && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: C.muted }}>
              Queue — {queueRemaining} ahead
            </span>
            <span style={{ fontSize: 11, color: C.muted }}>
              Next: {doctor.nextSlot}
            </span>
          </div>
          <div style={{ height: 3, borderRadius: 2, backgroundColor: C.border, overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${queueFrac * 100}%`,
              borderRadius: 2,
              backgroundColor: queueFrac > 0.7 ? C.red : C.sage,
              transition: 'width 0.4s',
            }} />
          </div>
        </div>
      )}

      {/* CTA */}
      <button
        onClick={onSelect}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: 8,
          border: `1px solid ${C.gold}`,
          backgroundColor: C.goldDim,
          color: C.gold,
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          letterSpacing: 0.4,
          transition: 'background-color 0.15s',
        }}
      >
        View & Book
      </button>
    </div>
  )
}

export default function DoctorListScreen({ suggestedSpecialty, onSelectDoctor, onBack }: Props) {
  const [activeFilter, setActiveFilter] = useState(suggestedSpecialty || 'All')
  const [search, setSearch] = useState('')

  const filtered = doctors.filter(d => {
    const matchSpec = activeFilter === 'All' || d.specialty === activeFilter
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase())
    return matchSpec && matchSearch
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, backgroundColor: C.bg }}>
      {/* Header */}
      <div
        className="safe-top"
        style={{
          backgroundColor: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: '20px 24px 16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <button
            onClick={onBack}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: C.muted, padding: 0, display: 'flex', alignItems: 'center',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>
          <h2 style={{ fontSize: 18, color: C.text }}>
            {activeFilter === 'All' ? 'All Specialists' : activeFilter}
          </h2>
        </div>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <svg
            width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke={C.muted} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }}
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            className="ng-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search doctors or specialties"
            style={{ paddingLeft: 36 }}
          />
        </div>

        {/* Specialty filter chips */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 2 }}>
          {SPECIALTIES.map(sp => (
            <button
              key={sp}
              onClick={() => setActiveFilter(sp)}
              style={{
                flexShrink: 0,
                padding: '6px 14px',
                borderRadius: 20,
                border: `1px solid ${activeFilter === sp ? C.gold : C.border}`,
                backgroundColor: activeFilter === sp ? C.goldDim : 'transparent',
                color: activeFilter === sp ? C.gold : C.muted,
                fontSize: 12,
                fontWeight: activeFilter === sp ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {sp}
            </button>
          ))}
        </div>
      </div>

      {/* Doctor list */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px 32px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.length === 0 ? (
          <div style={{
            padding: '40px 0', textAlign: 'center', color: C.muted, fontSize: 14,
          }}>
            No doctors found for this filter.
          </div>
        ) : (
          filtered.map(d => (
            <DoctorCard key={d.id} doctor={d} onSelect={() => onSelectDoctor(d)} />
          ))
        )}
      </div>
    </div>
  )
}
