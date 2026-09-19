import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { formatPKR } from '../../lib/whatsapp'
import { useCart } from '../../context/CartContext'

export default function ProductCard({ product }) {
  const { addToCart } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.sizes[0], product.colors[0], 1)
  }

  return (
    <div className="group flex flex-col">
      <Link to={`/product/${product.id}`} className="block">
        <div className="aspect-square overflow-hidden border border-line bg-white">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mt-3">
          <p className="text-xs uppercase tracking-wide text-ink-muted">{product.category}</p>
          <h3 className="mt-1 font-display text-base text-navy sm:text-lg">{product.name}</h3>
          <p className="mt-1 text-sm font-semibold text-gold">{formatPKR(product.price)}</p>
        </div>
      </Link>

      <div className="mt-3 flex gap-2">
        <Link
          to={`/product/${product.id}`}
          className="flex-1 border border-navy px-3 py-2 text-center text-xs font-semibold tracking-wide text-navy transition-colors hover:bg-navy hover:text-cream sm:text-sm"
        >
          View Product
        </Link>
        <button
          onClick={handleQuickAdd}
          aria-label={`Add ${product.name} to cart`}
          className="flex items-center justify-center border border-gold bg-gold px-3 py-2 text-cream transition-colors hover:bg-gold-light"
        >
          <ShoppingBag size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  )
}
