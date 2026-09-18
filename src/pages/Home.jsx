import { Link } from 'react-router-dom'
import { products, categories } from '../data/products'
import ProductCard from '../components/product/ProductCard'

export default function Home() {
  const featured = products.slice(0, 4)

  return (
    <div>
      {/* Hero */}
      <section className="bg-navy text-cream">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28">
          <div>
            <p className="text-sm tracking-wide text-gold-light">Handpicked footwear, made for daily life</p>
            <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
              Step into something built to last.
            </h1>
            <p className="mt-5 max-w-md text-cream/75">
              H&R brings you comfortable, well-made shoes for men and women — delivered across
              Pakistan with Cash on Delivery.
            </p>
            <div className="mt-8 flex gap-4">
              <Link
                to="/shop"
                className="bg-gold px-7 py-3 text-sm font-semibold tracking-wide text-navy transition-colors hover:bg-gold-light"
              >
                Shop Now
              </Link>
              <Link
                to="/about"
                className="border border-cream/30 px-7 py-3 text-sm font-semibold tracking-wide text-cream transition-colors hover:border-cream"
              >
                Our Story
              </Link>
            </div>
          </div>
          <div className="hidden justify-self-end md:block">
            <div className="flex h-72 w-72 items-center justify-center border border-cream/20 font-display text-6xl text-cream/20">
              H&R
            </div>
          </div>
        </div>
      </section>

      {/* Category shortcuts */}
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
              <span className="text-sm text-ink-muted transition-transform group-hover:translate-x-1">
                Explore
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-display text-2xl text-navy">New arrivals</h2>
          <Link to="/shop" className="text-sm text-gold hover:text-navy">
            View all
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-line bg-white">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-center sm:px-6 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-navy">Cash on Delivery</p>
            <p className="mt-1 text-sm text-ink-muted">Pay when your order arrives</p>
          </div>
          <div>
            <p className="font-display text-lg text-navy">Nationwide Delivery</p>
            <p className="mt-1 text-sm text-ink-muted">Shipped anywhere in Pakistan</p>
          </div>
          <div>
            <p className="font-display text-lg text-navy">Order on WhatsApp</p>
            <p className="mt-1 text-sm text-ink-muted">Real replies from a real person</p>
          </div>
        </div>
      </section>
    </div>
  )
}
