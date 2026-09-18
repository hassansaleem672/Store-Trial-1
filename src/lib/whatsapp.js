export const WHATSAPP_NUMBER = '923033348598' // 03033348598 in international format, no + or leading 0

export function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

// Builds the full order message shared by both "Cash on Delivery" and
// "Order via WhatsApp" checkout options, so every order lands in WhatsApp
// with the same complete details.
export function buildOrderMessage({ customer, cart, subtotal, paymentMethod }) {
  const lines = []
  lines.push('New Order — H&R')
  lines.push('')
  lines.push('Customer Details')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  lines.push(`Address: ${customer.address}`)
  lines.push(`City: ${customer.city}`)
  if (customer.notes) lines.push(`Order Notes: ${customer.notes}`)
  lines.push('')
  lines.push('Order Items')
  cart.forEach((line, i) => {
    lines.push(
      `${i + 1}. ${line.name} — Size: ${line.size}, Color: ${line.color}, Qty: ${line.quantity}, Price: ${formatPKR(
        line.price
      )} each`
    )
  })
  lines.push('')
  lines.push(`Total Amount: ${formatPKR(subtotal)}`)
  lines.push(`Payment Method: ${paymentMethod}`)

  return lines.join('\n')
}

export function buildWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
