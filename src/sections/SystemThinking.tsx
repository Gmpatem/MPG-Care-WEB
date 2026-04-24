import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { id: 'analyze', title: 'Analyze', desc: 'We map your current workflow, identify bottlenecks, and document every manual touchpoint.' },
  { id: 'design', title: 'Design', desc: 'We architect the system structure, data flow, and user experience before writing any code.' },
  { id: 'build', title: 'Build', desc: 'We develop with clean, modular code that is testable, documented, and built to last.' },
  { id: 'automate', title: 'Automate', desc: 'We wire up triggers, integrations, and workflows so the system runs itself.' },
  { id: 'scale', title: 'Scale', desc: 'We monitor, optimize, and extend the system as your business grows.' },
];

export function SystemThinking() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const stepsContainer = stepsRef.current;
    if (!section || !path || !stepsContainer) return;

    const stepElements = stepsContainer.querySelectorAll('.step-item');
    const detailCards = stepsContainer.querySelectorAll('.detail-card');

    const ctx = gsap.context(() => {
      // Animate the progress line
      const pathLength = path.getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 40%',
          end: 'bottom 60%',
          scrub: 1,
        },
      });

      // Animate steps sequentially
      stepElements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0.3, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            scrollTrigger: {
              trigger: section,
              start: `top+=${i * 15}% 40%`,
              end: `top+=${(i + 1) * 15}% 40%`,
              scrub: true,
            },
          }
        );
      });

      // Animate detail cards
      gsap.from(detailCards, {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none none',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="methodology"
      className="w-full bg-navy py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
            Our Methodology
          </span>
          <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em]">
            Engineered for Scale
          </h2>
        </div>

        {/* Desktop flow diagram */}
        <div ref={stepsRef} className="hidden md:block relative">
          {/* SVG connecting line */}
          <svg
            className="absolute top-[24px] left-0 w-full h-2 pointer-events-none"
            preserveAspectRatio="none"
          >
            <path
              ref={pathRef}
              d="M0,4 L100%,4"
              stroke="#FF6B35"
              strokeWidth="2"
              fill="none"
              className="w-full"
            />
          </svg>

          {/* Steps row */}
          <div className="flex justify-between relative z-10">
            {steps.map((step, i) => (
              <div key={step.id} className="flex flex-col items-center w-[18%]">
                <div className="step-item w-12 h-12 rounded-full border-2 border-slate-muted flex items-center justify-center bg-navy mb-4 relative z-10">
                  <span className="font-sans font-bold text-[14px] text-cream">{i + 1}</span>
                </div>
                <span className="font-sans font-medium text-[14px] text-slate mb-3 uppercase tracking-wider">
                  {step.title}
                </span>
                <div className="detail-card bg-navy-light border border-white/[0.08] rounded-xl p-6 text-center">
                  <p className="font-sans font-normal text-[14px] text-slate leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical stack */}
        <div className="md:hidden flex flex-col gap-6">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 border-orange flex items-center justify-center bg-navy shrink-0">
                <span className="font-sans font-bold text-[12px] text-cream">{i + 1}</span>
              </div>
              <div className="bg-navy-light border border-white/[0.08] rounded-xl p-5 flex-1">
                <span className="font-sans font-semibold text-[16px] text-cream block mb-1">{step.title}</span>
                <p className="font-sans font-normal text-[14px] text-slate leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
