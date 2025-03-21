"use client"

import type { ReactNode } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { User, Package, FileText, CreditCard, MapPin, Bell, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccountLayoutProps {
  children: ReactNode
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const pathname = usePathname()
  const { logout } = useAuth()

  const navigation = [
    {
      name: "Account Overview",
      href: "/account",
      icon: User,
    },
    {
      name: "Orders",
      href: "/account/orders",
      icon: Package,
    },
    {
      name: "Prescriptions",
      href: "/account/prescriptions",
      icon: FileText,
    },
    {
      name: "Payment Methods",
      href: "/account/payment-methods",
      icon: CreditCard,
    },
    {
      name: "Addresses",
      href: "/account/addresses",
      icon: MapPin,
    },
    {
      name: "Notifications",
      href: "/account/notifications",
      icon: Bell,
    },
  ]

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/account" && pathname?.startsWith(item.href))

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-2 text-sm font-medium rounded-md",
                    isActive ? "bg-teal-50 text-teal-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                  )}
                >
                  <item.icon className={cn("mr-3 h-5 w-5", isActive ? "text-teal-500" : "text-gray-400")} />
                  {item.name}
                </Link>
              )
            })}

            <Button
              variant="ghost"
              className="w-full justify-start text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              onClick={logout}
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Sign Out
            </Button>
          </nav>
        </aside>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  )
}

