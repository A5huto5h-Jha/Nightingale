import type { NavTab } from '../types'
import { C } from '../theme'

interface Props {
  active: NavTab
  onChange: (tab: NavTab) => void
}

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H5a1 1 0 01-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  )
}

function IconStethoscope({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v7a6 6 0 006 6v0a6 6 0 006-6v-1" />
      <circle cx="18" cy="9" r="2" />
      <path d="M6 3H5a2 2 0 00-2 2v0a2 2 0 002 2h1" />
      <path d="M10 3h2a2 2 0 012 2v0a2 2 0 01-2 2h-2" />
      <path d="M12 16v2a3 3 0 003 3v0a3 3 0 003-3v-2" />
    </svg>
  )
}

function IconCalendar({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function IconUser({ active }: { active: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? 2 : 1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}

const ITEMS: Array<{ tab: NavTab; label: string; Icon: React.ComponentType<{ active: boolean }> }> = [
  { tab: 'dashboard',    label: 'Home',     Icon: IconHome },
  { tab: 'doctors',      label: 'Doctors',  Icon: IconStethoscope },
  { tab: 'appointments', label: 'Bookings', Icon: IconCalendar },
  { tab: 'profile',      label: 'Profile',  Icon: IconUser },
]

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div
      className="safe-bottom"
      style={{
        position: 'sticky',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: C.surface,
        borderTop: `1px solid ${C.border}`,
        display: 'flex',
      }}
    >
      {ITEMS.map(({ tab, label, Icon }) => {
        const isActive = tab === active
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            style={{
              flex: 1,
              padding: '10px 0 12px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              color: isActive ? C.gold : C.muted,
              transition: 'color 0.18s',
            }}
          >
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 28,
                height: 2,
                backgroundColor: C.gold,
                borderRadius: '0 0 2px 2px',
              }} />
            )}
            <Icon active={isActive} />
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 600 : 400,
              letterSpacing: 0.3,
              lineHeight: 1,
            }}>
              {label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
