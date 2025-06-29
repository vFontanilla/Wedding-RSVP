import Image from "next/image"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

export function OurStorySection() {
  return (
    <section id="story" className="py-16 md:py-24 bg-weddingCream-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 animate-slideInUp animated-once">
          <Heart className="h-12 w-12 text-weddingRose-dark mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-weddingGold-dark">Our Story</h2>
          <p className="text-lg text-weddingText mt-2">How our journey began...</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="animate-slideInUp animated-once animate-delay-200">
            <Card className="overflow-hidden shadow-lg border-weddingGold/30">
              <Image
                src="/images/pexels-phani-29173369.jpg"
                alt="Von and Salo Mae"
                width={450}
                height={450}
                className="w-full h-auto object-cover"
              />
            </Card>
          </div>
          <div className="space-y-6 text-weddingText text-lg leading-relaxed animate-slideInUp animated-once animate-delay-400">
            <p>
              It all started on a crisp autumn afternoon at a local coffee shop. Von was engrossed in a book, and
              Salo, captivated by the title, struck up a conversation. What began as a simple chat about literature
              quickly blossomed into hours of shared laughter, dreams, and an undeniable connection.
            </p>
            <p>
              From adventurous hikes in national parks to cozy evenings spent cooking together, our bond grew stronger
              with each passing day. We discovered a shared love for exploring new places, trying exotic foods, and
              simply enjoying the quiet moments of life side by side.
            </p>
            <p>
              The proposal was a magical surprise during a sunset picnic overlooking the ocean – a perfect moment that
              marked the beginning of our forever. Now, we eagerly anticipate celebrating our love and commitment with
              all of you, our dearest friends and family.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
