import { Flower2 } from "lucide-react"

export function FooterSection() {
  const currentYear = new Date().getFullYear()
  return (
    <footer className="py-12 bg-weddingCream text-center">
      <div className="container mx-auto px-4 md:px-6">
        <Flower2 className="h-10 w-10 text-weddingRose-dark mx-auto mb-4" />
        <p className="font-serif text-2xl text-weddingGold-dark mb-2">Von & Salo Mae</p>
        <p className="text-weddingText mb-1">Looking forward to celebrating with you!</p>
        <p className="text-sm text-weddingText/70">&copy; {currentYear} Von & Salo Mae. All rights reserved.</p>
      </div>
    </footer>
  )
}
