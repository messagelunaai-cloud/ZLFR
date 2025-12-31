import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const RelatedProducts = ({ currentProductId, collection, allProducts }) => {
  // Filter products by same collection, exclude current product, limit to 4
  const relatedProducts = allProducts
    .filter(product => 
      product.id !== currentProductId && 
      product.collection === collection
    )
    .slice(0, 4);

  // If not enough products in same collection, fill with other products
  if (relatedProducts.length < 4) {
    const additionalProducts = allProducts
      .filter(product => 
        product.id !== currentProductId && 
        !relatedProducts.find(p => p.id === product.id)
      )
      .slice(0, 4 - relatedProducts.length);
    
    relatedProducts.push(...additionalProducts);
  }

  if (relatedProducts.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-4">You Might Also Like</h2>
          <p className="text-white/60">Discover more from our collection</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default RelatedProducts;
