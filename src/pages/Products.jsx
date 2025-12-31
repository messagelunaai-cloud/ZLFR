import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { products } from '@/data/products'
import ProductCard from '@/components/store/ProductCard'

export default function Products() {
  const [params, setParams] = useSearchParams()
  const collection = params.get('collection') || 'all'
  const sort = params.get('sort') || 'featured'
  const search = params.get('search') || ''

  const filtered = products.filter(p => {
    const matchesCollection = collection === 'all' ? true : p.collection === collection
    const matchesSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.desc.toLowerCase().includes(search.toLowerCase())
    return matchesCollection && matchesSearch
  })

  const sorted = [...filtered].sort((a,b) => {
    if (sort === 'price-asc') return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return 0
  })

  // Group zulfiqar products into tiers
  const zulfiqarTiers = collection === 'zulfiqar' ? {
    'Essential': sorted.filter(p => p.price < 300),
    'Signature': sorted.filter(p => p.price >= 300 && p.price < 500),
    'Heritage': sorted.filter(p => p.price >= 500)
  } : null

  const set = (k,v) => {
    const next = new URLSearchParams(params)
    if (!v || v === 'all') next.delete(k)
    else next.set(k,v)
    setParams(next, { replace: true })
  }

  return (
    <section className="py-14">
      <div className="container-page">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-3xl font-light">Products</h2>
            <div className="mt-2 text-xs text-white/60">{sorted.length} items</div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e)=>set('search', e.target.value)}
              className="bg-black/40 border border-white/10 px-3 py-2 outline-none min-w-[200px]"
            />

            <select
              value={collection}
              onChange={(e)=>set('collection', e.target.value)}
              className="bg-black/40 border border-white/10 px-3 py-2 outline-none"
            >
              <option value="all">All Collections</option>
              <option value="zulfiqar">Zulfiqar</option>
              <option value="calligraphy">Calligraphy</option>
              <option value="legacy">Legacy</option>
            </select>

            <select
              value={sort}
              onChange={(e)=>set('sort', e.target.value)}
              className="bg-black/40 border border-white/10 px-3 py-2 outline-none"
            >
              <option value="featured">Sort</option>
              <option value="price-asc">Price: Low</option>
              <option value="price-desc">Price: High</option>
            </select>
          </div>
        </div>

        {collection === 'zulfiqar' && zulfiqarTiers ? (
          <div className="space-y-12">
            {Object.entries(zulfiqarTiers).map(([tier, products]) => products.length > 0 && (
              <div key={tier}>
                <h3 className="text-xl font-light mb-6">{tier}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {products.map(p => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {sorted.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
