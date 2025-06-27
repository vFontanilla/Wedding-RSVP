import { HeroSection } from "../components/hero-section"
import { WeddingNavbar } from "../components/wedding-navbar"
import { OurStorySection } from "../components/our-story-section"
import { EventDetailsSection } from "../components/event-details-section"
import { GallerySection } from "../components/gallery-section"
import { RsvpSection } from "../components/rsvp-section"
import { FooterSection } from "../components/footer-section"

export default function WeddingInvitationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-weddingCream">
      <WeddingNavbar />
      <main className="flex-grow">
        <HeroSection />
        <OurStorySection />
        <EventDetailsSection />
        <GallerySection />
        <RsvpSection />
      </main>
      <FooterSection />
    </div>
  )
}
