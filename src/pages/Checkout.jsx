import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useTheme } from '../context/ThemeContext'
import { formatPKR, buildOrderMessage, buildWhatsAppLink } from '../lib/whatsapp'
import { calculateTotals } from '../lib/pricing'
import Button from '../components/ui/Button'

const emptyForm = { name: '', phone: '', email: '', address: '', city: '', notes: '' }

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart()
  const { theme } = useTheme()
  const { whatsappNumber, deliveryFee, freeDeliveryThreshold } = theme.store
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [readyMessage, setReadyMessage] = useState(null)

  const { delivery, total } = calculateTotals(subtotal, deliveryFee, freeDeliveryThreshold)

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl text-navy">Nothing to check out</h1>
        <p className="mt-3 text-ink-muted">Add a few products to your cart first.</p>
        <Button to="/shop" className="mt-8">Browse Shoes</Button>
      </div>
    )
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!form.phone.trim()) next.phone = 'Phone number is required'
    else if (!/^[0-9+\s-]{7,15}$/.test(form.phone.trim())) next.phone = 'Enter a valid phone number'
    if (!form.address.trim()) next.address = 'Address is required'
    if (!form.city.trim()) next.city = 'City is required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Both "Cash on Delivery" and "Order via WhatsApp" go through this same
  // function — every order opens WhatsApp with the full order details
  // pre-filled. We do NOT clear the cart or claim the order is placed until
  // the customer actually sends that message themselves.
  const submitOrder = (method) => {
    if (!validate()) return
    const message = buildOrderMessage({ customer: form, cart, subtotal, delivery, total, paymentMethod: method })
    const link = buildWhatsAppLink(message, whatsappNumber)
    window.open(link, '_blank')
    setReadyMessage(method)
  }

  const handleDone = () => {
    clearCart()
    navigate('/', { state: { orderPlaced: true } })
  }

  const inputClass = (field) =>
    `w-full border bg-white px-4 py-2.5 text-sm focus:outline-none ${
      errors[field] ? 'border-red-500' : 'border-line focus:border-navy'
    }`

  if (readyMessage) {
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-2xl text-navy">Your order details are ready in WhatsApp</h1>
        <p className="mt-4 text-ink-muted">
          Please send the pre-filled message to H&R on WhatsApp to complete your order
          ({readyMessage}). If WhatsApp didn't open automatically, check your pop-up blocker.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button onClick={handleDone}>Done — Return to Home</Button>
          <Button tone="secondary" onClick={() => setReadyMessage(null)}>Back to Checkout</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl text-navy">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg text-navy">Delivery Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Full Name</label>
              <input name="name" value={form.name} onChange={handleChange} className={`mt-1 ${inputClass('name')}`} placeholder="Your full name" />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-navy">Phone Number</label>
              <input name="phone" value={form.phone} onChange={handleChange} className={`mt-1 ${inputClass('phone')}`} placeholder="03XX XXXXXXX" />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>
            <div>
              <label className="text-sm font-medium text-navy">Email (optional)</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-line bg-white px-4 py-2.5 text-sm focus:border-navy focus:outline-none" placeholder="you@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">City</label>
              <input name="city" value={form.city} onChange={handleChange} className={`mt-1 ${inputClass('city')}`} placeholder="e.g. Lahore" />
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Full Address</label>
              <input name="address" value={form.address} onChange={handleChange} className={`mt-1 ${inputClass('address')}`} placeholder="House #, street, area" />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Order Notes (optional)</label>
              <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} className="mt-1 w-full border border-line bg-white px-4 py-2.5 text-sm focus:border-navy focus:outline-none" placeholder="Delivery instructions, landmark, etc." />
            </div>
          </div>

          <div className="mt-6 border border-line bg-white p-4">
            <p className="font-display text-base text-navy">Payment Method</p>
            <p className="mt-1 text-sm text-ink-muted">Cash on Delivery — pay when your order is delivered.</p>
          </div>
        </div>

        <div className="h-fit border border-line bg-white p-6">
          <h2 className="font-display text-lg text-navy">Order Summary</h2>
          <div className="mt-4 space-y-3 border-b border-line pb-4">
            {cart.map((line) => (
              <div key={`${line.id}-${line.size}-${line.color}`} className="flex justify-between text-sm">
                <span className="text-ink-muted">{line.name} ({line.size}, {line.color}) &times; {line.quantity}</span>
                <span className="text-navy">{formatPKR(line.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2 border-b border-line pb-4 text-sm">
            <div className="flex justify-between text-ink-muted">
              <span>Subtotal</span><span>{formatPKR(subtotal)}</span>
            </div>
            <div className="flex justify-between text-ink-muted">
              <span>Delivery</span><span>{delivery === 0 ? 'Free' : formatPKR(delivery)}</span>
            </div>
          </div>
          <div className="mt-4 flex justify-between font-display text-lg text-navy">
            <span>Total</span><span>{formatPKR(total)}</span>
          </div>

          <div className="mt-6 space-y-3">
            <Button onClick={() => submitOrder('Cash on Delivery')} className="w-full">
              Place Order — Cash on Delivery
            </Button>
            <Button tone="secondary" onClick={() => submitOrder('Order via WhatsApp')} className="w-full">
              Order via WhatsApp
            </Button>
          </div>
          <p className="mt-4 text-center text-xs text-ink-muted">
            You'll be redirected to WhatsApp to send us your order.
          </p>
        </div>
      </div>
    </div>
  )
}
