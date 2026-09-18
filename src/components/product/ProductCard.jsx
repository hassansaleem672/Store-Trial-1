import { Link } from 'react-router-dom'
import { formatPKR } from '../../lib/whatsapp'

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="aspect-square overflow-hidden border border-line bg-white">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-3">
        <p className="text-sm text-ink-muted">{product.category}</p>
        <h3 className="mt-0.5 font-display text-base text-navy">{product.name}</h3>
        <p className="mt-1 text-sm font-semibold text-gold">{formatPKR(product.price)}</p>
      </div>
    </Link>
  )
}
