import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/product/ProductCard'

// "Sneakers" is future-ready: as soon as products with category "Sneakers"
// exist in src/data/products.js, it will appear here automatically with
// zero code changes — this list is just for showing it even before then.
const allFilterCategories = ['Casuals', 'Sandals', 'Sneakers']

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') || 'All'
  const [query, setQuery] = useState('')

  const setCategory = (cat) => {
    if (cat === 'All') {
      searchParams.delete('category')
    } else {
      searchParams.set('category', cat)
    }
    setSearchParams(searchParams)
  }

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesQuery = product.name.toLowerCase().includes(query.trim().toLowerCase())
      return matchesCategory && matchesQuery
    })
  }, [activeCategory, query])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="border-b border-line pb-8">
        <h1 className="font-display text-3xl text-navy sm:text-4xl">Shop All Shoes</h1>
        <p className="mt-2 text-ink-muted">
          Comfortable, well-made footwear for men and women — delivered across Pakistan.
        </p>
      </div>

      {/* Search + category filter */}
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full border border-line bg-white py-2.5 pl-10 pr-9 text-sm text-ink placeholder:text-ink-muted focus:border-navy focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-navy"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {['All', ...allFilterCategories].map((cat) => {
            const isActive = activeCategory === cat
            const hasProducts = cat === 'All' || categories.includes(cat)
            return (
              <button
                key={cat}
                onClick={() => hasProducts && setCategory(cat)}
                disabled={!hasProducts}
                title={hasProducts ? undefined : 'Coming soon'}
                className={`border px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-navy bg-navy text-cream'
                    : hasProducts
                    ? 'border-line bg-white text-ink-muted hover:border-navy hover:text-navy'
                    : 'cursor-not-allowed border-line bg-white text-ink-muted/40'
                }`}
              >
                {cat}
                {!hasProducts && <span className="ml-1 text-[10px]">(soon)</span>}
              </button>
            )
          })}
        </div>
      </div>

      {/* Results */}
      <div className="mt-4 text-sm text-ink-muted">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </div>

      {filteredProducts.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 border border-dashed border-line py-16 text-center">
          <p className="font-display text-lg text-navy">No products match your search</p>
          <p className="mt-2 text-sm text-ink-muted">Try a different keyword or category.</p>
        </div>
      )}
    </div>
  )
}
