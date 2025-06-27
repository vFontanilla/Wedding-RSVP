"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { toast } from "sonner"
import { Mail, Send } from "lucide-react"

export function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    attending: "yes",
    guests: "1",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, attending: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        toast("RSVP Submitted!\nThank you for your response.")
        // Reset form
        setFormData({ name: "", email: "", attending: "yes", guests: "1", message: "" })
      } else {
        throw new Error(result.message || "Something went wrong.")
      }
    } catch (error: any) {
      // toast({
      //   title: "Error",
      //   description: error.message || "Could not submit RSVP. Please try again.",
      //   variant: "destructive",
      // })
      toast("Error\nCould not submit RSVP. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="rsvp" className="py-16 md:py-24 bg-weddingCream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 animate-slideInUp animated-once">
          <Mail className="h-12 w-12 text-weddingRose-dark mx-auto mb-4" />
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-weddingGold-dark">Kindly RSVP</h2>
          <p className="text-lg text-weddingText mt-2">Please let us know if you can make it by September 15, 2025.</p>
        </div>
        <Card className="max-w-2xl mx-auto shadow-xl border-weddingGold/30 p-2 sm:p-0 animate-scaleUp animated-once">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-weddingGold-dark">Confirm Your Attendance</CardTitle>
            <CardDescription className="text-weddingText">We can&apos;t wait to celebrate with you!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-weddingText font-medium">
                  Full Name(s)
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-weddingText font-medium">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                />
              </div>
              <div>
                <Label className="text-weddingText font-medium">Will you be attending?</Label>
                <RadioGroup
                  name="attending"
                  value={formData.attending}
                  onValueChange={handleRadioChange}
                  className="mt-2 flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="yes"
                      id="yes"
                      className="text-primary border-weddingGold/60 data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="yes" className="text-weddingText">
                      Joyfully Accept
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value="no"
                      id="no"
                      className="text-primary border-weddingGold/60 data-[state=checked]:border-primary"
                    />
                    <Label htmlFor="no" className="text-weddingText">
                      Regretfully Decline
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {formData.attending === "yes" && (
                <div>
                  <Label htmlFor="guests" className="text-weddingText font-medium">
                    Number of Guests (including yourself)
                  </Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="message" className="text-weddingText font-medium">
                  Leave a message (optional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 text-lg"
              >
                {isSubmitting ? "Submitting..." : "Send RSVP"}
                {!isSubmitting && <Send className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
