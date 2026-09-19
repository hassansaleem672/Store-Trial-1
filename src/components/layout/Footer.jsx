import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import logo from '../../assets/logo.webp'
import { WHATSAPP_NUMBER } from '../../lib/whatsapp'

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:grid-cols-2 md:grid-cols-4">
        <div>
          <img src={logo} alt="H&R" className="h-10 w-auto brightness-0 invert" />
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
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold-light"
              >
                <MessageCircle size={16} /> 0303 3348598
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

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-cream/50 sm:px-6">
        © {new Date().getFullYear()} H&R. All rights reserved.
      </div>
    </footer>
  )
}
