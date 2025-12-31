import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Reviews = ({ productId }) => {
  // Placeholder reviews - replace with real data from Shopify reviews app
  const reviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      date: '2 weeks ago',
      comment: 'Absolutely stunning piece! The craftsmanship is incredible and it arrived beautifully packaged.',
      verified: true
    },
    {
      id: 2,
      author: 'Ahmed K.',
      rating: 5,
      date: '1 month ago',
      comment: 'The quality exceeded my expectations. Perfect gift for my wife.',
      verified: true
    },
    {
      id: 3,
      author: 'Layla H.',
      rating: 4,
      date: '2 months ago',
      comment: 'Beautiful design and great quality. Shipping was fast too!',
      verified: true
    }
  ];

  const averageRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  return (
    <section className="py-12">
      {/* Rating Summary */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-8 pb-8 border-b border-white/10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span className="text-4xl font-light">{averageRating.toFixed(1)}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.round(averageRating)
                      ? 'fill-zlfr-gold text-zlfr-gold'
                      : 'text-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-white/60">Based on {reviews.length} reviews</p>
        </div>
        <button className="px-6 py-3 bg-zlfr-gold text-zlfr-ink rounded-lg font-medium hover:bg-zlfr-gold/90 transition-colors">
          Write a Review
        </button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-white/5 rounded-lg"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{review.author}</span>
                  {review.verified && (
                    <span className="text-xs px-2 py-0.5 bg-zlfr-gold/20 text-zlfr-gold rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'fill-zlfr-gold text-zlfr-gold'
                            : 'text-white/20'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-white/50">{review.date}</span>
                </div>
              </div>
              <Quote className="w-6 h-6 text-zlfr-gold/30" />
            </div>
            <p className="text-white/70 leading-relaxed">{review.comment}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="text-sm text-white/60 hover:text-white transition-colors">
          Load More Reviews
        </button>
      </div>
    </section>
  );
};

export default Reviews;
