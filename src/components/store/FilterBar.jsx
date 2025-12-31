import { useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';

const FilterBar = ({ onFilterChange, products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCollection, setSelectedCollection] = useState('all');

  const collections = ['all', ...new Set(products.map(p => p.collection).filter(Boolean))].filter(c => c !== 'zulfiqar');
  const maxPrice = Math.max(...products.map(p => p.price));

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      sortBy,
      collection: selectedCollection
    });
    setIsOpen(false);
  };

  const resetFilters = () => {
    setPriceRange([0, maxPrice]);
    setSortBy('featured');
    setSelectedCollection('all');
    onFilterChange({
      priceRange: [0, maxPrice],
      sortBy: 'featured',
      collection: 'all'
    });
  };

  return (
    <div className="relative">
      {/* Filter Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <SlidersHorizontal className="w-5 h-5" />
        <span>Filter & Sort</span>
      </motion.button>

      {/* Filter Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Filter Content */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 mt-2 w-80 bg-zlfr-ink border border-white/10 rounded-lg p-6 shadow-2xl z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Filters</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/5 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort By */}
            <div className="mb-6">
              <label className="block text-sm text-white/70 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-zlfr-gold text-white appearance-none cursor-pointer"
                style={{
                  colorScheme: 'dark',
                  backgroundColor: '#0b0b0d',
                  color: '#c8a04a'
                }}
              >
                <option value="featured" style={{backgroundColor: '#0b0b0d', color: '#c8a04a'}}>Featured</option>
                <option value="price-low" style={{backgroundColor: '#0b0b0d', color: '#c8a04a'}}>Price: Low to High</option>
                <option value="price-high" style={{backgroundColor: '#0b0b0d', color: '#c8a04a'}}>Price: High to Low</option>
                <option value="name" style={{backgroundColor: '#0b0b0d', color: '#c8a04a'}}>Name: A to Z</option>
              </select>
            </div>

            {/* Collection Filter */}
            <div className="mb-6">
              <label className="block text-sm text-white/70 mb-2">Collection</label>
              <div className="space-y-2">
                {collections.map((collection) => (
                  <button
                    key={collection}
                    onClick={() => setSelectedCollection(collection)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCollection === collection
                        ? 'bg-zlfr-gold text-zlfr-ink font-medium'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    {collection.charAt(0).toUpperCase() + collection.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm text-white/70 mb-2">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zlfr-gold"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-zlfr-gold"
                  placeholder="Max"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={resetFilters}
                className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
              >
                Reset
              </button>
              <button
                onClick={applyFilters}
                className="flex-1 px-4 py-2 bg-zlfr-gold text-zlfr-ink hover:bg-zlfr-gold/90 rounded-lg transition-colors font-medium"
              >
                Apply
              </button>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default FilterBar;
