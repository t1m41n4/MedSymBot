"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/cart-context"

// Mock data for featured products
const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pain Relief",
    isPopular: true,
    isNew: false,
  },
  {
    id: 2,
    name: "Vitamin C 1000mg",
    price: 600,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vitamins",
    isPopular: false,
    isNew: true,
  },
  {
    id: 3,
    name: "Digital Thermometer",
    price: 1200,
    image: "/placeholder.svg?height=200&width=200",
    category: "Devices",
    isPopular: true,
    isNew: false,
  },
  {
    id: 4,
    name: "First Aid Kit",
    price: 1500,
    image: "/placeholder.svg?height=200&width=200",
    category: "First Aid",
    isPopular: false,
    isNew: false,
  },
]

const FeaturedProducts = () => {
  const { addToCart } = useCart()

  return (
    <section className="py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <p className="mt-2 text-lg text-gray-600">Top-selling healthcare products for your needs</p>
        </div>
        <Link href="/products">
          <Button variant="outline">View All Products</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <div className="relative">
              <Link href={`/products/${product.id}`}>
                <div className="aspect-square overflow-hidden">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <Button variant="ghost" size="icon" className="absolute right-2 top-2 bg-white/80 hover:bg-white">
                <Heart className="h-5 w-5 text-gray-500 hover:text-red-500" />
                <span className="sr-only">Add to wishlist</span>
              </Button>
              <div className="absolute left-2 top-2 flex flex-col gap-1">
                {product.isNew && <Badge className="bg-purple-600">New</Badge>}
                {product.isPopular && <Badge className="bg-amber-500">Popular</Badge>}
              </div>
            </div>
            <CardContent className="p-4">
              <div className="text-sm text-teal-600 mb-1">{product.category}</div>
              <Link href={`/products/${product.id}`}>
                <h3 className="font-medium text-gray-900 hover:text-teal-600 transition-colors">{product.name}</h3>
              </Link>
              <div className="mt-2 font-semibold">Ksh {product.price.toFixed(2)}</div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full" onClick={() => addToCart(product)}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default FeaturedProducts

