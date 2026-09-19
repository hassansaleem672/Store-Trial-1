import { Link, useLocation } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/product/ProductCard'
import TrustBadges from '../components/theme/TrustBadges'
import WhatsAppBanner from '../components/theme/WhatsAppBanner'
import Button from '../components/ui/Button'
import { useTheme } from '../context/ThemeContext'

export default function Home() {
  const featured = products.slice(0, 4)
  const location = useLocation()
  const orderPlaced = location.state?.orderPlaced
  const { theme } = useTheme()
  const { hero, homeSections } = theme

  return (
    <div>
      {orderPlaced && (
        <div className="bg-gold px-4 py-3 text-center text-sm font-medium text-white">
          Thank you! Your order details have been sent on WhatsApp — we'll confirm shortly.
        </div>
      )}

      {homeSections.hero && (
        <section className="bg-navy text-cream">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
            <div>
              <p className="text-sm tracking-wide text-gold-light">Handpicked footwear, made for daily life</p>
              <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{hero.heading}</h1>
              <p className="mt-5 max-w-md text-cream/75">{hero.subtitle}</p>
              <div className="mt-8 flex gap-4">
                <Button to={hero.primaryLink}>{hero.primaryText}</Button>
                <Link
                  to={hero.secondaryLink}
                  className="border border-cream/30 px-7 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:border-cream"
                >
                  {hero.secondaryText}
                </Link>
              </div>
            </div>
            <div className="hidden justify-self-end md:block">
              <div className="flex h-72 w-72 items-center justify-center border border-cream/20 font-display text-6xl text-cream/20">
                {theme.brand.storeName}
              </div>
            </div>
          </div>
        </section>
      )}

      {homeSections.categories && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="font-display text-2xl text-navy">Shop by category</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/shop?category=${cat}`}
                className="group flex items-center justify-between border border-line bg-white px-6 py-8 transition-colors hover:border-navy"
              >
                <span className="font-display text-xl text-navy">{cat}</span>
                <span className="text-sm text-ink-muted transition-transform group-hover:translate-x-1">Explore</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {homeSections.newArrivals && (
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-2xl text-navy">New arrivals</h2>
            <Link to="/shop" className="text-sm text-gold hover:text-navy">View all</Link>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {homeSections.trustBadges && <TrustBadges />}
      {homeSections.whatsappBanner && <WhatsAppBanner />}
    </div>
  )
}
