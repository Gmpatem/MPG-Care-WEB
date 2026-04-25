import { Navigation } from '@/sections/Navigation'
import { Hero } from '@/sections/Hero'
import { ValueProposition } from '@/sections/ValueProposition'
import { Services } from '@/sections/Services'
import { Packages } from '@/sections/Packages'
import { Projects } from '@/sections/Projects'
import { Process } from '@/sections/Process'
import { Trust } from '@/sections/Trust'
import { WhyChoose } from '@/sections/WhyChoose'
import { FinalCTA } from '@/sections/FinalCTA'
import { Footer } from '@/sections/Footer'

export function Landing() {
  return (
    <>
      <Navigation />
      <Hero />
      <ValueProposition />
      <Services />
      <Packages />
      <Projects />
      <Process />
      <Trust />
      <WhyChoose />
      <FinalCTA />
      <Footer />
    </>
  )
}
