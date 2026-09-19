import { Mail, MessageCircle } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

export default function Contact() {
  const { theme } = useTheme()
  const { whatsappNumber, whatsappDisplay, email, address } = theme.store

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-3xl text-navy sm:text-4xl">Contact Us</h1>
      <p className="mt-4 text-ink-muted">
        Have a question about an order, sizing, or delivery? Reach out and we'll get back to you as soon as we can.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="border border-line bg-white p-6">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-gold" size={24} />
            <div>
              <p className="font-display text-lg text-navy">WhatsApp</p>
              <p className="text-sm text-ink-muted">{whatsappDisplay}</p>
            </div>
          </div>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="mt-5 block bg-gold py-3 text-center text-sm font-semibold tracking-wide text-white hover:bg-gold-light"
          >
            Message Us on WhatsApp
          </a>
        </div>

        <div className="border border-line bg-white p-6">
          <div className="flex items-center gap-3">
            <Mail className="text-gold" size={24} />
            <div>
              <p className="font-display text-lg text-navy">Email</p>
              <p className="text-sm text-ink-muted">{email}</p>
            </div>
          </div>
          <a
            href={`mailto:${email}`}
            className="mt-5 block border border-navy py-3 text-center text-sm font-semibold tracking-wide text-navy hover:bg-navy hover:text-cream"
          >
            Send an Email
          </a>
        </div>
      </div>

      <div className="mt-8 border border-line bg-white p-6">
        <p className="font-display text-lg text-navy">Store Address</p>
        <p className="mt-1 text-sm text-ink-muted">{address}</p>
      </div>
    </div>
  )
}
