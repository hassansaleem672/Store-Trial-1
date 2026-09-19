import { Link } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'

const shapeMap = {
  square: '0px',
  'slightly-rounded': '4px',
  rounded: '8px',
  pill: '9999px',
}

const sizeMap = {
  compact: { padding: '0.5rem 1rem', fontSize: '0.8rem' },
  normal: { padding: '0.75rem 1.5rem', fontSize: '0.875rem' },
  large: { padding: '1rem 2rem', fontSize: '0.95rem' },
}

// A shared Button so the Theme Editor's button-shape/style/size settings can
// apply consistently everywhere it's used, instead of every page hardcoding
// its own button classes.
export default function Button({ to, href, onClick, tone = 'primary', children, className = '', type = 'button', disabled, ...rest }) {
  const { theme } = useTheme()
  const { shape, style, size } = theme.buttons

  const radius = shapeMap[shape] ?? shapeMap.square
  const sizing = sizeMap[size] ?? sizeMap.normal
  // "primary" honors the global solid/outline toggle; "secondary" is always
  // an outline for visual contrast against a primary action next to it.
  const isOutline = tone === 'secondary' ? true : style === 'outline'
  const color = tone === 'primary' ? 'var(--color-gold)' : 'var(--color-navy)'

  const computedStyle = {
    borderRadius: radius,
    padding: sizing.padding,
    fontSize: sizing.fontSize,
    fontWeight: 600,
    letterSpacing: '0.02em',
    border: `1.5px solid ${color}`,
    backgroundColor: isOutline ? 'transparent' : color,
    color: isOutline ? color : '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'opacity 0.2s ease',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
  }

  const sharedProps = {
    style: computedStyle,
    className: `hr-btn ${className}`,
    onMouseEnter: (e) => { if (!disabled) e.currentTarget.style.opacity = '0.85' },
    onMouseLeave: (e) => { if (!disabled) e.currentTarget.style.opacity = '1' },
  }

  if (to) {
    return (
      <Link to={to} {...sharedProps}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" {...sharedProps}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} {...sharedProps}>
      {children}
    </button>
  )
}
