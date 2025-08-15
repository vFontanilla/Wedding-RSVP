import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, MapPin, Gift, Users } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function EventDetailsSection() {
  const dressCodeImage = "/images/sample-wedding-1.jpg"

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
      description: "Nature's Village", // Example
      details: "Talisay City, Negros Occidental, Philippines", // Example
    },
    {
      icon: Users,
      title: "Our Dress Code",
      description: "We love how you're glowing! Still, if you want tips on what to wear, here are some ideas for you.",
      details: "Click this to view the outfit idea for the event",
      dialogImage: dressCodeImage,
    },
    {
      icon: Gift,
      title: "Gift Registry",
      description: "Your presence is the greatest gift of all!",
      details: "But if you'd like to give something more, we would truly appreciate a contribution toward our future together.❤",
    },
  ]

  // const mapUrl = "https://maps.google.com/maps?q=Bacolod+City%2C+Negros+Occidental&t=&z=13&ie=UTF8&iwloc=&output=embed"

  const mapQuery = "Nature's Village, Talisay City, Negros Occidental";
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

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
                {/* If item has a dialogImage, make the details clickable and open the dialog */}
                {"dialogImage" in item ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="text-sm text-weddingGold underline underline-offset-4 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-weddingGold/40 rounded"
                      >
                        {item.details}
                      </button>
                    </DialogTrigger>
                    <DialogContent aria-label="Outfit Ideas" className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Outfit Ideas</DialogTitle>
                      </DialogHeader>
                      <div className="relative w-full">
                        <Image
                          src={item.dialogImage as string}
                          alt="Outfit ideas for the event"
                          width={1200}
                          height={800}
                          className="w-full h-auto rounded-xl"
                          priority={false}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                ) : (
                  <p className="text-sm">{item.details}</p>
                )}
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
