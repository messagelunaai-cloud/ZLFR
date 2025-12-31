import { motion } from 'framer-motion';
import { Sparkles, Heart, Shield, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-zlfr-ink text-white">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-6xl font-light mb-6">
            The <span className="text-zlfr-gold">ZLFR</span> Story
          </h1>
          <p className="text-xl text-white/70 leading-relaxed">
            A journey of faith, craftsmanship, and timeless beauty
          </p>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-light mb-6">Our Beginning</h2>
              <div className="space-y-4 text-white/70 leading-relaxed">
                <p>
                  ZLFR was born from a deep reverence for Islamic heritage and the legendary sword of Imam Ali (AS). Each piece in our collection carries the weight of history and the lightness of modern elegance.
                </p>
                <p>
                  Founded on principles of authenticity and excellence, we sought to create jewelry that doesn't just adorn, but tells a story. Every ring, every pendant, every piece is a conversation between past and present.
                </p>
                <p>
                  Our name itself—an abbreviation resonating with "Zulfiqar"—embodies the strength and grace we infuse into every creation.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-square bg-white/5 rounded-lg overflow-hidden"
            >
              <img
                src="https://i.imgur.com/TfyFBp7.jpg"
                alt="ZLFR Craftsmanship"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-6 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-center mb-12"
          >
            What We Stand For
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Sparkles,
                title: 'Authenticity',
                description: 'Every piece reflects genuine craftsmanship and cultural heritage'
              },
              {
                icon: Heart,
                title: 'Passion',
                description: 'Driven by love for artistry and meaningful design'
              },
              {
                icon: Shield,
                title: 'Quality',
                description: 'Premium materials and meticulous attention to detail'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building connections through shared values and stories'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-zlfr-ink rounded-lg text-center"
              >
                <div className="w-16 h-16 bg-zlfr-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-zlfr-gold" />
                </div>
                <h3 className="text-xl font-medium mb-2">{value.title}</h3>
                <p className="text-sm text-white/60">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Craftsmanship Process */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-light text-center mb-12"
          >
            Our Craftsmanship
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Design',
                description: 'Each piece begins with careful research into Islamic art and symbolism, sketched and refined to perfection.'
              },
              {
                step: '02',
                title: 'Creation',
                description: 'Master artisans handcraft every detail using premium materials and time-honored techniques.'
              },
              {
                step: '03',
                title: 'Finishing',
                description: 'Rigorous quality checks ensure each piece meets our exacting standards before reaching you.'
              }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="text-6xl font-light text-zlfr-gold/20 mb-4">
                  {process.step}
                </div>
                <h3 className="text-xl font-medium mb-3">{process.title}</h3>
                <p className="text-white/60 leading-relaxed">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Legacy Section */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              The Legacy of Imam Ali (AS)
            </h2>
            <p className="text-white/70 leading-relaxed mb-4">
              Zulfiqar, the legendary double-pointed sword, symbolizes justice, courage, and unwavering faith. 
              Bestowed upon Imam Ali (AS) during the Battle of Uhud, it represents the triumph of righteousness over tyranny.
            </p>
            <p className="text-white/70 leading-relaxed">
              At ZLFR, we honor this legacy by crafting jewelry that embodies these timeless virtues, 
              allowing you to carry a piece of this powerful heritage with grace and dignity.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Become Part of Our Story
          </h2>
          <p className="text-white/70 mb-8">
            Explore our collection and find the piece that speaks to your soul.
          </p>
          <a
            href="/products"
            className="inline-block px-8 py-4 bg-zlfr-gold text-zlfr-ink rounded-lg font-medium hover:bg-zlfr-gold/90 transition-colors"
          >
            Explore Collection
          </a>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
