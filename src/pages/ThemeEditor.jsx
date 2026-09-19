import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Monitor, Smartphone, Tablet, Check, RotateCcw, Download, Upload } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { presets, HEADING_FONT_OPTIONS, BODY_FONT_OPTIONS } from '../theme/defaultTheme'
import { Section, ColorField, TextField, TextAreaField, NumberField, SelectField, ToggleField } from '../components/theme/EditorFields'
import TrustBadgeEditor from '../components/theme/TrustBadgeEditor'
import Button from '../components/ui/Button'
import ProductCard from '../components/product/ProductCard'
import TrustBadges from '../components/theme/TrustBadges'
import { products } from '../data/products'

const previewWidths = { desktop: '100%', tablet: '768px', mobile: '390px' }

export default function ThemeEditor() {
  const { theme, updateSection, setTrustBadges, saveTheme, resetTheme, applyPreset, exportTheme, importTheme, savedAt } = useTheme()
  const [device, setDevice] = useState('desktop')
  const [importError, setImportError] = useState(null)
  const fileInputRef = useRef(null)

  const handleImportClick = () => fileInputRef.current?.click()

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImportError(null)
    importTheme(file, setImportError)
    e.target.value = ''
  }

  const handleReset = () => {
    if (window.confirm('Reset all theme settings to H&R defaults? This cannot be undone.')) {
      resetTheme()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-cream">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="font-display text-lg text-navy">H&R</Link>
          <span className="text-sm text-ink-muted">Theme Editor</span>
        </div>

        <div className="flex items-center gap-1 rounded-full border border-line p-1">
          <button onClick={() => setDevice('desktop')} className={`rounded-full p-1.5 ${device === 'desktop' ? 'bg-navy text-cream' : 'text-ink-muted'}`} aria-label="Desktop preview">
            <Monitor size={16} />
          </button>
          <button onClick={() => setDevice('tablet')} className={`rounded-full p-1.5 ${device === 'tablet' ? 'bg-navy text-cream' : 'text-ink-muted'}`} aria-label="Tablet preview">
            <Tablet size={16} />
          </button>
          <button onClick={() => setDevice('mobile')} className={`rounded-full p-1.5 ${device === 'mobile' ? 'bg-navy text-cream' : 'text-ink-muted'}`} aria-label="Mobile preview">
            <Smartphone size={16} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <input ref={fileInputRef} type="file" accept="application/json" onChange={handleFileChange} className="hidden" />
          <button onClick={handleImportClick} className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-navy hover:text-navy">
            <Upload size={14} /> Import
          </button>
          <button onClick={exportTheme} className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-navy hover:text-navy">
            <Download size={14} /> Export
          </button>
          <button onClick={handleReset} className="flex items-center gap-1.5 border border-line px-3 py-1.5 text-xs font-medium text-ink-muted hover:border-red-500 hover:text-red-600">
            <RotateCcw size={14} /> Reset
          </button>
          <button onClick={saveTheme} className="flex items-center gap-1.5 bg-gold px-4 py-1.5 text-xs font-semibold text-white hover:bg-gold-light">
            <Check size={14} /> Save Changes
          </button>
        </div>
      </div>

      {importError && (
        <div className="bg-red-50 px-4 py-2 text-center text-xs text-red-600">{importError}</div>
      )}
      {savedAt && (
        <div className="bg-green-50 px-4 py-2 text-center text-xs text-green-700">
          Saved to this browser. Settings will persist here — export a backup if you use another device.
        </div>
      )}

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Controls sidebar */}
        <aside className="w-full flex-shrink-0 overflow-y-auto border-r border-line bg-white lg:w-96 lg:max-h-[calc(100vh-57px)]">
          <Section title="Brand" defaultOpen>
            <TextField label="Store Name" value={theme.brand.storeName} onChange={(v) => updateSection('brand', { storeName: v })} />
            <TextField label="Tagline" value={theme.brand.tagline} onChange={(v) => updateSection('brand', { tagline: v })} />
          </Section>

          <Section title="Theme Presets">
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(presets).map((name) => (
                <button
                  key={name}
                  onClick={() => applyPreset(name)}
                  className="border border-line px-3 py-2 text-xs font-medium text-navy hover:border-navy"
                >
                  {name}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-ink-muted/70">Applies a color + font combo. You can still adjust individual values after.</p>
          </Section>

          <Section title="Colors">
            <ColorField label="Primary" value={theme.colors.primary} onChange={(v) => updateSection('colors', { primary: v })} />
            <ColorField label="Accent" value={theme.colors.accent} onChange={(v) => updateSection('colors', { accent: v })} />
            <ColorField label="Background" value={theme.colors.background} onChange={(v) => updateSection('colors', { background: v })} />
            <ColorField label="Surface / Cards" value={theme.colors.surface} onChange={(v) => updateSection('colors', { surface: v })} />
            <ColorField label="Text" value={theme.colors.text} onChange={(v) => updateSection('colors', { text: v })} />
            <ColorField label="Muted Text" value={theme.colors.muted} onChange={(v) => updateSection('colors', { muted: v })} />
          </Section>

          <Section title="Typography">
            <SelectField label="Heading Font" value={theme.typography.headingFont} onChange={(v) => updateSection('typography', { headingFont: v })} options={HEADING_FONT_OPTIONS} />
            <SelectField label="Body Font" value={theme.typography.bodyFont} onChange={(v) => updateSection('typography', { bodyFont: v })} options={BODY_FONT_OPTIONS} />
          </Section>

          <Section title="Buttons">
            <SelectField
              label="Shape"
              value={theme.buttons.shape}
              onChange={(v) => updateSection('buttons', { shape: v })}
              options={[
                { value: 'square', label: 'Square' },
                { value: 'slightly-rounded', label: 'Slightly Rounded' },
                { value: 'rounded', label: 'Rounded' },
                { value: 'pill', label: 'Pill' },
              ]}
            />
            <SelectField
              label="Style"
              value={theme.buttons.style}
              onChange={(v) => updateSection('buttons', { style: v })}
              options={[{ value: 'solid', label: 'Solid' }, { value: 'outline', label: 'Outline' }]}
            />
            <SelectField
              label="Size"
              value={theme.buttons.size}
              onChange={(v) => updateSection('buttons', { size: v })}
              options={[{ value: 'compact', label: 'Compact' }, { value: 'normal', label: 'Normal' }, { value: 'large', label: 'Large' }]}
            />
          </Section>

          <Section title="Header">
            <ToggleField label="Announcement Bar" checked={theme.header.announcementEnabled} onChange={(v) => updateSection('header', { announcementEnabled: v })} />
            {theme.header.announcementEnabled && (
              <>
                <TextField label="Announcement Text" value={theme.header.announcementText} onChange={(v) => updateSection('header', { announcementText: v })} />
                <ColorField label="Announcement Background" value={theme.header.announcementBg} onChange={(v) => updateSection('header', { announcementBg: v })} />
                <ColorField label="Announcement Text Color" value={theme.header.announcementText_color} onChange={(v) => updateSection('header', { announcementText_color: v })} />
              </>
            )}
            <ToggleField label="Sticky Header" checked={theme.header.sticky} onChange={(v) => updateSection('header', { sticky: v })} />
            <ToggleField label="Show Search Icon" checked={theme.header.showSearch} onChange={(v) => updateSection('header', { showSearch: v })} />
          </Section>

          <Section title="Homepage Sections">
            <ToggleField label="Hero" checked={theme.homeSections.hero} onChange={(v) => updateSection('homeSections', { hero: v })} />
            <ToggleField label="Shop By Category" checked={theme.homeSections.categories} onChange={(v) => updateSection('homeSections', { categories: v })} />
            <ToggleField label="New Arrivals" checked={theme.homeSections.newArrivals} onChange={(v) => updateSection('homeSections', { newArrivals: v })} />
            <ToggleField label="Trust Badges" checked={theme.homeSections.trustBadges} onChange={(v) => updateSection('homeSections', { trustBadges: v })} />
            <ToggleField label="WhatsApp Support Banner" checked={theme.homeSections.whatsappBanner} onChange={(v) => updateSection('homeSections', { whatsappBanner: v })} />
          </Section>

          <Section title="Hero Content">
            <TextField label="Heading" value={theme.hero.heading} onChange={(v) => updateSection('hero', { heading: v })} />
            <TextAreaField label="Subtitle" value={theme.hero.subtitle} onChange={(v) => updateSection('hero', { subtitle: v })} />
            <TextField label="Primary Button Text" value={theme.hero.primaryText} onChange={(v) => updateSection('hero', { primaryText: v })} />
            <TextField label="Primary Button Link" value={theme.hero.primaryLink} onChange={(v) => updateSection('hero', { primaryLink: v })} />
            <TextField label="Secondary Button Text" value={theme.hero.secondaryText} onChange={(v) => updateSection('hero', { secondaryText: v })} />
            <TextField label="Secondary Button Link" value={theme.hero.secondaryLink} onChange={(v) => updateSection('hero', { secondaryLink: v })} />
          </Section>

          <Section title="Store Settings">
            <TextField label="WhatsApp Number (international)" value={theme.store.whatsappNumber} onChange={(v) => updateSection('store', { whatsappNumber: v })} hint="e.g. 923033348598 — no + or leading 0" />
            <TextField label="WhatsApp Display Text" value={theme.store.whatsappDisplay} onChange={(v) => updateSection('store', { whatsappDisplay: v })} />
            <TextField label="Support Email" value={theme.store.email} onChange={(v) => updateSection('store', { email: v })} />
            <TextField label="Store Address" value={theme.store.address} onChange={(v) => updateSection('store', { address: v })} />
            <NumberField label="Delivery Fee (PKR)" value={theme.store.deliveryFee} onChange={(v) => updateSection('store', { deliveryFee: v })} />
            <NumberField label="Free Delivery Threshold (PKR)" value={theme.store.freeDeliveryThreshold} onChange={(v) => updateSection('store', { freeDeliveryThreshold: v })} />
          </Section>

          <Section title="Trust Badges">
            <TrustBadgeEditor badges={theme.trustBadges} onChange={setTrustBadges} />
          </Section>

          <div className="border-t border-line px-4 py-4 text-[11px] leading-relaxed text-ink-muted">
            <strong className="text-navy">Note:</strong> theme settings are saved in this browser only (localStorage).
            They won't automatically appear on another device or browser — use Export to back them up or
            move them elsewhere, and Import to restore. The default theme in the code is always the
            fallback if nothing is saved.
          </div>
        </aside>

        {/* Live preview */}
        <main className="flex-1 overflow-y-auto bg-line/30 p-4 lg:p-8">
          <div
            className="mx-auto overflow-hidden border border-line bg-cream shadow-sm transition-all"
            style={{ maxWidth: previewWidths[device] }}
          >
            {/* Mini hero preview */}
            {theme.homeSections.hero && (
              <div className="bg-navy px-6 py-10 text-cream">
                <p className="text-xs tracking-wide text-gold-light">Handpicked footwear, made for daily life</p>
                <h1 className="mt-3 font-display text-2xl leading-tight">{theme.hero.heading}</h1>
                <p className="mt-3 max-w-md text-sm text-cream/75">{theme.hero.subtitle}</p>
                <div className="mt-5 flex gap-3">
                  <Button className="!text-xs">{theme.hero.primaryText}</Button>
                  <span className="border border-cream/30 px-5 py-2.5 text-xs font-semibold text-cream">{theme.hero.secondaryText}</span>
                </div>
              </div>
            )}

            {theme.homeSections.categories && (
              <div className="px-6 py-8">
                <h2 className="font-display text-lg text-navy">Shop by category</h2>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="border border-line bg-white px-4 py-5 text-sm font-display text-navy">Casuals</div>
                  <div className="border border-line bg-white px-4 py-5 text-sm font-display text-navy">Sandals</div>
                </div>
              </div>
            )}

            {theme.homeSections.newArrivals && (
              <div className="px-6 py-8">
                <h2 className="font-display text-lg text-navy">New arrivals</h2>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {products.slice(0, 2).map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            )}

            {theme.homeSections.trustBadges && <TrustBadges />}

            {theme.homeSections.whatsappBanner && (
              <div className="bg-gold px-6 py-6 text-center text-sm font-medium text-white">
                Chat with us on WhatsApp — {theme.store.whatsappDisplay}
              </div>
            )}
          </div>
          <p className="mx-auto mt-4 max-w-md text-center text-xs text-ink-muted">
            This preview updates instantly as you change settings on the left. Visit your actual site
            in another tab to see the full live storefront reflect these changes too.
          </p>
        </main>
      </div>
    </div>
  )
}
