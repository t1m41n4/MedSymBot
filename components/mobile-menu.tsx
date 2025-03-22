"use client"

import { X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface MobileMenuProps {
  routes: { name: string; path: string }[]
  onClose: () => void
}

const MobileMenu = ({ routes, onClose }: MobileMenuProps) => {
  const pathname = usePathname()

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background md:hidden">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
          <span className="text-xl font-bold text-teal-600">AfyaGo</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
      </div>
      <div className="p-4">
        <nav className="flex flex-col space-y-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              onClick={onClose}
              className={cn(
                "text-base font-medium transition-colors hover:text-teal-600",
                pathname === route.path ? "text-teal-600" : "text-muted-foreground",
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

export default MobileMenu

