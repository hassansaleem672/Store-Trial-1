import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    q: 'How do I place an order?',
    a: 'Add products to your cart, go to checkout, fill in your delivery details, and choose Cash on Delivery or Order via WhatsApp. Either way, your order is confirmed with us over WhatsApp.',
  },
  {
    q: 'Do I need to pay in advance?',
    a: 'No. We offer Cash on Delivery — you pay when your order arrives at your doorstep.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Orders are typically delivered within 3–5 business days depending on your city.',
  },
  {
    q: 'Can I exchange my shoes if the size is wrong?',
    a: 'Yes, message us on WhatsApp within 3 days of delivery and we\u2019ll help arrange a size exchange, subject to availability.',
  },
  {
    q: 'Which cities do you deliver to?',
    a: 'We deliver nationwide across Pakistan through our courier partners.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-3xl text-navy sm:text-4xl">Frequently Asked Questions</h1>
      <div className="mt-8 divide-y divide-line border-y border-line">
        {faqs.map((item, i) => {
          const isOpen = openIndex === i
          return (
            <div key={item.q}>
              <button
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                className="flex w-full items-center justify-between py-4 text-left"
              >
                <span className="font-display text-base text-navy">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-ink-muted transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {isOpen && <p className="pb-4 text-sm text-ink-muted">{item.a}</p>}
            </div>
          )
        })}
      </div>
    </div>
  )
}
