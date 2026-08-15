import type { NavTab } from '../types'

const NAVY = '#1B2B52'
const GOLD = '#C9A84C'
const CREAM = '#F5EFE0'
const PARCHMENT = '#FDFAF3'

interface Props {
  active: NavTab
  onChange: (tab: NavTab) => void
}

const NAV_ITEMS: Array<{ tab: NavTab; icon: string; label: string }> = [
  { tab: 'dashboard', icon: '🏥', label: 'Home' },
  { tab: 'doctors', icon: '🩺', label: 'Doctors' },
  { tab: 'appointments', icon: '📅', label: 'Bookings' },
  { tab: 'profile', icon: '👤', label: 'Profile' },
]

export default function BottomNav({ active, onChange }: Props) {
  return (
    <div style={{
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      backgroundColor: PARCHMENT,
      borderTop: '1px solid rgba(27,43,82,0.1)',
      display: 'flex',
      boxShadow: '0 -4px 20px rgba(27,43,82,0.08)',
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = item.tab === active
        return (
          <button
            key={item.tab}
            onClick={() => onChange(item.tab)}
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
            }}
          >
            {/* Active indicator line */}
            {isActive && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 32,
                height: 3,
                backgroundColor: GOLD,
                borderRadius: '0 0 3px 3px',
              }} />
            )}
            <span style={{
              fontSize: 20,
              lineHeight: 1,
              filter: isActive ? 'none' : 'grayscale(100%) opacity(0.45)',
              transition: 'filter 0.2s',
            }}>
              {item.icon}
            </span>
            <span style={{
              fontSize: 10,
              fontWeight: isActive ? 700 : 400,
              color: isActive ? NAVY : 'rgba(27,43,82,0.4)',
              letterSpacing: isActive ? 0.3 : 0,
              transition: 'all 0.2s',
            }}>
              {item.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
