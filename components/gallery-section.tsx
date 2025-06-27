"use client"

import React from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Camera } from "lucide-react"

const galleryImages = [
  { id: 1, src: "/placeholder.svg?width=400&height=300&text=Memory+1", alt: "Our first vacation together" },
  { id: 2, src: "/placeholder.svg?width=400&height=300&text=Memory+2", alt: "Celebrating an anniversary" },
  { id: 3, src: "/placeholder.svg?width=400&height=300&text=Memory+3", alt: "The proposal moment" },
  { id: 4, src: "/placeholder.svg?width=400&height=300&text=Memory+4", alt: "Adventures in the city" },
  { id: 5, src: "/placeholder.svg?width=400&height=300&text=Memory+5", alt: "Relaxing by the beach" },
  { id: 6, src: "/placeholder.svg?width=400&height=300&text=Memory+6", alt: "A candid laugh" },
]

export function GallerySection() {
  const [selectedImage, setSelectedImage] = React.useState<(typeof galleryImages)[0] | null>(null)

  return (
    <section id="gallery" className="py-16 md:py-24 bg-weddingCream-light">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 animate-slideInUp animated-once">
          <Camera className="h-12 w-12 text-weddingRose-dark mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-weddingGold-dark">Our Moments</h2>
          <p className="text-lg text-weddingText mt-2">A glimpse into our journey.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {galleryImages.map((image, index) => (
            <Dialog key={image.id} onOpenChange={(open) => !open && setSelectedImage(null)}>
              <DialogTrigger asChild>
                <Card
                  className="overflow-hidden cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-xl border-weddingGold/30 animate-slideInUp animated-once"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedImage(image)}
                >
                  <CardContent className="p-0">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      width={400}
                      height={300}
                      className="w-full h-auto object-cover aspect-[4/3]"
                    />
                  </CardContent>
                </Card>
              </DialogTrigger>
              {selectedImage && selectedImage.id === image.id && (
                <DialogContent className="max-w-3xl p-2 bg-weddingCream-light border-weddingGold/50">
                  <Image
                    src={selectedImage.src.replace("400&height=300", "800&height=600") || "/placeholder.svg"} // Request larger image for modal
                    alt={selectedImage.alt}
                    width={800}
                    height={600}
                    className="w-full h-auto object-contain rounded-md"
                  />
                  <p className="text-center text-sm text-weddingText mt-2">{selectedImage.alt}</p>
                </DialogContent>
              )}
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  )
}
