import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatPKR, buildOrderMessage, buildWhatsAppLink } from '../lib/whatsapp'

const emptyForm = { name: '', phone: '', address: '', city: '', notes: '' }

export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery')

  if (cart.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
        <h1 className="font-display text-3xl text-navy">Nothing to check out</h1>
        <p className="mt-3 text-ink-muted">Add a few products to your cart first.</p>
        <Link
          to="/shop"
          className="mt-8 inline-block bg-gold px-7 py-3 text-sm font-semibold tracking-wide text-white hover:bg-gold-light"
        >
          Browse Shoes
        </Link>
      </div>
    )
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

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
  // function — every order, regardless of payment method chosen, opens
  // WhatsApp with the full order details pre-filled, as requested.
  const submitOrder = (method) => {
    if (!validate()) return
    setPaymentMethod(method)
    const message = buildOrderMessage({ customer: form, cart, subtotal, paymentMethod: method })
    const link = buildWhatsAppLink(message)
    window.open(link, '_blank')
    clearCart()
    navigate('/', { state: { orderPlaced: true } })
  }

  const inputClass = (field) =>
    `w-full border bg-white px-4 py-2.5 text-sm focus:outline-none ${
      errors[field] ? 'border-red-500' : 'border-line focus:border-navy'
    }`

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl text-navy">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        {/* Customer form */}
        <div className="lg:col-span-2">
          <h2 className="font-display text-lg text-navy">Delivery Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className={`mt-1 ${inputClass('name')}`}
                placeholder="Your full name"
              />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-navy">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`mt-1 ${inputClass('phone')}`}
                placeholder="03XX XXXXXXX"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-navy">City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                className={`mt-1 ${inputClass('city')}`}
                placeholder="e.g. Lahore"
              />
              {errors.city && <p className="mt-1 text-xs text-red-600">{errors.city}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Full Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className={`mt-1 ${inputClass('address')}`}
                placeholder="House #, street, area"
              />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>

            <div className="sm:col-span-2">
              <label className="text-sm font-medium text-navy">Order Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={3}
                className="mt-1 w-full border border-line bg-white px-4 py-2.5 text-sm focus:border-navy focus:outline-none"
                placeholder="Delivery instructions, landmark, etc."
              />
            </div>
          </div>

          <p className="mt-6 text-sm text-ink-muted">
            Choose how you'd like to place your order below. Both options send your complete
            order details to us on WhatsApp so we can confirm it with you.
          </p>
        </div>

        {/* Order summary + actions */}
        <div className="h-fit border border-line bg-white p-6">
          <h2 className="font-display text-lg text-navy">Order Summary</h2>
          <div className="mt-4 space-y-3 border-b border-line pb-4">
            {cart.map((line) => (
              <div key={`${line.id}-${line.size}-${line.color}`} className="flex justify-between text-sm">
                <span className="text-ink-muted">
                  {line.name} ({line.size}, {line.color}) &times; {line.quantity}
                </span>
                <span className="text-navy">{formatPKR(line.price * line.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between font-display text-lg text-navy">
            <span>Total</span>
            <span>{formatPKR(subtotal)}</span>
          </div>

          <div className="mt-6 space-y-3">
            <button
              onClick={() => submitOrder('Cash on Delivery')}
              className="block w-full bg-gold py-3 text-center text-sm font-semibold tracking-wide text-white hover:bg-gold-light"
            >
              Place Order — Cash on Delivery
            </button>
            <button
              onClick={() => submitOrder('Order via WhatsApp')}
              className="block w-full border border-navy py-3 text-center text-sm font-semibold tracking-wide text-navy hover:bg-navy hover:text-cream"
            >
              Order via WhatsApp
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-ink-muted">
            You'll be redirected to WhatsApp to confirm your order with us.
          </p>
        </div>
      </div>
    </div>
  )
}
