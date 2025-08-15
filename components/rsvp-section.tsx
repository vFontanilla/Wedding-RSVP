"use client"

import React from "react"
import { z } from "zod"
import { toast } from "sonner"
import { Mail, Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

// ✅ Schema matches Strapi fields
const rsvpSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  emailAddress: z.string().email("Invalid email address."),
  attending: z.boolean(),
  numberGuests: z.number().min(1, "Guests must be at least 1."),
  longMessage: z.string().optional(),
})

type RsvpData = z.infer<typeof rsvpSchema>

export function RsvpSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const [formData, setFormData] = React.useState<RsvpData>({
    fullName: "",
    emailAddress: "",
    attending: true,
    numberGuests: 1,
    longMessage: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData({
      ...formData,
      [name]: type === "number" ? Number(value) : value,
    })
  }

  const handleRadioChange = (value: string) => {
    setFormData({ ...formData, attending: value === "yes" })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const validation = rsvpSchema.safeParse(formData)
    if (!validation.success) {
      const firstError = validation.error.errors[0]
      toast(`Validation Error\n${firstError.message}`)
      setIsSubmitting(false)
      return
    }

    try {
      // ✅ Call Next.js API route instead of Strapi directly
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      })

      const result = await response.json()

      if (response.ok) {
        toast("RSVP Submitted!\nThank you for your response.")
        setFormData({ fullName: "", emailAddress: "", attending: true, numberGuests: 1, longMessage: "" })
      } else {
        throw new Error(result.error || "Something went wrong.")
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast(`Error\n${err.message}`)
      } else {
        toast("Error\nCould not submit RSVP. Please try again.")
      }
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
          <p className="text-lg text-weddingText mt-2">Please let us know if you can make it by August 25, 2025.</p>
        </div>
        <Card className="max-w-2xl mx-auto shadow-xl border-weddingGold/30 p-2 sm:p-0 animate-scaleUp animated-once">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-serif text-weddingGold-dark">Confirm Your Attendance</CardTitle>
            <CardDescription className="text-weddingText">We can&apos;t wait to celebrate with you!</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName" className="text-weddingText font-medium">
                  Full Name(s)
                </Label>
                <Input
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                />
              </div>

              {/* Email */}
              <div>
                <Label htmlFor="emailAddress" className="text-weddingText font-medium">
                  Email Address
                </Label>
                <Input
                  id="emailAddress"
                  name="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                />
              </div>

              {/* Attending */}
              <div>
                <Label className="text-weddingText font-medium">Will you be attending?</Label>
                <RadioGroup
                  name="attending"
                  value={formData.attending ? "yes" : "no"}
                  onValueChange={handleRadioChange}
                  className="mt-2 flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="yes" />
                    <Label htmlFor="yes" className="text-weddingText">
                      Joyfully Accept
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="no" />
                    <Label htmlFor="no" className="text-weddingText">
                      Regretfully Decline
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Guests (only if attending) */}
              {formData.attending && (
                <div>
                  <Label htmlFor="numberGuests" className="text-weddingText font-medium">
                    Number of Guests (including yourself)
                  </Label>
                  <Input
                    id="numberGuests"
                    name="numberGuests"
                    type="number"
                    min="1"
                    value={formData.numberGuests}
                    onChange={handleChange}
                    required
                    className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <Label htmlFor="longMessage" className="text-weddingText font-medium">
                  Leave a message (optional)
                </Label>
                <Textarea
                  id="longMessage"
                  name="longMessage"
                  value={formData.longMessage}
                  onChange={handleChange}
                  rows={3}
                  className="mt-1 bg-weddingCream-light border-weddingGold/40 focus:border-weddingGold focus:ring-weddingGold"
                />
              </div>

              {/* Submit */}
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
