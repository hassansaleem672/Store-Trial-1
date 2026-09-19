export function formatPKR(amount) {
  return `Rs. ${amount.toLocaleString('en-PK')}`
}

// Builds the full order message shared by both "Cash on Delivery" and
// "Order via WhatsApp" checkout options, so every order lands in WhatsApp
// with the same complete details, including delivery and total.
export function buildOrderMessage({ customer, cart, subtotal, delivery, total, paymentMethod }) {
  const lines = []
  lines.push('H&R ORDER')
  lines.push('')
  lines.push('Customer Details')
  lines.push(`Name: ${customer.name}`)
  lines.push(`Phone: ${customer.phone}`)
  if (customer.email) lines.push(`Email: ${customer.email}`)
  lines.push(`Address: ${customer.address}`)
  lines.push(`City: ${customer.city}`)
  if (customer.notes) lines.push(`Order Notes: ${customer.notes}`)
  lines.push('')
  lines.push('Order Items')
  cart.forEach((line, i) => {
    lines.push(
      `${i + 1}. ${line.name} — Size: ${line.size}, Color: ${line.color}, Qty: ${line.quantity}, Price: ${formatPKR(
        line.price
      )} each, Line Total: ${formatPKR(line.price * line.quantity)}`
    )
  })
  lines.push('')
  lines.push(`Subtotal: ${formatPKR(subtotal)}`)
  lines.push(`Delivery: ${delivery === 0 ? 'Free' : formatPKR(delivery)}`)
  lines.push(`Total: ${formatPKR(total)}`)
  lines.push(`Payment Method: ${paymentMethod}`)

  return lines.join('\n')
}

export function buildWhatsAppLink(message, whatsappNumber) {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
}
