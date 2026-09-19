import { Link } from 'react-router-dom'
import { Mail, MessageCircle } from 'lucide-react'
import logo from '../../assets/logo.webp'
import { useTheme } from '../../context/ThemeContext'

export default function Footer() {
  const { theme } = useTheme()
  const { whatsappNumber, whatsappDisplay, email } = theme.store

  return (
    <footer className="mt-24 border-t border-line bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 md:grid-cols-4">
        <div>
          <img src={logo} alt={theme.brand.storeName} className="h-10 w-auto brightness-0 invert" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Premium footwear for everyday life, delivered across Pakistan with Cash on Delivery.
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg">Shop</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/shop" className="hover:text-gold-light">All Products</Link></li>
            <li><Link to="/shop?category=Casuals" className="hover:text-gold-light">Casuals</Link></li>
            <li><Link to="/shop?category=Sandals" className="hover:text-gold-light">Sandals</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Get in touch</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/about" className="hover:text-gold-light">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-gold-light">Contact</Link></li>
            <li><Link to="/size-guide" className="hover:text-gold-light">Size Guide</Link></li>
            <li><Link to="/faq" className="hover:text-gold-light">FAQ</Link></li>
            <li>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-gold-light">
                <MessageCircle size={16} /> {whatsappDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-gold-light">
                <Mail size={16} /> {email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Policies</h3>
          <ul className="mt-4 space-y-2 text-sm text-cream/70">
            <li><Link to="/shipping" className="hover:text-gold-light">Shipping Information</Link></li>
            <li><Link to="/returns" className="hover:text-gold-light">Returns &amp; Exchanges</Link></li>
            <li><Link to="/privacy" className="hover:text-gold-light">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-gold-light">Terms &amp; Conditions</Link></li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-1 border-t border-white/10 px-4 py-5 text-center text-xs text-cream/50 sm:px-6">
        <span>© {new Date().getFullYear()} {theme.brand.storeName}. All rights reserved.</span>
        <Link to="/theme-editor" className="text-cream/30 hover:text-cream/60">Store Owner: Theme Editor</Link>
      </div>
    </footer>
  )
}
