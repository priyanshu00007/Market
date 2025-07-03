import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Users, Globe, Award, Heart } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-muted/30 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Our Story</h1>
                <p className="text-xl text-muted-foreground">
                  ModernStore was founded with a simple mission: to provide high-quality products with exceptional
                  customer service. We believe shopping should be easy, enjoyable, and accessible to everyone.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" asChild>
                    <Link href="/products">
                      Explore Our Products
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src="/placeholder.svg?height=600&width=600"
                    alt="Our Team"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                These core principles guide everything we do at ModernStore
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                  <p className="text-muted-foreground">
                    We prioritize our customers' needs and satisfaction above all else.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Quality</h3>
                  <p className="text-muted-foreground">
                    We never compromise on the quality of our products and services.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Globe className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    We're committed to environmentally responsible business practices.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="bg-primary/10 rounded-full p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Heart className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    We believe in giving back and supporting the communities we serve.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Journey */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">From humble beginnings to where we are today</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">2015 - The Beginning</h3>
                  <p className="text-muted-foreground">
                    ModernStore was founded with just 5 team members and a small selection of products.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">2017 - Expansion</h3>
                  <p className="text-muted-foreground">
                    We expanded our product range and opened our first physical store.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">2019 - Going Global</h3>
                  <p className="text-muted-foreground">
                    We launched international shipping and expanded to serve customers worldwide.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">2022 - Innovation</h3>
                  <p className="text-muted-foreground">
                    We introduced our mobile app and enhanced the online shopping experience.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">Today</h3>
                  <p className="text-muted-foreground">
                    We continue to grow, innovate, and provide exceptional products and services to our customers.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Our Journey"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Our Journey"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Our Journey"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src="/placeholder.svg?height=300&width=300"
                    alt="Our Journey"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">The passionate people behind ModernStore</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { name: "Sarah Johnson", role: "CEO & Founder", image: "/placeholder.svg?height=300&width=300" },
                { name: "Michael Chen", role: "CTO", image: "/placeholder.svg?height=300&width=300" },
                { name: "Emily Davis", role: "Head of Design", image: "/placeholder.svg?height=300&width=300" },
                { name: "David Wilson", role: "Customer Experience", image: "/placeholder.svg?height=300&width=300" },
              ].map((member, index) => (
                <Card key={index} className="overflow-hidden border-0 shadow-lg">
                  <div className="aspect-square">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 text-center">
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Awards & Recognition</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We're proud to be recognized for our commitment to excellence
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Best Online Retailer</h3>
                  <p className="text-muted-foreground">E-Commerce Awards, 2022</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Customer Service Excellence</h3>
                  <p className="text-muted-foreground">Retail Innovation Awards, 2021</p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sustainable Business</h3>
                  <p className="text-muted-foreground">Green Business Awards, 2023</p>
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
