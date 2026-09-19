export default function Shipping() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-3xl text-navy sm:text-4xl">Shipping Information</h1>
      <div className="mt-6 space-y-5 text-ink-muted">
        <p>We deliver across Pakistan through trusted local courier partners.</p>
        <div>
          <h2 className="font-display text-lg text-navy">Delivery Time</h2>
          <p className="mt-1">Orders are typically delivered within 3–5 business days, depending on your city.</p>
        </div>
        <div>
          <h2 className="font-display text-lg text-navy">Delivery Charges</h2>
          <p className="mt-1">A flat delivery fee applies nationwide, calculated at checkout.</p>
        </div>
        <div>
          <h2 className="font-display text-lg text-navy">Order Tracking</h2>
          <p className="mt-1">Once your order is dispatched, we'll share tracking details with you directly on WhatsApp.</p>
        </div>
      </div>
    </div>
  )
}
