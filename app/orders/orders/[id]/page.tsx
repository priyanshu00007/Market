    // app/orders/[id]/page.tsx
"use client"

import React, { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Loader2, ArrowLeft, Package, CalendarDays, DollarSign, Lock } from "lucide-react"

// Re-using mock data from the OrdersPage for consistency
const mockOrders = [
  {
    id: "ORD20231026-001",
    date: "2023-10-26",
    total: 125.99,
    status: "Delivered",
    items: [
      { id: "prod001", name: "Wireless Headphones", quantity: 1, price: 79.99 },
      { id: "prod002", name: "USB-C Cable (2m)", quantity: 2, price: 23.00 },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      zip: "12345",
      country: "USA",
    },
  },
  {
    id: "ORD20231025-002",
    date: "2023-10-25",
    total: 34.50,
    status: "Processing",
    items: [
      { id: "prod003", name: "Coffee Mug", quantity: 1, price: 14.50 },
      { id: "prod004", name: "Organic Coffee Beans", quantity: 1, price: 20.00 },
    ],
    shippingAddress: {
      name: "Jane Smith",
      street: "456 Oak Ave",
      city: "Someville",
      zip: "67890",
      country: "USA",
    },
  },
  {
    id: "ORD20231024-003",
    date: "2023-10-24",
    total: 549.00,
    status: "Shipped",
    items: [
      { id: "prod005", name: "Mechanical Keyboard", quantity: 1, price: 120.00 },
      { id: "prod006", name: "Gaming Mouse", quantity: 1, price: 79.00 },
      { id: "prod007", name: "27-inch Monitor", quantity: 1, price: 350.00 },
    ],
    shippingAddress: {
      name: "Alice Johnson",
      street: "789 Pine Ln",
      city: "Metropolis",
      zip: "54321",
      country: "USA",
    },
  },
  {
    id: "ORD20231023-004",
    date: "2023-10-23",
    total: 15.00,
    status: "Cancelled",
    items: [
      { id: "prod008", name: "Pens (Pack of 10)", quantity: 1, price: 15.00 },
    ],
    shippingAddress: {
      name: "Bob Brown",
      street: "101 Elm Dr",
      city: "Gotham",
      zip: "98765",
      country: "USA",
    },
  },
  {
    id: "ORD20231022-005",
    date: "2023-10-22",
    total: 299.99,
    status: "Delivered",
    items: [
      { id: "prod009", name: "Smartwatch", quantity: 1, price: 299.99 },
    ],
    shippingAddress: {
      name: "Charlie Davis",
      street: "202 Birch Rd",
      city: "Star City",
      zip: "11223",
      country: "USA",
    },
  },
  {
    id: "ORD20231021-006",
    date: "2023-10-21",
    total: 65.00,
    status: "Processing",
    items: [
      { id: "prod010", name: "Novel: The Great Adventure", quantity: 1, price: 25.00 },
      { id: "prod011", name: "Bookmark Set", quantity: 1, price: 10.00 },
      { id: "prod012", name: "LED Desk Lamp", quantity: 1, price: 30.00 },
    ],
    shippingAddress: {
      name: "Diana Prince",
      street: "303 Cedar Ct",
      city: "Themyscira",
      zip: "33445",
      country: "USA",
    },
  },
]


export default function OrderDetailPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const params = useParams()
  const orderId = params.id as string

  const [order, setOrder] = useState<typeof mockOrders[0] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth");
        return;
      } else if (user.role !== 'admin') {
        // For non-admin users, we can display a generic unauthorized message
        // This page is treated as an "admin-only" detail page in this context
        setError("You do not have permission to view detailed order information.");
        setLoading(false); // Stop loading if unauthorized
        return;
      }
    }

    // Only proceed if user is an admin and not still loading auth
    if (user?.role === 'admin' && !authLoading) {
      setLoading(true)
      setError(null)
      const foundOrder = mockOrders.find((o) => o.id === orderId)
      if (foundOrder) {
        setOrder(foundOrder)
      } else {
        setError("Order not found or you don't have access.");
      }
      setLoading(false)
    }

  }, [orderId, user, authLoading, router]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading order details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Redirect handled by useEffect
  }

  // If error (including unauthorized for non-admins)
  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center border rounded-lg bg-background shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center text-destructive"><Lock className="h-6 w-6 mr-2" /> Access Denied</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => router.push(user.role === 'admin' ? "/orders" : "/profile")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {user.role === 'admin' ? "Back to Orders List" : "Go to Profile"}
            </Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  // If order is null after successful loading (shouldn't happen with the error check)
  if (!order) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <p className="text-muted-foreground">No order data available.</p>
          <Button onClick={() => router.push("/orders")}>Back to Orders</Button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orders
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Order #{order.id}</h1>
          <Badge
            variant={
              order.status === "Delivered" ? "default" :
              order.status === "Processing" ? "secondary" :
              order.status === "Shipped" ? "outline" :
              "destructive"
            }
          >
            {order.status}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Order Summary Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center"><CalendarDays className="mr-2 h-4 w-4" /> Order Date:</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center"><DollarSign className="mr-2 h-4 w-4" /> Total Amount:</span>
                <span className="font-bold text-lg">${order.total.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Address Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Shipping Address</CardState>
            </CardHeader>
            <CardContent className="text-sm">
              <p className="font-medium">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.street}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.zip}</p>
              <p>{order.shippingAddress.country}</p>
            </CardContent>
          </Card>

          {/* Dummy Payment Info Card */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>Payment Method: Visa **** 1234</p>
              <p>Transaction ID: TXN-{order.id.slice(3)}-ABC</p>
              <p>Status: Approved</p>
            </CardContent>
          </Card>
        </div>


        {/* Ordered Items Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Ordered Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className="w-[100px] text-center">Quantity</TableHead>
                  <TableHead className="w-[100px] text-right">Price</TableHead>
                  <TableHead className="w-[100px] text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-4" />
            <div className="flex justify-end items-center text-lg font-bold">
              Total: ${order.total.toFixed(2)}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline">Download Invoice</Button>
            <Button>Contact Support</Button>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  )
}