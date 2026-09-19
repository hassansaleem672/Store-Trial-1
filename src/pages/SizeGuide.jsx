const sizeChart = [
  { eu: 39, uk: 5, foot: '24.5 cm' },
  { eu: 40, uk: 6, foot: '25.0 cm' },
  { eu: 41, uk: 7, foot: '25.5 cm' },
  { eu: 42, uk: 8, foot: '26.5 cm' },
  { eu: 43, uk: 9, foot: '27.5 cm' },
  { eu: 44, uk: 10, foot: '28.0 cm' },
  { eu: 45, uk: 11, foot: '28.5 cm' },
]

export default function SizeGuide() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <h1 className="font-display text-3xl text-navy sm:text-4xl">Size Guide</h1>
      <p className="mt-4 text-ink-muted">
        Not sure which size to pick? Measure your foot length from heel to toe and match it to
        the chart below. If you're between sizes, we generally recommend sizing up.
      </p>

      <div className="mt-8 overflow-hidden border border-line">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy text-cream">
            <tr>
              <th className="px-4 py-3 font-medium">EU Size</th>
              <th className="px-4 py-3 font-medium">UK Size</th>
              <th className="px-4 py-3 font-medium">Foot Length</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-line bg-white">
            {sizeChart.map((row) => (
              <tr key={row.eu}>
                <td className="px-4 py-3 text-navy">{row.eu}</td>
                <td className="px-4 py-3 text-ink-muted">{row.uk}</td>
                <td className="px-4 py-3 text-ink-muted">{row.foot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-6 text-sm text-ink-muted">
        Still unsure? Message us your foot measurement on WhatsApp and we'll help you pick the right size.
      </p>
    </div>
  )
}
