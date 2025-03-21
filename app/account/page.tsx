"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AccountLayout from "@/components/account/account-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, ShoppingCart, User, FileText, Clock } from "lucide-react"

export default function AccountPage() {
  const router = useRouter()
  const { user } = useAuth()

  if (!user) {
    router.push("/login")
    return null
  }

  const accountStats = [
    {
      title: "Orders",
      value: "5",
      icon: <Package className="h-5 w-5" />,
      href: "/account/orders",
    },
    {
      title: "Prescriptions",
      value: "3",
      icon: <FileText className="h-5 w-5" />,
      href: "/account/prescriptions",
    },
    {
      title: "Cart Items",
      value: "2",
      icon: <ShoppingCart className="h-5 w-5" />,
      href: "/cart",
    },
    {
      title: "Pending Deliveries",
      value: "1",
      icon: <Clock className="h-5 w-5" />,
      href: "/account/orders",
    },
  ]

  return (
    <AccountLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>Welcome back, {user.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {accountStats.map((stat) => (
                <Button
                  key={stat.title}
                  variant="outline"
                  className="h-auto flex flex-col items-center justify-center p-6 hover:bg-gray-50"
                  onClick={() => router.push(stat.href)}
                >
                  <div className="rounded-full bg-teal-100 p-2 mb-2">{stat.icon}</div>
                  <span className="text-2xl font-bold mb-1">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.title}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your personal details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="rounded-full bg-gray-100 p-3 mr-4">
                  <User className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium">{user.name}</h3>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
                <Button variant="ghost" className="ml-auto" onClick={() => router.push("/account/profile")}>
                  Edit
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Default Shipping Address</h4>
                  <div className="text-sm text-gray-500">
                    <p>123 Health Street</p>
                    <p>Nairobi, 00100</p>
                    <p>Kenya</p>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-teal-600 mt-1"
                    onClick={() => router.push("/account/addresses")}
                  >
                    Edit
                  </Button>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Payment Methods</h4>
                  <div className="text-sm text-gray-500">
                    <p>Visa ending in 4242</p>
                    <p>Expires 12/25</p>
                  </div>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-teal-600 mt-1"
                    onClick={() => router.push("/account/payment-methods")}
                  >
                    Edit
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AccountLayout>
  )
}

