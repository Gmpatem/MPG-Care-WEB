import { Navigation } from '@/sections/Navigation'
import { Hero } from '@/sections/Hero'
import { ValueProposition } from '@/sections/ValueProposition'
import { Services } from '@/sections/Services'
import { Projects } from '@/sections/Projects'
import { SystemThinking } from '@/sections/SystemThinking'
import { WhyChoose } from '@/sections/WhyChoose'
import { Process } from '@/sections/Process'
import { Trust } from '@/sections/Trust'
import { Testimonials } from '@/sections/Testimonials'
import { FinalCTA } from '@/sections/FinalCTA'
import { Footer } from '@/sections/Footer'

export function Landing() {
  return (
    <>
      <Navigation />
      <Hero />
      <ValueProposition />
      <Services />
      <Projects />
      <SystemThinking />
      <WhyChoose />
      <Process />
      <Trust />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </>
  )
}
