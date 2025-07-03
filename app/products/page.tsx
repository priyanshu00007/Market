"use client"

import { useState, useEffect } from "react"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ProductCard from "@/components/product/product-card"
import ProductFilters from "@/components/product/product-filters"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Grid, List } from "lucide-react"
import type { Product } from "@/types/product"

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [minRating, setMinRating] = useState(0)

  // Get search query from URL
  const searchQuery = searchParams.get("q") || ""
  const categoryParam = searchParams.get("category") || ""

  useEffect(() => {
    // Initialize category filter from URL if present
    if (categoryParam && !selectedCategories.includes(categoryParam.toLowerCase())) {
      setSelectedCategories([...selectedCategories, categoryParam.toLowerCase()])
    }
  }, [categoryParam])

  useEffect(() => {
    // Mock products data
    const mockProducts: Product[] = [
      {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality",
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
        tags: ["wireless", "premium", "noise-cancelling", "headphones", "audio"],
        featured: true,
      },
      {
        id: "2",
        name: "Smart Fitness Watch",
        description: "Advanced fitness tracking with heart rate monitoring and GPS",
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
        tags: ["fitness", "smart", "health", "watch", "wearable"],
        featured: true,
      },
      {
        id: "3",
        name: "Designer Backpack",
        description: "Stylish and functional backpack perfect for work and travel",
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
        tags: ["fashion", "backpack", "designer", "travel", "bag"],
        featured: true,
      },
      {
        id: "4",
        name: "Organic Coffee Beans",
        description: "Premium organic coffee beans sourced from sustainable farms",
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
        tags: ["organic", "coffee", "premium", "food", "beverage"],
        featured: true,
      },
      {
        id: "5",
        name: "Wireless Gaming Mouse",
        description: "High-precision gaming mouse with customizable RGB lighting",
        price: 79.99,
        originalPrice: 99.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Electronics",
        brand: "GameTech",
        rating: 4.5,
        reviewCount: 67,
        inStock: true,
        stockCount: 12,
        tags: ["gaming", "wireless", "rgb", "mouse", "computer"],
        featured: false,
      },
      {
        id: "6",
        name: "Yoga Mat Premium",
        description: "Non-slip yoga mat made from eco-friendly materials",
        price: 49.99,
        originalPrice: 69.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Sports",
        brand: "ZenFit",
        rating: 4.4,
        reviewCount: 92,
        inStock: true,
        stockCount: 30,
        tags: ["yoga", "fitness", "eco-friendly", "exercise", "mat"],
        featured: false,
      },
      {
        id: "7",
        name: "Stainless Steel Water Bottle",
        description: "Insulated water bottle that keeps drinks cold for 24 hours",
        price: 34.99,
        originalPrice: 44.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Sports",
        brand: "HydroLife",
        rating: 4.7,
        reviewCount: 118,
        inStock: true,
        stockCount: 45,
        tags: ["hydration", "eco-friendly", "sports", "bottle", "stainless-steel"],
        featured: false,
      },
      {
        id: "8",
        name: "Leather Wallet",
        description: "Genuine leather wallet with RFID protection",
        price: 59.99,
        originalPrice: 79.99,
        image: "/placeholder.svg?height=300&width=300",
        images: ["/placeholder.svg?height=300&width=300"],
        category: "Fashion",
        brand: "StyleCo",
        rating: 4.6,
        reviewCount: 85,
        inStock: true,
        stockCount: 20,
        tags: ["leather", "wallet", "rfid", "fashion", "accessory"],
        featured: false,
      },
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  // Apply filters and search
  useEffect(() => {
    if (products.length === 0) return

    let result = [...products]

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) || product.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter((product) => selectedCategories.includes(product.category.toLowerCase()))
    }

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand.toLowerCase()))
    }

    // Apply price range filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply rating filter
    if (minRating > 0) {
      result = result.filter((product) => product.rating >= minRating)
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // In a real app, you'd sort by date
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        // Featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    setFilteredProducts(result)
  }, [products, searchQuery, selectedCategories, selectedBrands, priceRange, minRating, sortBy])

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
                <div className="h-32 bg-muted rounded"></div>
              </div>
            </div>
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-muted rounded-lg h-64 mb-4"></div>
                    <div className="bg-muted rounded h-4 mb-2"></div>
                    <div className="bg-muted rounded h-4 w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            {searchQuery ? `Search results for "${searchQuery}"` : "All Products"}
          </h1>
          <p className="text-muted-foreground">
            {searchQuery
              ? `Found ${filteredProducts.length} products matching your search`
              : "Discover our complete collection of premium products"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProductFilters
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                minRating={minRating}
                setMinRating={setMinRating}
              />
            </Suspense>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">{filteredProducts.length} products found</span>
              </div>

              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center border rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search terms</p>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-12">
                <div className="flex items-center space-x-2">
                  <Button variant="outline" disabled>
                    Previous
                  </Button>
                  <Button variant="default">1</Button>
                  <Button variant="outline">2</Button>
                  <Button variant="outline">3</Button>
                  <Button variant="outline">Next</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
