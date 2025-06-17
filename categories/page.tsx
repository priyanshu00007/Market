import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=400&width=600",
    description: "Discover the latest tech gadgets and electronic devices for your everyday needs.",
    count: 120,
    featured: true,
  },
  {
    id: 2,
    name: "Fashion",
    image: "/placeholder.svg?height=400&width=600",
    description: "Explore trendy clothing, accessories, and footwear for all seasons.",
    count: 85,
    featured: true,
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "/placeholder.svg?height=400&width=600",
    description: "Transform your living space with stylish furniture and home decor items.",
    count: 95,
    featured: true,
  },
  {
    id: 4,
    name: "Sports",
    image: "/placeholder.svg?height=400&width=600",
    description: "Find high-quality sports equipment and activewear for your fitness journey.",
    count: 60,
    featured: false,
  },
  {
    id: 5,
    name: "Books",
    image: "/placeholder.svg?height=400&width=600",
    description: "Dive into a world of knowledge with our extensive collection of books.",
    count: 45,
    featured: false,
  },
  {
    id: 6,
    name: "Beauty",
    image: "/placeholder.svg?height=400&width=600",
    description: "Enhance your natural beauty with premium skincare and makeup products.",
    count: 75,
    featured: true,
  },
  {
    id: 7,
    name: "Toys & Games",
    image: "/placeholder.svg?height=400&width=600",
    description: "Find the perfect toys and games for children of all ages.",
    count: 55,
    featured: false,
  },
  {
    id: 8,
    name: "Automotive",
    image: "/placeholder.svg?height=400&width=600",
    description: "Discover essential parts and accessories for your vehicle.",
    count: 40,
    featured: false,
  },
  {
    id: 9,
    name: "Health & Wellness",
    image: "/placeholder.svg?height=400&width=600",
    description: "Take care of your health with our range of wellness products.",
    count: 65,
    featured: false,
  },
  {
    id: 10,
    name: "Jewelry",
    image: "/placeholder.svg?height=400&width=600",
    description: "Add a touch of elegance with our stunning jewelry collection.",
    count: 30,
    featured: false,
  },
]

export default function CategoriesPage() {
  // Separate featured and regular categories
  const featuredCategories = categories.filter((category) => category.featured)
  const regularCategories = categories.filter((category) => !category.featured)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-4">Shop by Category</h1>
          <p className="text-muted-foreground max-w-3xl">
            Explore our wide range of product categories and find exactly what you're looking for. From electronics to
            fashion, we have everything you need.
          </p>
        </div>

        {/* Featured Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-8">Featured Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCategories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                        {category.name}
                      </h3>
                      <span className="text-sm text-muted-foreground">{category.count} items</span>
                    </div>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* All Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-8">All Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {regularCategories.map((category) => (
              <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <CardContent className="p-4">
                    <div className="text-center">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.count} items</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
