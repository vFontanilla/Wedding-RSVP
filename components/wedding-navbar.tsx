"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Flower2 } from "lucide-react"
import React from "react"

const navItems = [
  { href: "#story", label: "Our Story" },
  { href: "#details", label: "Event Details" },
  { href: "#gallery", label: "Gallery" },
  { href: "#rsvp", label: "RSVP" },
]

export function WeddingNavbar() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-weddingGold/20 bg-weddingCream/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-weddingGold-dark hover:text-weddingGold transition-colors"
        >
          <Flower2 className="h-7 w-7" />
          <span className="font-serif text-2xl font-semibold">V & S</span>
        </Link>
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              asChild
              className="text-weddingText hover:bg-weddingRose/20 hover:text-weddingGold-dark transition-colors px-4 py-2"
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-weddingGold-dark" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-weddingCream-light border-weddingGold/20 w-[280px]">
            <div className="flex flex-col gap-6 p-6 pt-12">
              <Link
                href="#"
                className="flex items-center gap-2 text-weddingGold-dark mb-6"
                onClick={() => setIsOpen(false)}
              >
                <Flower2 className="h-7 w-7" />
                <span className="font-serif text-2xl font-semibold">Von & Salo Mae</span>
              </Link>
              {navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  asChild
                  className="text-weddingText hover:bg-weddingRose/20 hover:text-weddingGold-dark transition-colors text-lg justify-start"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
