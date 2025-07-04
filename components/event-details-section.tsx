import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Gift, Users } from "lucide-react"

export function EventDetailsSection() {
  const eventDetails = [
    {
      icon: CalendarDays,
      title: "Date & Time",
      description: "Monday, August 25, 2025",
      details: "Ceremony begins at 4:00 PM, followed by reception.",
    },
    {
      icon: MapPin,
      title: "Venue",
      description: "A Beautiful Venue in Bacolod City", // Example
      details: "Bacolod City, Negros Occidental, Philippines", // Example
    },
    {
      icon: Users,
      title: "Dress Code",
      description: "Formal Attire",
      details: "We kindly request guests to dress in their finest.",
    },
    {
      icon: Gift,
      title: "Gift Registry",
      description: "Your presence is our gift!",
      details: "However, if you wish to contribute, please visit our registry section.",
    },
  ]

  const mapUrl = "https://maps.google.com/maps?q=Bacolod+City%2C+Negros+Occidental&t=&z=13&ie=UTF8&iwloc=&output=embed"

  return (
    <section id="details" className="py-16 md:py-24 bg-weddingCream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 animate-slideInUp animated-once">
          <CalendarDays className="h-12 w-12 text-weddingRose-dark mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-weddingGold-dark">Event Details</h2>
          <p className="text-lg text-weddingText mt-2">Everything you need to know for the big day.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {eventDetails.map((item, index) => (
            <Card
              key={item.title}
              className="shadow-lg border-weddingGold/30 animate-slideInUp animated-once"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <CardHeader className="flex flex-row items-center gap-4 pb-3">
                <item.icon className="h-8 w-8 text-weddingGold" />
                <CardTitle className="text-2xl font-serif text-weddingGold-dark">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-weddingText">
                <p className="font-semibold text-lg">{item.description}</p>
                <p className="text-sm">{item.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="animate-slideInUp animated-once" style={{ animationDelay: `${eventDetails.length * 0.15}s` }}>
          <h3 className="text-3xl font-serif text-weddingGold-dark text-center mb-6">Location Map</h3>
          <Card className="overflow-hidden shadow-xl border-weddingGold/30">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={mapUrl}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              ></iframe>
            </div>
          </Card>
          <p className="text-center mt-4 text-sm text-weddingText">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=Bacolod+City,+Negros+Occidental`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-weddingGold hover:underline"
            >
              Open in Google Maps
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
