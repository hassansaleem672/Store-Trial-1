import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { products } from '../data/products'
import { formatPKR } from '../lib/whatsapp'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/product/ProductCard'
import Button from '../components/ui/Button'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const product = products.find((p) => p.id === id)

  const [selectedSize, setSelectedSize] = useState(product?.sizes[0])
  const [selectedColor, setSelectedColor] = useState(product?.colors[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl text-navy">Product not found</h1>
        <p className="mt-3 text-ink-muted">This product may have been removed or the link is incorrect.</p>
        <Link to="/shop" className="mt-6 inline-block border border-navy px-6 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-cream">
          Back to Shop
        </Link>
      </div>
    )
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity)
    navigate('/checkout')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      {/* Breadcrumb */}
      <nav className="text-sm text-ink-muted">
        <Link to="/shop" className="hover:text-navy">Shop</Link>
        <span className="mx-2">/</span>
        <Link to={`/shop?category=${product.category}`} className="hover:text-navy">{product.category}</Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-10 md:grid-cols-2 md:gap-14">
        {/* Images */}
        <div>
          <div className="aspect-square overflow-hidden border border-line bg-white">
            <img
              src={product.images[activeImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-20 w-20 overflow-hidden border ${
                    activeImage === i ? 'border-navy' : 'border-line'
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-wide text-ink-muted">{product.category}</p>
          <h1 className="mt-1 font-display text-3xl text-navy">{product.name}</h1>
          <p className="mt-3 text-xl font-semibold text-gold">{formatPKR(product.price)}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-ink-muted">{product.description}</p>

          {/* Size selector */}
          <div className="mt-7">
            <p className="text-sm font-medium text-navy">Size (EU)</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`h-10 w-10 border text-sm transition-colors ${
                    selectedSize === size
                      ? 'border-navy bg-navy text-cream'
                      : 'border-line text-ink hover:border-navy'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color selector */}
          <div className="mt-6">
            <p className="text-sm font-medium text-navy">Color</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`border px-4 py-2 text-sm transition-colors ${
                    selectedColor === color
                      ? 'border-navy bg-navy text-cream'
                      : 'border-line text-ink hover:border-navy'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-medium text-navy">Quantity</p>
            <div className="mt-2 flex w-fit items-center border border-line">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="p-2.5 text-ink-muted hover:text-navy"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Increase quantity"
                className="p-2.5 text-ink-muted hover:text-navy"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button tone="secondary" onClick={handleAddToCart} className="flex-1">
              <ShoppingBag size={18} />
              {added ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <Button onClick={handleBuyNow} className="flex-1">
              Buy Now
            </Button>
          </div>

          {!product.inStock && (
            <p className="mt-4 text-sm text-red-600">Currently out of stock.</p>
          )}
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20 border-t border-line pt-12">
          <h2 className="font-display text-2xl text-navy">You may also like</h2>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
