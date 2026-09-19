// Centralized pricing so cart, checkout, and the WhatsApp message all agree
// on the same numbers — delivery fee and free-delivery threshold come from
// Theme Editor store settings, not hardcoded per page.
export function calculateTotals(subtotal, deliveryFee, freeDeliveryThreshold) {
  const qualifiesForFreeDelivery = subtotal >= freeDeliveryThreshold
  const delivery = qualifiesForFreeDelivery ? 0 : deliveryFee
  const total = subtotal + delivery
  const amountToFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal)
  return { delivery, total, qualifiesForFreeDelivery, amountToFreeDelivery }
}
