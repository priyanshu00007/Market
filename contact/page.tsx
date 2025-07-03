"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have questions or feedback? We'd love to hear from you. Our team is here to help.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-4">For general inquiries and support</p>
                  <a href="mailto:support@modernstore.com" className="text-primary hover:underline">
                    support@modernstore.com
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Call Us</h3>
                  <p className="text-muted-foreground mb-4">Mon-Fri from 8am to 5pm</p>
                  <a href="tel:+1-800-123-4567" className="text-primary hover:underline">
                    +1 (800) 123-4567
                  </a>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
                  <p className="text-muted-foreground mb-4">Our headquarters location</p>
                  <address className="not-italic">
                    123 Commerce Street
                    <br />
                    Suite 500
                    <br />
                    San Francisco, CA 94103
                  </address>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                <Card>
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="name">Your Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Map and Business Hours */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6">Our Location</h2>
                  <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                    {/* Replace with actual map embed */}
                    <div className="w-full h-full flex items-center justify-center bg-muted">
                      <MapPin className="h-12 w-12 text-muted-foreground" />
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-semibold mb-6">Business Hours</h2>
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <Clock className="h-5 w-5 mr-2 text-primary" />
                          <span className="font-medium">Our Working Hours</span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>Monday - Friday</span>
                            <span>8:00 AM - 5:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Saturday</span>
                            <span>10:00 AM - 3:00 PM</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sunday</span>
                            <span>Closed</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Find quick answers to common questions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What are your shipping options?</h3>
                  <p className="text-muted-foreground">
                    We offer standard, express, and next-day shipping options. Free shipping is available on orders over
                    $100.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">How can I track my order?</h3>
                  <p className="text-muted-foreground">
                    You can track your order by logging into your account and viewing your order history, or by using
                    the tracking number provided in your shipping confirmation email.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">What is your return policy?</h3>
                  <p className="text-muted-foreground">
                    We offer a 30-day return policy for most items. Products must be in original condition with tags
                    attached and original packaging.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Do you ship internationally?</h3>
                  <p className="text-muted-foreground">
                    Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by
                    location.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
