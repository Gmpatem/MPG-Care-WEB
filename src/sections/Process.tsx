import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { num: '01', title: 'Discover', desc: 'We learn your business, goals, and what slows you down every day.' },
  { num: '02', title: 'Design', desc: 'We plan the system, interface, and experience before writing any code.' },
  { num: '03', title: 'Build', desc: 'We develop your solution with clean, modern code and real-world testing.' },
  { num: '04', title: 'Connect Tools', desc: 'We integrate WhatsApp, payments, forms, and automations so everything talks.' },
  { num: '05', title: 'Launch', desc: 'We deploy, test, and train your team so the system works from day one.' },
  { num: '06', title: 'Improve', desc: 'We monitor, maintain, and refine based on real usage and your feedback.' },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const steps = stepsRef.current;
    if (!section || !steps) return;

    const stepElements = steps.querySelectorAll('.process-step');
    const ctx = gsap.context(() => {
      gsap.from(stepElements, {
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
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
      id="process"
      className="w-full bg-navy py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-16">
          <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
            How We Work
          </span>
          <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream tracking-[-0.03em]">
            Simple Process, Real Results
          </h2>
        </div>

        {/* Desktop horizontal */}
        <div ref={stepsRef} className="hidden md:flex items-start justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-[28px] left-[8%] right-[8%] h-px bg-white/[0.08]" />

          {processSteps.map((step) => (
            <div key={step.num} className="process-step flex flex-col items-center w-[14%] relative z-10">
              <div className="w-14 h-14 rounded-full bg-navy-light border border-white/[0.08] flex items-center justify-center mb-5">
                <span className="font-sans font-bold text-[14px] text-orange/30">{step.num}</span>
              </div>
              <h3 className="font-sans font-semibold text-[18px] text-cream text-center mb-2">{step.title}</h3>
              <p className="font-sans font-normal text-[14px] text-slate text-center leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile vertical */}
        <div className="md:hidden flex flex-col gap-8 relative">
          <div className="absolute left-[21px] top-0 bottom-0 w-px bg-white/[0.08]" />
          {processSteps.map((step) => (
            <div key={step.num} className="process-step flex items-start gap-5 relative">
              <div className="w-11 h-11 rounded-full bg-navy-light border border-white/[0.08] flex items-center justify-center shrink-0 relative z-10">
                <span className="font-sans font-bold text-[12px] text-orange/30">{step.num}</span>
              </div>
              <div>
                <h3 className="font-sans font-semibold text-[18px] text-cream mb-1">{step.title}</h3>
                <p className="font-sans font-normal text-[14px] text-slate leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
