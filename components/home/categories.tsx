import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/placeholder.svg?height=200&width=200",
    count: 120,
  },
  {
    id: 2,
    name: "Fashion",
    image: "/placeholder.svg?height=200&width=200",
    count: 85,
  },
  {
    id: 3,
    name: "Home & Garden",
    image: "/placeholder.svg?height=200&width=200",
    count: 95,
  },
  {
    id: 4,
    name: "Sports",
    image: "/placeholder.svg?height=200&width=200",
    count: 60,
  },
  {
    id: 5,
    name: "Books",
    image: "/placeholder.svg?height=200&width=200",
    count: 45,
  },
  {
    id: 6,
    name: "Beauty",
    image: "/placeholder.svg?height=200&width=200",
    count: 75,
  },
]

export default function Categories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our wide range of categories and find exactly what you're looking for
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/products?category=${category.name.toLowerCase()}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="aspect-square rounded-lg bg-muted mb-4 overflow-hidden">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold mb-1">{category.name}</h3>
                  <p className="text-sm text-muted-foreground">{category.count} items</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
