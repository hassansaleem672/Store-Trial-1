import { Banknote, Truck, MessageCircle, ShieldCheck, RotateCcw, CheckCircle, Heart, Star, Lock, Headphones, Package } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

const iconMap = { Banknote, Truck, MessageCircle, ShieldCheck, RotateCcw, CheckCircle, Heart, Star, Lock, Headphones, Package }

export default function TrustBadges() {
  const { theme } = useTheme()
  const badges = theme.trustBadges

  if (!badges || badges.length === 0) return null

  return (
    <section className="border-y border-line bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-center sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {badges.map((badge) => {
          const Icon = iconMap[badge.icon] || CheckCircle
          return (
            <div key={badge.id} className="flex flex-col items-center">
              <Icon className="text-gold" size={28} strokeWidth={1.75} />
              <p className="mt-2 font-display text-lg text-navy">{badge.title}</p>
              <p className="mt-1 text-sm text-ink-muted">{badge.text}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
