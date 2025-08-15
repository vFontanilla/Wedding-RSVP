import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CalendarDays, MapPin } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative h-[calc(100vh-5rem)] min-h-[600px] flex items-center justify-center text-center text-white animate-fadeIn animated-once">
      <Image
        src="/images/pexels-edurawpro-32060022.jpg"
        alt="John & Dowy - Our Wedding Day"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 z-0"
        priority
      />
      <div className="absolute inset-0 bg-black/40 z-10" />
      <div className="relative z-20 p-6 animate-slideInUp animated-once">
        <h2 className="font-serif text-2xl md:text-3xl tracking-tight text-weddingCream-light mb-2 animate-slideInUp animated-once animate-delay-200">
          You are invited to celebrate the wedding of
        </h2>
        <h1 className="font-serif text-6xl md:text-8xl font-bold mb-6 text-white animate-slideInUp animated-once animate-delay-400">
          John & Dowy
        </h1>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 text-lg text-weddingCream-light animate-slideInUp animated-once animate-delay-600">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            <span>Monday, August 25, 2025</span>
          </div>
          <span className="hidden sm:inline">|</span>
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            <span>Bacolod City, Negros Occidental</span>
          </div>
        </div>
        <Button
          asChild
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-10 py-6 text-lg animate-scaleUp animated-once animate-delay-[800ms]"
        >
          <Link href="#rsvp">RSVP Now</Link>
        </Button>
      </div>
    </section>
  )
}
