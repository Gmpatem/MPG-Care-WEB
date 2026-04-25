import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarX, UserX, EyeOff, Puzzle, CalendarCheck, Workflow, BarChart3, Layers } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const problems = [
  { icon: CalendarX, title: 'Manual Bookings', desc: 'Clients call, email, or text to schedule. You write it down. You forget. They don\'t show.' },
  { icon: UserX, title: 'Missed Clients', desc: 'No follow-up system means warm leads go cold. Revenue walks out the door untracked.' },
  { icon: EyeOff, title: 'No Data Visibility', desc: 'You don\'t know your busiest day, your best channel, or where money is leaking.' },
  { icon: Puzzle, title: 'Scattered Tools', desc: 'Five apps that don\'t talk to each other. Double entry. Human error. Lost hours.' },
];

const solutions = [
  { icon: CalendarCheck, title: 'Smart Booking', desc: 'Self-service scheduling that syncs to your calendar and sends reminders automatically.' },
  { icon: Workflow, title: 'Auto Workflows', desc: 'Triggers, conditions, and actions that run your processes while you focus on growth.' },
  { icon: BarChart3, title: 'Live Dashboards', desc: 'Real-time metrics on revenue, bookings, and performance — all in one view.' },
  { icon: Layers, title: 'Scalable Tools', desc: 'Systems designed to grow from your first customer to your ten-thousandth.' },
];

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const cardElements = cards.querySelectorAll('.problem-card');
    const ctx = gsap.context(() => {
      gsap.from(cardElements, {
        x: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
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
      id="value"
      className="w-full bg-navy-light py-[120px] md:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-[48px]">
          {/* Left sticky panel */}
          <div className="lg:w-1/2 lg:sticky lg:top-[120px] lg:self-start">
            <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-orange mb-4 block">
              The Problem
            </span>
            <h2 className="font-sans font-bold text-[36px] md:text-[48px] text-cream leading-[1.15] tracking-[-0.03em] mb-6">
              Still Running Your Business on Spreadsheets?
            </h2>
            <p className="font-sans font-normal text-[18px] text-slate leading-relaxed max-w-[420px]">
              Manual data entry, missed bookings, and fragmented tools slow down growth and waste time you could spend serving customers.
            </p>
          </div>

          {/* Right scrolling cards */}
          <div ref={cardsRef} className="lg:w-1/2 flex flex-col gap-6">
            {problems.map((item) => (
              <div
                key={item.title}
                className="problem-card bg-navy/50 border border-white/[0.08] rounded-xl p-8"
              >
                <item.icon className="w-8 h-8 text-orange mb-4" strokeWidth={1.5} />
                <h3 className="font-sans font-semibold text-[18px] text-cream mb-2">{item.title}</h3>
                <p className="font-sans font-normal text-[15px] text-slate leading-relaxed">{item.desc}</p>
              </div>
            ))}

            {/* Divider */}
            <div className="h-px bg-white/[0.08] my-4" />

            {/* Solution block */}
            <div>
              <span className="font-sans font-medium text-[12px] uppercase tracking-[0.12em] text-teal mb-4 block">
                The MPG Solution
              </span>
              <h3 className="font-sans font-bold text-[30px] md:text-[36px] text-cream mb-6">
                One System. Zero Manual Work.
              </h3>
              <div className="mb-8">
                <a
                  href="#services"
                  className="font-sans font-semibold text-[14px] bg-orange/10 text-orange px-6 py-3 rounded-lg hover:bg-orange hover:text-navy transition-all duration-200 inline-flex items-center gap-2"
                >
                  See How We Can Help
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {solutions.map((item) => (
                  <div
                    key={item.title}
                    className="bg-navy/50 border border-white/[0.08] rounded-xl p-6"
                  >
                    <item.icon className="w-6 h-6 text-teal mb-3" strokeWidth={1.5} />
                    <h4 className="font-sans font-semibold text-[16px] text-cream mb-1">{item.title}</h4>
                    <p className="font-sans font-normal text-[14px] text-slate leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
