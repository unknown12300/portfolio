import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareQuote } from 'lucide-react';

interface TestimonialItem {
  id: string;
  author: string;
  avatar: string;
  feedback: string;
}

const TESTIMONIAL_DATA: TestimonialItem[] = [
  {
    id: "toufik",
    author: "Toufik",
    avatar: "https://raw.githubusercontent.com/yashu1wwww/yashu1wwww.github.io/main/images/toufik.jpg",
    feedback: "Great work on the project! I was impressed with the attention to detail and the level of creativity.",
  },
  {
    id: "nikhil",
    author: "Nikhil",
    avatar: "https://raw.githubusercontent.com/yashu1wwww/yashu1wwww.github.io/main/images/nikhil.png",
    feedback: "Your project was amazing! I loved the way you incorporated different elements to create a cohesive design.",
  },
  {
    id: "pavan",
    author: "Pavan",
    avatar: "https://raw.githubusercontent.com/yashu1wwww/yashu1wwww.github.io/main/images/pavan.jpg",
    feedback: "I was blown away by your project; the level of creativity was fantastic! I really liked it.",
  },
  {
    id: "manoj",
    author: "Manoj",
    avatar: "https://raw.githubusercontent.com/yashu1wwww/yashu1wwww.github.io/main/images/manoj.png",
    feedback: "I liked his bot development skills on social media, the way he implements new projects and tries out projects.",
  },
];

export const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Responsive items per page detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else {
        setItemsPerPage(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(TESTIMONIAL_DATA.length / itemsPerPage);

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % totalPages);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPaused, totalPages]);

  // Compute currently displayed items
  const getCurrentItems = () => {
    const startIndex = activeIndex * itemsPerPage;
    return TESTIMONIAL_DATA.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section id="testimonials" className="py-24 relative bg-[#050505] overflow-hidden border-t border-white/10">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-[450px] h-[450px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-orange-400 text-xs font-mono uppercase tracking-[0.2em] font-bold">
            <MessageSquareQuote className="w-3.5 h-3.5 text-orange-500" />
            <span>TESTIMONIALS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-heading tracking-tighter uppercase">
            COLLEAGUE <span className="text-orange-500">THOUGHTS</span>
          </h2>
          <p className="text-white/60 text-xs sm:text-sm font-light">
            Feedback from colleagues and collaborators.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative max-w-5xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeIndex}-${itemsPerPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className={`grid gap-6 sm:gap-8 ${
                  itemsPerPage === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
                }`}
              >
                {getCurrentItems().map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -8 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="relative bg-white/[0.04] backdrop-blur-xl rounded-[24px] p-7 sm:p-8 border border-white/[0.08] hover:border-orange-500/40 hover:shadow-[0_15px_35px_rgba(249,115,22,0.12)] transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                  >
                    {/* Glass Reflection Accent */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                    <div className="space-y-6 relative z-10">
                      {/* Profile Image & Name Row */}
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full p-[2px] bg-gradient-to-tr from-orange-500 via-amber-400 to-orange-600 shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:scale-105 transition-transform duration-300 shrink-0">
                          <img
                            src={item.avatar}
                            alt={item.author}
                            referrerPolicy="no-referrer"
                            className="w-full h-full rounded-full object-cover object-center bg-neutral-900"
                          />
                        </div>

                        <div>
                          <h3 className="text-lg font-semibold text-white tracking-wide font-heading">
                            {item.author}
                          </h3>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <p className="text-[16px] text-gray-300 font-light leading-[1.8] italic">
                        "{item.feedback}"
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Elegant Navigation Dots Only */}
          <div className="flex items-center justify-center gap-2.5 pt-10">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-8 bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.6)]'
                    : 'w-2.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
