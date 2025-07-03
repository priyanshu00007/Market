export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  images: string[]
  category: string
  brand: string
  rating: number
  reviewCount: number
  inStock: boolean
  stockCount: number
  tags: string[]
  featured?: boolean
}

export interface Review {
  id: string
  userId: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  helpful: number
}

export interface Category {
  id: string
  name: string
  slug: string
  image: string
  description: string
  productCount: number
}
