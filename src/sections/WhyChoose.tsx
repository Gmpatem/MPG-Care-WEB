import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    title: 'Business-First Thinking',
    desc: 'Every line of code serves a business outcome.',
  },
  {
    title: 'Clean Architecture',
    desc: 'Systems that are easy to maintain, extend, and debug.',
  },
  {
    title: 'Automation Expertise',
    desc: "We don't just build — we automate what you already do.",
  },
  {
    title: 'Scalable Infrastructure',
    desc: 'From 10 users to 10,000 without rebuilding.',
  },
  {
    title: 'Long-Term Partnership',
    desc: 'We support what we build. No handoffs to junior teams.',
  },
];

export function WhyChoose() {
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const items = itemsRef.current;
    if (!section || !items) return;

    const itemElements = items.querySelectorAll('.value-item');
    const ctx = gsap.context(() => {
      gsap.from(itemElements, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose"
      className="w-full bg-navy-light py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12">
          {/* Left content */}
          <div className="lg:w-[55%]">
            <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-teal mb-4 block">
              Why MPG
            </span>
            <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream leading-[1.15] tracking-[-0.03em] mb-12">
              Built by Engineers,
              <br />
              Not Just Developers
            </h2>

            <div ref={itemsRef} className="flex flex-col gap-6">
              {values.map((item) => (
                <div key={item.title} className="value-item flex items-start gap-4">
                  <div className="w-5 h-5 rounded-full bg-teal/20 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-teal" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="font-sans font-semibold text-[18px] text-cream mb-1">{item.title}</h3>
                    <p className="font-sans font-normal text-[15px] text-slate">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right visual - abstract system diagram */}
          <div className="lg:w-[45%] flex items-center justify-center">
            <div className="relative w-[320px] h-[320px] md:w-[400px] md:h-[400px]">
              {/* Concentric rings */}
              <div className="absolute inset-0 rounded-full border border-white/[0.06] animate-pulse-slow" />
              <div className="absolute inset-[15%] rounded-full border border-white/[0.08] animate-pulse-slow" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-[30%] rounded-full border border-white/[0.1] animate-pulse-slow" style={{ animationDelay: '2s' }} />

              {/* Center node */}
              <div className="absolute inset-[42%] rounded-full bg-gradient-to-br from-orange/30 to-orange/10 border border-orange/30 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-orange animate-pulse" />
              </div>

              {/* Orbiting nodes */}
              {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                <div
                  key={i}
                  className="absolute w-3 h-3 rounded-full bg-teal/60"
                  style={{
                    top: `${50 + 35 * Math.sin((deg * Math.PI) / 180)}%`,
                    left: `${50 + 35 * Math.cos((deg * Math.PI) / 180)}%`,
                    transform: 'translate(-50%, -50%)',
                    animation: `float ${4 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}

              {/* Connecting lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <line x1="50%" y1="50%" x2="85%" y2="50%" stroke="#00D4AA" strokeWidth="1" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="50%" y1="50%" x2="50%" y2="85%" stroke="#00D4AA" strokeWidth="1" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="50%" y1="50%" x2="15%" y2="50%" stroke="#00D4AA" strokeWidth="1" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="50%" y1="50%" x2="50%" y2="15%" stroke="#00D4AA" strokeWidth="1" strokeDasharray="4 4">
                  <animate attributeName="stroke-dashoffset" from="0" to="8" dur="2s" repeatCount="indefinite" />
                </line>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
