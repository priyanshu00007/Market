"use client" // This component uses client-side hooks and interactivity

import React, { useState } from "react"
import Header from "@/components/layout/header" // Make sure this path is correct
import Footer from "@/components/layout/footer" // Make sure this path is correct
import { useAuth } from "@/contexts/auth-context"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DollarSign,
  Users,
  CreditCard,
  Package,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  ShoppingCart,
  User,
  Activity,
  Box,
} from "lucide-react"
// Assuming you have Next.js useRouter imported if you want to use router.push for navigation
import { useRouter } from 'next/navigation';


// --- MOCK DATA (for demonstration) ---
const salesData = [
  { name: "Jan", totalSales: 4000, avgOrders: 2400 },
  { name: "Feb", totalSales: 3000, avgOrders: 1398 },
  { name: "Mar", totalSales: 2000, avgOrders: 9800 },
  { name: "Apr", totalSales: 2780, avgOrders: 3908 },
  { name: "May", totalSales: 1890, avgOrders: 4800 },
  { name: "Jun", totalSales: 2390, avgOrders: 3800 },
  { name: "Jul", totalSales: 3490, avgOrders: 4300 },
  { name: "Aug", totalSales: 5000, avgOrders: 2100 },
  { name: "Sep", totalSales: 4500, avgOrders: 3500 },
  { name: "Oct", totalSales: 6000, avgOrders: 4200 },
  { name: "Nov", totalSales: 5500, avgOrders: 3900 },
  { name: "Dec", totalSales: 7000, avgOrders: 5000 },
]

const categorySalesData = [
  { category: "Electronics", sales: 12000 },
  { category: "Clothing", sales: 8500 },
  { category: "Home Goods", sales: 6000 },
  { category: "Books", sales: 3000 },
  { category: "Food & Drink", sales: 4500 },
]

const recentOrders = [
  {
    id: "ORD001",
    customer: "John Doe",
    status: "Completed",
    amount: "450.00",
    date: "2023-10-26",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    status: "Pending",
    amount: "120.50",
    date: "2023-10-25",
  },
  {
    id: "ORD003",
    customer: "Alice Johnson",
    status: "Shipped",
    amount: "78.99",
    date: "2023-10-24",
  },
  {
    id: "ORD004",
    customer: "Bob Brown",
    status: "Completed",
    amount: "899.99",
    date: "2023-10-23",
  },
  {
    id: "ORD005",
    customer: "Charlie Davis",
    status: "Cancelled",
    amount: "50.00",
    date: "2023-10-22",
  },
  {
    id: "ORD006",
    customer: "Diana Prince",
    status: "Completed",
    amount: "300.00",
    date: "2023-10-21",
  },
  {
    id: "ORD007",
    customer: "Clark Kent",
    status: "Pending",
    amount: "99.99",
    date: "2023-10-20",
  },
  {
    id: "ORD008",
    customer: "Bruce Wayne",
    status: "Shipped",
    amount: "1500.00",
    date: "2023-10-19",
  },
]

// --- Helper component for Stat Cards ---
interface StatCardProps {
  title: string
  value: string
  description: string
  icon: React.ElementType
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, icon: Icon }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
)

// --- Main Dashboard Component ---
export default function DashboardPage() { // <--- THIS WAS MISSING
  const [activeTab, setActiveTab] = useState("overview")
  const { user } = useAuth();
  const router = useRouter(); // Initialize useRouter

  // If user is not authenticated, display a message and offer to sign in
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full p-8 text-center border rounded-lg bg-background shadow-md">
            <h2 className="text-2xl font-bold mb-4">Please sign in to view your dashboard</h2>
            <p className="text-muted-foreground mb-6">
              You need to be authenticated to access this page.
            </p>
            <Button onClick={() => router.push("/auth")}>Sign In</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  // If user is authenticated, render the dashboard content
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Date Range</span>
            </Button>
            <Button size="sm" className="h-8 gap-1">
              <TrendingUp className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Generate Report</span>
            </Button>
          </div>
        </div>

        {/* Overview Tab Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <StatCard
                title="Total Revenue"
                value="$45,231.89"
                description="+20.1% from last month"
                icon={DollarSign}
              />
              <StatCard
                title="New Customers"
                value="+2350"
                description="+180.1% from last month"
                icon={Users}
              />
              <StatCard
                title="Sales"
                value="+12,234"
                description="+19% from last month"
                icon={CreditCard}
              />
              <StatCard
                title="Active Now"
                value="+573"
                description="+201 since last hour"
                icon={Activity}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Sales Trend</CardTitle>
                  <CardDescription>
                    Monthly sales performance over the past year.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={salesData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Month</span>
                                    <span className="font-bold text-muted-foreground">{payload[0].payload.name}</span>
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">Total Sales</span>
                                    <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Line type="monotone" dataKey="totalSales" stroke="#8884d8" activeDot={{ r: 8 }} name="Total Sales" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                  <CardDescription>
                    Breakdown of sales volume by product category.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={categorySalesData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
                      <XAxis dataKey="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                      <Tooltip
                         content={({ active, payload }) => {
                            if (active && payload && payload.length) {
                              return (
                                <div className="rounded-lg border bg-background p-2 shadow-sm">
                                  <div className="grid grid-cols-1 gap-2">
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Category</span>
                                      <span className="font-bold text-muted-foreground">{payload[0].payload.category}</span>
                                    </div>
                                    <div className="flex flex-col">
                                      <span className="text-[0.70rem] uppercase text-muted-foreground">Sales</span>
                                      <span className="font-bold">${payload[0].value?.toLocaleString()}</span>
                                    </div>
                                  </div>
                                </div>
                              )
                            }
                            return null
                          }}
                      />
                      <Bar dataKey="sales" fill="#82ca9d" radius={[4, 4, 0, 0]} name="Sales" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-full">
                <CardHeader>
                  <CardTitle>Recent Orders</CardTitle>
                  <CardDescription>
                    A list of your latest transactions.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-[300px] w-full pr-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Order</TableHead>
                          <TableHead>Customer</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>
                              <Badge variant={
                                order.status === "Completed" ? "default" :
                                order.status === "Pending" ? "outline" :
                                order.status === "Shipped" ? "secondary" :
                                "destructive"
                              }>
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">${order.amount}</TableCell>
                            <TableCell>{order.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Placeholder for other tabs */}
          <TabsContent value="analytics" className="h-[400px] flex items-center justify-center text-muted-foreground">
            Analytics content coming soon!
          </TabsContent>
          <TabsContent value="reports" className="h-[400px] flex items-center justify-center text-muted-foreground">
            Reports content coming soon!
          </TabsContent>
          <TabsContent value="notifications" className="h-[400px] flex items-center justify-center text-muted-foreground">
            Notifications content coming soon!
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}