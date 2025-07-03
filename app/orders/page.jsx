// app/orders/page.tsx
"use client"

import React, { useEffect } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from  "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Package, ListOrdered, ArrowRight, Loader2, Lock } from "lucide-react" // Added Lock icon

// --- MOCK DATA (for demonstration) ---
const mockOrders = [
  {
    id: "ORD20231026-001",
    date: "2023-10-26",
    total: 125.99,
    status: "Delivered",
    items: [
      { name: "Wireless Headphones", quantity: 1, price: 79.99 },
      { name: "USB-C Cable (2m)", quantity: 2, price: 23.00 },
    ],
  },
  {
    id: "ORD20231025-002",
    date: "2023-10-25",
    total: 34.50,
    status: "Processing",
    items: [
      { name: "Coffee Mug", quantity: 1, price: 14.50 },
      { name: "Organic Coffee Beans", quantity: 1, price: 20.00 },
    ],
  },
  {
    id: "ORD20231024-003",
    date: "2023-10-24",
    total: 549.00,
    status: "Shipped",
    items: [
      { name: "Mechanical Keyboard", quantity: 1, price: 120.00 },
      { name: "Gaming Mouse", quantity: 1, price: 79.00 },
      { name: "27-inch Monitor", quantity: 1, price: 350.00 },
    ],
  },
  {
    id: "ORD20231023-004",
    date: "2023-10-23",
    total: 15.00,
    status: "Cancelled",
    items: [
      { name: "Pens (Pack of 10)", quantity: 1, price: 15.00 },
    ],
  },
  {
    id: "ORD20231022-005",
    date: "2023-10-22",
    total: 299.99,
    status: "Delivered",
    items: [
      { name: "Smartwatch", quantity: 1, price: 299.99 },
    ],
  },
  {
    id: "ORD20231021-006",
    date: "2023-10-21",
    total: 65.00,
    status: "Processing",
    items: [
      { name: "Novel: The Great Adventure", quantity: 1, price: 25.00 },
      { name: "Bookmark Set", quantity: 1, price: 10.00 },
      { name: "LED Desk Lamp", quantity: 1, price: 30.00 },
    ],
  },
]

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Handle authentication and role-based access
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push("/auth");
      } else if (user.role !== 'admin') {
        // Do not redirect, just let the component render the unauthorized message
      }
    }
  }, [user, authLoading, router]);

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading orders...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // If user is null after loading, it means they are not authenticated (redirected by useEffect)
  if (!user) {
    return null; // Don't render anything here as useEffect has handled the redirect
  }

  // If user is authenticated but not an admin
  if (user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center border rounded-lg bg-background shadow-md">
            <h2 className="text-2xl font-bold mb-4 flex items-center justify-center text-destructive"><Lock className="h-6 w-6 mr-2" /> Unauthorized Access</h2>
            <p className="text-muted-foreground mb-6">
              You do not have permission to view the orders list. This page is restricted to administrators only.
            </p>
            <Button onClick={() => router.push("/profile")}>Go to Profile</Button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center space-x-2">
          <ListOrdered className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        </div>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>Your Order History</CardTitle>
            <CardDescription>
              Browse a list of all your past and current orders.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {mockOrders.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
                <Package className="h-12 w-12 mb-4" />
                <p className="text-lg font-medium">No orders found.</p>
                <p className="text-sm">Start shopping to place your first order!</p>
                <Button asChild className="mt-4">
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            ) : (
              <ScrollArea className="h-[400px] md:h-[calc(100vh-350px)] w-full pr-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[150px]">Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>
                          {order.items.length} {order.items.length === 1 ? "item" : "items"}
                        </TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell className="text-center">
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
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/orders/${order.id}`}>
                              View Details <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  )
}