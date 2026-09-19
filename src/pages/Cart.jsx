import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { formatPKR } from '../lib/whatsapp'
import { calculateTotals } from '../lib/pricing'
import Button from '../components/ui/Button'

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, subtotal, lineKey } = useCart()
  const { theme } = useTheme()
  const { deliveryFee, freeDeliveryThreshold } = theme.store
  const { delivery, total, qualifiesForFreeDelivery, amountToFreeDelivery } = calculateTotals(
    subtotal,
    deliveryFee,
    freeDeliveryThreshold
  )

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl text-navy">Your cart is empty</h1>
        <p className="mt-3 text-ink-muted">Looks like you haven't added anything yet.</p>
        <Button to="/shop" className="mt-8">Continue Shopping</Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl text-navy">Your Cart</h1>

      {/* Free shipping progress */}
      <div className="mt-6 border border-line bg-white p-4">
        {qualifiesForFreeDelivery ? (
          <p className="text-sm font-medium text-gold">You've unlocked free delivery!</p>
        ) : (
          <p className="text-sm text-ink-muted">
            Add <span className="font-semibold text-navy">{formatPKR(amountToFreeDelivery)}</span> more to get free delivery.
          </p>
        )}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full bg-gold transition-all"
            style={{ width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="divide-y divide-line border-y border-line">
            {cart.map((line) => (
              <div key={lineKey(line)} className="flex gap-4 py-5">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden border border-line bg-white">
                  <img src={line.image} alt={line.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-base text-navy">{line.name}</h3>
                      <p className="mt-0.5 text-sm text-ink-muted">
                        Size: {line.size} &middot; Color: {line.color}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(line)}
                      aria-label={`Remove ${line.name} from cart`}
                      className="text-ink-muted hover:text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <div className="flex items-center border border-line">
                      <button
                        onClick={() => updateQuantity(line, line.quantity - 1)}
                        aria-label="Decrease quantity"
                        className="p-2 text-ink-muted hover:text-navy"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm">{line.quantity}</span>
                      <button
                        onClick={() => updateQuantity(line, line.quantity + 1)}
                        aria-label="Increase quantity"
                        className="p-2 text-ink-muted hover:text-navy"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="text-sm font-semibold text-gold">
                      {formatPKR(line.price * line.quantity)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/shop" className="mt-6 inline-block text-sm text-navy underline underline-offset-4 hover:text-gold">
            Continue Shopping
          </Link>
        </div>

        <div className="h-fit border border-line bg-white p-6">
          <h2 className="font-display text-lg text-navy">Order Summary</h2>
          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Delivery</span>
              <span>{delivery === 0 ? 'Free' : formatPKR(delivery)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between border-t border-line pt-4 font-display text-lg text-navy">
            <span>Total</span>
            <span>{formatPKR(total)}</span>
          </div>
          <Button to="/checkout" className="mt-6 w-full">Proceed to Checkout</Button>
        </div>
      </div>
    </div>
  )
}
