"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import ProductCard from "@/components/product/product-card"
import type { Product } from "@/types/product"

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock featured products data
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation",
        price: 299.99,
        originalPrice: 399.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        brand: "TechBrand",
        rating: 4.8,
        reviewCount: 124,
        inStock: true,
        stockCount: 15,
        tags: ["wireless", "premium", "noise-cancelling"],
        featured: true,
      },
      {
        id: "2",
        name: "Smart Fitness Watch",
        description: "Track your fitness goals with this advanced smartwatch",
        price: 199.99,
        originalPrice: 249.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        brand: "FitTech",
        rating: 4.6,
        reviewCount: 89,
        inStock: true,
        stockCount: 8,
        tags: ["fitness", "smart", "health"],
        featured: true,
      },
      {
        id: "3",
        name: "Designer Backpack",
        description: "Stylish and functional backpack for everyday use",
        price: 89.99,
        originalPrice: 119.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Fashion",
        brand: "StyleCo",
        rating: 4.7,
        reviewCount: 156,
        inStock: true,
        stockCount: 25,
        tags: ["fashion", "backpack", "designer"],
        featured: true,
      },
      {
        id: "4",
        name: "Organic Coffee Beans",
        description: "Premium organic coffee beans from sustainable farms",
        price: 24.99,
        originalPrice: 29.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Food",
        brand: "BrewMaster",
        rating: 4.9,
        reviewCount: 203,
        inStock: true,
        stockCount: 50,
        tags: ["organic", "coffee", "premium"],
        featured: true,
      },
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted rounded-lg h-64 mb-4"></div>
                <div className="bg-muted rounded h-4 mb-2"></div>
                <div className="bg-muted rounded h-4 w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" asChild>
            <Link href="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
