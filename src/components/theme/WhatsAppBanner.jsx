import { MessageCircle } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function WhatsAppBanner() {
  const { theme } = useTheme()
  const { whatsappNumber, whatsappDisplay } = theme.store

  return (
    <section className="bg-gold">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:px-6 sm:text-left">
        <div className="flex items-center gap-3">
          <MessageCircle className="text-white" size={28} />
          <div>
            <p className="font-display text-lg text-white">Need help choosing?</p>
            <p className="text-sm text-white/85">Chat with us directly on WhatsApp — {whatsappDisplay}</p>
          </div>
        </div>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="border border-white px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-gold"
        >
          Chat Now
        </a>
      </div>
    </section>
  )
}
