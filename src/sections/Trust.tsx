import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
  { value: 40, suffix: '+', label: 'Systems Delivered', prefix: '' },
  { value: 15, suffix: '+', label: 'Industries Served', prefix: '' },
  { value: 99.9, suffix: '%', label: 'Uptime Guaranteed', prefix: '' },
  { value: 24, suffix: 'h', label: 'Support Response', prefix: '<' },
];

function AnimatedNumber({ target, suffix, prefix, inView }: { target: number; suffix: string; prefix: string; inView: boolean }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const isFloat = target % 1 !== 0;
    const duration = 2000;
    const startTime = Date.now();
    const startVal = 0;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = startVal + (target - startVal) * eased;
      setDisplay(isFloat ? parseFloat(current.toFixed(1)) : Math.floor(current));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, target]);

  return (
    <span>
      {prefix}{display}{suffix}
    </span>
  );
}

export function Trust() {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 70%',
        onEnter: () => setInView(true),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="trust"
      className="w-full bg-navy-light py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-navy/50 border border-white/[0.08] rounded-xl p-8 md:p-10 text-center"
            >
              <span className="font-space font-bold text-[40px] md:text-[56px] text-orange block mb-2">
                <AnimatedNumber
                  target={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                  inView={inView}
                />
              </span>
              <span className="font-sans font-normal text-[12px] md:text-[14px] text-slate uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
