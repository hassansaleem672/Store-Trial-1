import { useState } from 'react'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { ICON_OPTIONS } from '../../theme/defaultTheme'

let nextId = 100

export default function TrustBadgeEditor({ badges, onChange }) {
  const update = (id, values) => {
    onChange(badges.map((b) => (b.id === id ? { ...b, ...values } : b)))
  }

  const remove = (id) => onChange(badges.filter((b) => b.id !== id))

  const move = (index, direction) => {
    const next = [...badges]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  const add = () => {
    onChange([...badges, { id: `tb-new-${nextId++}`, icon: 'CheckCircle', title: 'New Badge', text: 'Describe it here' }])
  }

  return (
    <div className="space-y-3">
      {badges.map((badge, i) => (
        <div key={badge.id} className="border border-line p-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-navy">Badge {i + 1}</span>
            <div className="flex items-center gap-1">
              <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-ink-muted hover:text-navy disabled:opacity-30" aria-label="Move up">
                <ArrowUp size={14} />
              </button>
              <button onClick={() => move(i, 1)} disabled={i === badges.length - 1} className="p-1 text-ink-muted hover:text-navy disabled:opacity-30" aria-label="Move down">
                <ArrowDown size={14} />
              </button>
              <button onClick={() => remove(badge.id)} className="p-1 text-ink-muted hover:text-red-600" aria-label="Delete badge">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
          <div className="mt-2 space-y-2">
            <select
              value={badge.icon}
              onChange={(e) => update(badge.id, { icon: e.target.value })}
              className="w-full border border-line bg-white px-2 py-1.5 text-xs"
            >
              {ICON_OPTIONS.map((icon) => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
            <input
              value={badge.title}
              onChange={(e) => update(badge.id, { title: e.target.value })}
              placeholder="Title"
              className="w-full border border-line px-2 py-1.5 text-xs"
            />
            <input
              value={badge.text}
              onChange={(e) => update(badge.id, { text: e.target.value })}
              placeholder="Description"
              className="w-full border border-line px-2 py-1.5 text-xs"
            />
          </div>
        </div>
      ))}
      <button
        onClick={add}
        className="flex w-full items-center justify-center gap-1.5 border border-dashed border-line py-2 text-xs font-medium text-ink-muted hover:border-navy hover:text-navy"
      >
        <Plus size={14} /> Add Trust Badge
      </button>
    </div>
  )
}
