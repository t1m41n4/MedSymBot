"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, ShoppingCart, Menu, User, Package, FileText, Bot } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import ShopForMeButton from "@/components/shop-for-me/shop-for-me-button"
import { ThemeToggle } from "@/components/theme-toggle"

const Header = () => {
  const pathname = usePathname()
  const { cartItems, getCartTotal } = useCart()
  const { user, logout } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")

  const isActive = (path: string) => pathname === path

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background">
        <div className="container flex h-14 items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package className="h-6 w-6" />
                  <span className="font-bold">AfyaGo</span>
                </Link>
                <Link
                  href="/"
                  className={`${isActive("/") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className={`${isActive("/products") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className={`${isActive("/categories") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                >
                  Categories
                </Link>
                <Link
                  href="/prescriptions"
                  className={`${isActive("/prescriptions") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                >
                  Prescriptions
                </Link>
                <Link
                  href="/about"
                  className={`${isActive("/about") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className={`${isActive("/contact") ? "text-foreground" : "text-muted-foreground"} hover:text-foreground`}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>

          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Package className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              AfyaGo
            </span>
          </Link>

          <div className="hidden md:flex">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <a
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-teal-500 to-teal-700 p-6 no-underline outline-none focus:shadow-md"
                            href="/products"
                          >
                            <div className="mt-4 mb-2 text-lg font-medium text-white">
                              All Products
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Browse our complete range of healthcare products and medications.
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <Link href="/categories/medications" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Medications</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Prescription and over-the-counter medicines
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/categories/wellness" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Wellness</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Vitamins, supplements, and health boosters
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                      <li>
                        <Link href="/categories/devices" legacyBehavior passHref>
                          <NavigationMenuLink className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                            <div className="text-sm font-medium leading-none">Health Devices</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                              Monitors, thermometers, and medical equipment
                            </p>
                          </NavigationMenuLink>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/categories" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Categories
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/prescriptions" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Prescriptions
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/about" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      About
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link href="/contact" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Contact
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:block">
              <ShopForMeButton />
            </div>

            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[300px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>

            <ThemeToggle />

            {user ? (
              <div className="relative">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="h-8 w-8 rounded-full overflow-hidden bg-muted p-0">
                        <Avatar>
                          <AvatarImage src="" alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[220px] gap-3 p-4">
                          <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="" alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium">{user.name}</span>
                              <span className="text-xs text-muted-foreground">{user.email}</span>
                            </div>
                          </div>
                          <li>
                            <Link href="/account" legacyBehavior passHref>
                              <NavigationMenuLink className="flex items-center gap-2 select-none space-y-1 rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <User className="h-4 w-4" />
                                <span>My Account</span>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                          <li>
                            <Link href="/account/orders" legacyBehavior passHref>
                              <NavigationMenuLink className="flex items-center gap-2 select-none space-y-1 rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <Package className="h-4 w-4" />
                                <span>Orders</span>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                          <li>
                            <Link href="/account/prescriptions" legacyBehavior passHref>
                              <NavigationMenuLink className="flex items-center gap-2 select-none space-y-1 rounded-md p-2 text-sm leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                                <FileText className="h-4 w-4" />
                                <span>Prescriptions</span>
                              </NavigationMenuLink>
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Login</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Mobile floating action button */}
      <div className="fixed bottom-4 right-4 md:hidden z-50">
        <Button
          onClick={() => {
            const shopForMeBtn = document.querySelector('[data-shop-for-me="true"]') as HTMLButtonElement
            shopForMeBtn?.click()
          }}
          size="lg"
          className="h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
        >
          <Bot className="h-6 w-6" />
          <span className="sr-only">Shop For Me</span>
        </Button>
      </div>
    </>
  )
}

export default Header
