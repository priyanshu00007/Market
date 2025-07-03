// app/profile/page.tsx
"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { useAuth } from "@/contexts/auth-context"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ProfilePage() {
  const { user, loading: authLoading, updateUser } = useAuth()
  const router = useRouter()

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  })
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Populate form data when user loads or component mounts
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      })
    }
  }, [user])

  // Redirect if not authenticated and auth check is complete
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth")
    }
  }, [user, authLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    setFeedbackMessage(null) // Clear previous messages

    try {
      await updateUser(formData) // Update context with new data
      setFeedbackMessage({ type: "success", text: "Profile updated successfully!" })
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
      setFeedbackMessage({ type: "error", text: "Failed to update profile. Please try again." })
    } finally {
      setIsSaving(false)
      setTimeout(() => setFeedbackMessage(null), 5000); // Clear message after 5 seconds
    }
  }

  const handleCancel = () => {
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        address: user.address || "",
        phone: user.phone || "",
      })
    }
    setIsEditing(false)
    setFeedbackMessage(null) // Clear messages on cancel
  }

  // Show loading state while auth is being checked
  if (authLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </main>
        <Footer />
      </div>
    );
  }

  // If user is null after loading, it means they are not authenticated
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <Card className="max-w-md w-full p-8 text-center border rounded-lg bg-background shadow-md">
            <h2 className="text-2xl font-bold mb-4">Please sign in to view your profile</h2>
            <p className="text-muted-foreground mb-6">
              You need to be logged in to access your profile information.
            </p>
            <Button onClick={() => router.push("/auth")}>Sign In</Button>
          </Card>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center space-x-2">
          <User className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>{user.role.toUpperCase()}</Badge> 
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
            <TabsTrigger value="profile">Profile Details</TabsTrigger>
            <TabsTrigger value="security">Account Security</TabsTrigger>
          </TabsList>
          <TabsContent value="profile" className="mt-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>Manage your personal information.</CardDescription>
                </div>
                {!isEditing && (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {feedbackMessage && (
                  <Alert variant={feedbackMessage.type === "error" ? "destructive" : "default"}>
                    {feedbackMessage.type === "success" ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                    <AlertTitle>{feedbackMessage.type === "success" ? "Success!" : "Error!"}</AlertTitle>
                    <AlertDescription>{feedbackMessage.text}</AlertDescription>
                  </Alert>
                )}

                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-24 w-24 border-2 shadow-sm">
                    <AvatarImage src={user.profilePicture || "https://github.com/shadcn.png"} alt={`${user.name}'s profile picture`} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'US'}</AvatarFallback>
                  </Avatar>
                  {/* Optionally add a button to change profile picture */}
                  {/* <Button variant="outline" size="sm">Change Photo</Button> */}
                </div>

                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
                    <Label htmlFor="name" className="md:text-right flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" /> Name
                    </Label>
                    {isEditing ? (
                      <Input id="name" value={formData.name} onChange={handleChange} className="col-span-3" />
                    ) : (
                      <p className="col-span-3 font-medium">{user.name}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
                    <Label htmlFor="email" className="md:text-right flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> Email
                    </Label>
                    {isEditing ? (
                      <Input id="email" type="email" value={formData.email} onChange={handleChange} className="col-span-3" />
                    ) : (
                      <p className="col-span-3 font-medium">{user.email}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
                    <Label htmlFor="phone" className="md:text-right flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" /> Phone
                    </Label>
                    {isEditing ? (
                      <Input id="phone" value={formData.phone} onChange={handleChange} className="col-span-3" />
                    ) : (
                      <p className="col-span-3 text-muted-foreground">{user.phone || "Not provided"}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 items-center gap-2">
                    <Label htmlFor="address" className="md:text-right flex items-center">
                      <MapPin className="mr-2 h-4 w-4 text-muted-foreground" /> Address
                    </Label>
                    {isEditing ? (
                      <Input id="address" value={formData.address} onChange={handleChange} className="col-span-3" />
                    ) : (
                      <p className="col-span-3 text-muted-foreground">{user.address || "Not provided"}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              {isEditing && (
                <>
                  <Separator className="my-4" />
                  <CardContent className="flex justify-end gap-2">
                    <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                      <X className="mr-2 h-4 w-4" /> Cancel
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      <Save className={`mr-2 h-4 w-4 ${isSaving ? 'hidden' : ''}`} /> Save Changes
                    </Button>
                  </CardContent>
                </>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Change your password and manage security settings.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" placeholder="Confirm new password" />
                </div>
                <Button className="mt-4">Update Password</Button>
                <Separator />
                <h3 className="text-lg font-semibold">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground">
                  Add an extra layer of security to your account.
                </p>
                <Button variant="secondary">Enable 2FA</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}