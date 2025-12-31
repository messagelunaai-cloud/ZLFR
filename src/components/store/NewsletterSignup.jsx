import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle } from 'lucide-react';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call - replace with actual newsletter service (Mailchimp, Klaviyo, etc.)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-white/5 rounded-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-xl font-light mb-2">Join Our Community</h3>
        <p className="text-sm text-white/60">
          Subscribe for exclusive offers and updates
        </p>
      </div>

      {status === 'success' ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center gap-2 py-4 text-zlfr-gold"
        >
          <CheckCircle className="w-5 h-5" />
          <span>Thank you for subscribing!</span>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-zlfr-gold transition-colors"
              required
            />
          </div>
          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="px-6 py-3 bg-zlfr-gold text-zlfr-ink rounded-lg font-medium hover:bg-zlfr-gold/90 transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </motion.button>
        </form>
      )}

      <p className="text-xs text-white/40 text-center mt-3">
        We respect your privacy. Unsubscribe anytime.
      </p>
    </div>
  );
};

export default NewsletterSignup;
