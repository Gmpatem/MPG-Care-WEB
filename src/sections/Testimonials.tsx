import { useState, useEffect, useCallback } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "MPG built our entire booking and payment system in six weeks. We went from manual scheduling to fully automated overnight. Revenue is up 40% because we're no longer losing clients to missed calls.",
    name: 'Marcus Chen',
    title: 'Owner, Apex Wellness Studio',
    avatar: '/avatar-1.jpg',
  },
  {
    quote: "What impressed me most was the business thinking behind the technology. They didn't just build what we asked for — they redesigned our workflow so the system actually saves us time.",
    name: 'Sarah Williams',
    title: 'Operations Director, Meridian Logistics',
    avatar: '/avatar-2.jpg',
  },
  {
    quote: "We've worked with developers before. MPG is different. They understand that code is a means to an end, and that end is a business result. Our dashboard alone saves us 15 hours a week.",
    name: 'David Park',
    title: 'CTO, Nova Fintech',
    avatar: '/avatar-3.jpg',
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [next]);

  const current = testimonials[active];

  return (
    <section
      id="testimonials"
      className="w-full bg-navy py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="bg-navy-light border border-white/[0.08] rounded-[20px] p-8 md:p-12 relative overflow-hidden">
            {/* Quote mark */}
            <Quote className="absolute top-6 left-6 w-16 h-16 md:w-24 md:h-24 text-orange opacity-[0.15]" />

            {/* Quote text */}
            <div className="relative z-10 min-h-[120px] md:min-h-[140px] flex items-center">
              <p className="font-sans font-normal text-[18px] md:text-[22px] text-cream italic leading-[1.6]">
                "{current.quote}"
              </p>
            </div>

            {/* Author */}
            <div className="relative z-10 flex items-center gap-4 mt-8">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-orange/30 to-teal/30">
                <img src={current.avatar} alt={current.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="font-sans font-semibold text-[16px] text-cream block">{current.name}</span>
                <span className="font-sans font-normal text-[14px] text-slate">{current.title}</span>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-3 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                  i === active ? 'bg-orange' : 'bg-slate-muted hover:bg-slate'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
