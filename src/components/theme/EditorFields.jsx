import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function Section({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3.5 text-left"
      >
        <span className="font-display text-sm font-semibold text-navy">{title}</span>
        <ChevronDown size={16} className={`text-ink-muted transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="space-y-4 px-4 pb-5">{children}</div>}
    </div>
  )
}

export function Field({ label, children, hint }) {
  return (
    <div>
      <label className="block text-xs font-medium text-ink-muted">{label}</label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-[11px] text-ink-muted/70">{hint}</p>}
    </div>
  )
}

export function ColorField({ label, value, onChange }) {
  return (
    <Field label={label}>
      <div className="flex items-center gap-2">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-9 w-9 cursor-pointer border border-line p-0.5"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full border border-line px-2.5 py-1.5 text-xs uppercase focus:border-navy focus:outline-none"
        />
      </div>
    </Field>
  )
}

export function TextField({ label, value, onChange, placeholder, hint }) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-line px-3 py-2 text-sm focus:border-navy focus:outline-none"
      />
    </Field>
  )
}

export function TextAreaField({ label, value, onChange, placeholder }) {
  return (
    <Field label={label}>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full border border-line px-3 py-2 text-sm focus:border-navy focus:outline-none"
      />
    </Field>
  )
}

export function NumberField({ label, value, onChange, hint }) {
  return (
    <Field label={label} hint={hint}>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full border border-line px-3 py-2 text-sm focus:border-navy focus:outline-none"
      />
    </Field>
  )
}

export function SelectField({ label, value, onChange, options }) {
  return (
    <Field label={label}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-white px-3 py-2 text-sm focus:border-navy focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
    </Field>
  )
}

export function ToggleField({ label, checked, onChange, hint }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs font-medium text-ink-muted">{label}</p>
        {hint && <p className="text-[11px] text-ink-muted/70">{hint}</p>}
      </div>
      <button
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        className={`relative h-6 w-11 flex-shrink-0 rounded-full transition-colors ${checked ? 'bg-gold' : 'bg-line'}`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  )
}
