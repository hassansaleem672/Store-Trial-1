// Default theme settings — this is the fallback the store always has if
// nothing is saved yet, or if a saved setting is missing/invalid.
export const defaultTheme = {
  brand: {
    storeName: 'H&R',
    tagline: 'Premium Footwear',
  },
  colors: {
    primary: '#1B2A38', // navy
    accent: '#B0803F', // gold
    background: '#FAF8F5', // cream
    surface: '#FFFFFF',
    text: '#23303D',
    muted: '#5B6672',
  },
  typography: {
    headingFont: 'Playfair Display',
    bodyFont: 'Inter',
  },
  buttons: {
    shape: 'square', // square | slightly-rounded | rounded | pill
    style: 'solid', // solid | outline
    size: 'normal', // compact | normal | large
  },
  header: {
    announcementEnabled: true,
    announcementText: 'FREE DELIVERY ON ORDERS ABOVE PKR 3,000',
    announcementBg: '#1B2A38',
    announcementText_color: '#FAF8F5',
    sticky: true,
    showSearch: true,
  },
  homeSections: {
    hero: true,
    categories: true,
    newArrivals: true,
    trustBadges: true,
    whatsappBanner: true,
  },
  hero: {
    heading: 'Step into something built to last.',
    subtitle:
      'H&R brings you comfortable, well-made shoes for men and women — delivered across Pakistan with Cash on Delivery.',
    primaryText: 'Shop Now',
    primaryLink: '/shop',
    secondaryText: 'Our Story',
    secondaryLink: '/about',
  },
  store: {
    whatsappNumber: '923033348598',
    whatsappDisplay: '0303 3348598',
    email: 'mhsofficial672@gmail.com',
    address: 'Coming soon',
    currency: 'PKR',
    deliveryFee: 200,
    freeDeliveryThreshold: 3000,
  },
  trustBadges: [
    { id: 'tb-1', icon: 'Banknote', title: 'Cash on Delivery', text: 'Pay when your order arrives' },
    { id: 'tb-2', icon: 'Truck', title: 'Nationwide Delivery', text: 'Shipped anywhere in Pakistan' },
    { id: 'tb-3', icon: 'MessageCircle', title: 'Order on WhatsApp', text: 'Real replies from a real person' },
  ],
}

export const presets = {
  'H&R Classic': {
    colors: { primary: '#1B2A38', accent: '#B0803F', background: '#FAF8F5', surface: '#FFFFFF', text: '#23303D', muted: '#5B6672' },
    typography: { headingFont: 'Playfair Display', bodyFont: 'Inter' },
  },
  'H&R Minimal': {
    colors: { primary: '#111111', accent: '#4B4B4B', background: '#FFFFFF', surface: '#F5F5F5', text: '#1A1A1A', muted: '#6B7280' },
    typography: { headingFont: 'Inter', bodyFont: 'Inter' },
  },
  'H&R Luxury': {
    colors: { primary: '#0F1B24', accent: '#C9A24B', background: '#FBF9F4', surface: '#FFFFFF', text: '#1E2A33', muted: '#6B7688' },
    typography: { headingFont: 'Playfair Display', bodyFont: 'Inter' },
  },
  'H&R Modern': {
    colors: { primary: '#2B2B2B', accent: '#B0803F', background: '#FAFAFA', surface: '#FFFFFF', text: '#222222', muted: '#666666' },
    typography: { headingFont: 'Playfair Display', bodyFont: 'Inter' },
  },
}

export const HEADING_FONT_OPTIONS = ['Playfair Display', 'Inter', 'Georgia', 'Arial']
export const BODY_FONT_OPTIONS = ['Inter', 'Arial', 'Helvetica', 'Georgia']
export const ICON_OPTIONS = ['Truck', 'Package', 'ShieldCheck', 'RotateCcw', 'MessageCircle', 'Banknote', 'CheckCircle', 'Heart', 'Star', 'Lock', 'Headphones']
