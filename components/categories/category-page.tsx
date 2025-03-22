"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Search, ChevronRight } from "lucide-react"
import { useCart } from "@/context/cart-context"

// Mock product data by category
const productsByCategory = {
  "medications": [
    {
      id: 1,
      name: "Paracetamol 500mg",
      price: 150,
      image: "/placeholder.svg?height=200&width=200",
      category: "Pain Relief",
      subcategory: "Medications",
      isPopular: true,
      isNew: false,
      description: "Effective pain relief for headaches, toothaches, and fever. Each tablet contains 500mg of paracetamol.",
      stock: 50,
    },
    {
      id: 2,
      name: "Ibuprofen 400mg",
      price: 200,
      image: "/placeholder.svg?height=200&width=200",
      category: "Pain Relief",
      subcategory: "Medications",
      isPopular: false,
      isNew: false,
      description: "Anti-inflammatory pain relief for muscle aches, back pain, and arthritis. Each tablet contains 400mg of ibuprofen.",
      stock: 35,
    },
    {
      id: 10,
      name: "Cetirizine 10mg",
      price: 180,
      image: "/placeholder.svg?height=200&width=200",
      category: "Allergy",
      subcategory: "Medications",
      isPopular: false,
      isNew: false,
      description: "Non-drowsy antihistamine for allergy relief. Each tablet contains 10mg of cetirizine.",
      stock: 55,
    },
    {
      id: 11,
      name: "Loratadine 10mg",
      price: 250,
      image: "/placeholder.svg?height=200&width=200",
      category: "Allergy",
      subcategory: "Medications",
      isPopular: false,
      isNew: true,
      description: "24-hour allergy relief medication. Each tablet contains 10mg of loratadine.",
      stock: 45,
    },
    {
      id: 12,
      name: "Amoxicillin 500mg",
      price: 350,
      image: "/placeholder.svg?height=200&width=200",
      category: "Antibiotics",
      subcategory: "Medications",
      isPopular: false,
      isNew: false,
      description: "Prescription antibiotic for bacterial infections. Each capsule contains 500mg of amoxicillin.",
      stock: 25,
      prescription: true,
    },
  ],
  "devices": [
    {
      id: 4,
      name: "Digital Thermometer",
      price: 1200,
      image: "/placeholder.svg?height=200&width=200",
      category: "Devices",
      subcategory: "Health Devices",
      isPopular: true,
      isNew: false,
      description: "Fast and accurate digital thermometer with LCD display. Suitable for oral, rectal, or underarm use.",
      stock: 20,
    },
    {
      id: 5,
      name: "Blood Pressure Monitor",
      price: 4500,
      image: "/placeholder.svg?height=200&width=200",
      category: "Devices",
      subcategory: "Health Devices",
      isPopular: false,
      isNew: true,
      description: "Automatic blood pressure monitor with memory function. Easy to use at home for regular monitoring.",
      stock: 15,
    },
  ],
  "wellness": [
    {
      id: 3,
      name: "Vitamin C 1000mg",
      price: 600,
      image: "/placeholder.svg?height=200&width=200",
      category: "Vitamins",
      subcategory: "Wellness",
      isPopular: false,
      isNew: true,
      description: "High-strength vitamin C supplement to support immune function. Each tablet contains 1000mg of vitamin C.",
      stock: 45,
    },
    {
      id: 7,
      name: "Multivitamin Complex",
      price: 800,
      image: "/placeholder.svg?height=200&width=200",
      category: "Vitamins",
      subcategory: "Wellness",
      isPopular: true,
      isNew: false,
      description: "Complete multivitamin and mineral supplement for daily use. Supports overall health and wellbeing.",
      stock: 40,
    },
  ],
  "first-aid": [
    {
      id: 6,
      name: "First Aid Kit",
      price: 1500,
      image: "/placeholder.svg?height=200&width=200",
      category: "First Aid",
      subcategory: "First Aid",
      isPopular: false,
      isNew: false,
      description: "Comprehensive first aid kit containing bandages, antiseptic wipes, scissors, and more. Essential for every home.",
      stock: 25,
    },
  ],
  "personal-care": [
    {
      id: 8,
      name: "Hand Sanitizer",
      price: 250,
      image: "/placeholder.svg?height=200&width=200",
      category: "Personal Care",
      subcategory: "Personal Care",
      isPopular: true,
      isNew: false,
      description: "Alcohol-based hand sanitizer that kills 99.9% of germs. Convenient size for on-the-go use.",
      stock: 60,
    },
    {
      id: 9,
      name: "Face Masks (50 pack)",
      price: 750,
      image: "/placeholder.svg?height=200&width=200",
      category: "Personal Care",
      subcategory: "Personal Care",
      isPopular: false,
      isNew: false,
      description: "Disposable 3-ply face masks for everyday protection. Pack of 50 masks.",
      stock: 30,
    },
  ],
  "baby-care": [
    {
      id: 13,
      name: "Baby Formula",
      price: 1200,
      image: "/placeholder.svg?height=200&width=200",
      category: "Baby Care",
      subcategory: "Baby Care",
      isPopular: true,
      isNew: false,
      description: "Nutritionally complete infant formula for babies from birth to 12 months.",
      stock: 20,
    },
    {
      id: 14,
      name: "Baby Thermometer",
      price: 1500,
      image: "/placeholder.svg?height=200&width=200",
      category: "Baby Care",
      subcategory: "Baby Care",
      isPopular: false,
      isNew: true,
      description: "Gentle and accurate digital thermometer specially designed for babies and infants.",
      stock: 15,
    },
  ],
}

// Helper function to format category name for display
const formatCategoryName = (slug: string) => {
  const formatted = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  return formatted
}

export default function CategoryPage({ category }: { category: string }) {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("featured")

  // Get products for this category
  const products = productsByCategory[category as keyof typeof productsByCategory] || []

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "name-asc") return a.name.localeCompare(b.name)
    if (sortBy === "name-desc") return b.name.localeCompare(a.name)
    // Default: featured (no specific sort)
    return 0
  })

  const categoryName = formatCategoryName(category)

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-teal-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/categories" className="hover:text-teal-600">
          Categories
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium text-gray-900">{categoryName}</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

      {/* Search and sort bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder={`Search in ${categoryName}...`}
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Results count */}
      <p className="text-gray-500 mb-6">Showing {sortedProducts.length} products</p>

      {/* Products grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or browse other categories</p>
          <Button asChild className="mt-4">
            <Link href="/categories">View All Categories</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
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
                  {product.prescription && <Badge className="bg-blue-600">Prescription</Badge>}
                </div>
              </div>
              <CardContent className="p-4">
                <div className="text-sm text-teal-600 mb-1">{product.category}</div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-medium text-gray-900 hover:text-teal-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                <div className="mt-2 font-semibold">Ksh {product.price.toFixed(2)}</div>
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-xs text-amber-600 mt-1">Only {product.stock} left in stock</p>
                )}
                {product.stock === 0 && <p className="text-xs text-red-600 mt-1">Out of stock</p>}
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button
                  className="w-full"
                  onClick={() => addToCart(product)}
                  disabled={product.stock === 0 || product.prescription}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

