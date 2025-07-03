"use client"

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react"
import type { Product } from "@/types/product"

// Interfaces
interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }

// Create Context
const CartContext = createContext<{
  items: CartItem[]
  total: number
  addItem: (product: Product) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
} | undefined>(undefined)

// Reducer Function
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      const updatedItems = existingItem
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.payload, quantity: 1 }]

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )

      return { items: updatedItems, total }
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter(item => item.id !== action.payload)
      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      return { items: updatedItems, total }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, action.payload.quantity) }
            : item
        )
        .filter(item => item.quantity > 0)

      const total = updatedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      )
      return { items: updatedItems, total }
    }

    case "CLEAR_CART":
      return { items: [], total: 0 }

    default:
      return state
  }
}

// Provider Component

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    { items: [], total: 0 },
    initial => {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("cart")
        if (stored) {
          try {
            const parsed = JSON.parse(stored)
            if (
              typeof parsed === "object" &&
              Array.isArray(parsed.items) &&
              typeof parsed.total === "number"
            ) {
              return parsed
            }
          } catch {
            // ignore parse errors, fall back to initial
          }
        }
      }
      return initial
    }
  )

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state))
  }, [state])

  const addItem = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        total: state.total,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook to use Cart Context
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
