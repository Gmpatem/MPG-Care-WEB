import { Navigation } from '@/sections/Navigation'
import { Footer } from '@/sections/Footer'
import { SmartCTA } from '@/components/SmartCTA'
import { useRegion } from '@/lib/region'
import { CheckCircle, Home, MessageCircle } from 'lucide-react'

export function ThankYou() {
  const { region } = useRegion()

  const isPH = region === 'PH'

  return (
    <div className="bg-navy min-h-[100dvh] flex flex-col">
      <Navigation />

      <section className="flex-1 flex items-center justify-center px-6 py-[120px]">
        <div className="max-w-[520px] text-center">
          <div className="w-16 h-16 rounded-full bg-teal/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-teal" />
          </div>

          <h1 className="font-space font-bold text-[36px] md:text-[48px] text-cream leading-[1.15] tracking-[-0.03em] mb-4">
            {isPH ? 'Inquiry Received' : 'Inquiry Received'}
          </h1>

          <p className="font-sans font-normal text-[16px] text-slate leading-relaxed mb-8">
            {isPH
              ? 'Thanks — we received your project inquiry. We\'ll follow up by email or WhatsApp within 24 hours.'
              : 'Thanks — we received your inquiry. For the fastest response, message us on WhatsApp.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <SmartCTA action="book" variant="primary">
              <Home className="w-4 h-4 mr-2" />
              Book a Call
            </SmartCTA>
            <SmartCTA action="whatsapp" variant="secondary">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message on WhatsApp
            </SmartCTA>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
