"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Heart, Search, Filter, FileText } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Mock product data
const allProducts = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 150,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pain Relief",
    isPopular: true,
    isNew: false,
    description:
      "Effective pain relief for headaches, toothaches, and fever. Each tablet contains 500mg of paracetamol.",
    stock: 50,
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    price: 200,
    image: "/placeholder.svg?height=200&width=200",
    category: "Pain Relief",
    isPopular: false,
    isNew: false,
    description:
      "Anti-inflammatory pain relief for muscle aches, back pain, and arthritis. Each tablet contains 400mg of ibuprofen.",
    stock: 35,
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 600,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vitamins",
    isPopular: false,
    isNew: true,
    description:
      "High-strength vitamin C supplement to support immune function. Each tablet contains 1000mg of vitamin C.",
    stock: 45,
  },
  {
    id: 4,
    name: "Digital Thermometer",
    price: 1200,
    image: "/placeholder.svg?height=200&width=200",
    category: "Devices",
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
    isPopular: false,
    isNew: true,
    description: "Automatic blood pressure monitor with memory function. Easy to use at home for regular monitoring.",
    stock: 15,
  },
  {
    id: 6,
    name: "First Aid Kit",
    price: 1500,
    image: "/placeholder.svg?height=200&width=200",
    category: "First Aid",
    isPopular: false,
    isNew: false,
    description:
      "Comprehensive first aid kit containing bandages, antiseptic wipes, scissors, and more. Essential for every home.",
    stock: 25,
  },
  {
    id: 7,
    name: "Multivitamin Complex",
    price: 800,
    image: "/placeholder.svg?height=200&width=200",
    category: "Vitamins",
    isPopular: true,
    isNew: false,
    description: "Complete multivitamin and mineral supplement for daily use. Supports overall health and wellbeing.",
    stock: 40,
  },
  {
    id: 8,
    name: "Hand Sanitizer",
    price: 250,
    image: "/placeholder.svg?height=200&width=200",
    category: "Personal Care",
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
    isPopular: false,
    isNew: false,
    description: "Disposable 3-ply face masks for everyday protection. Pack of 50 masks.",
    stock: 30,
  },
  {
    id: 10,
    name: "Cetirizine 10mg",
    price: 180,
    image: "/placeholder.svg?height=200&width=200",
    category: "Allergy",
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
    isPopular: false,
    isNew: false,
    description: "Prescription antibiotic for bacterial infections. Each capsule contains 500mg of amoxicillin.",
    stock: 25,
    prescription: true,
  },
]

const categories = [
  "All Categories",
  "Pain Relief",
  "Vitamins",
  "Devices",
  "First Aid",
  "Personal Care",
  "Allergy",
  "Antibiotics",
]

export default function ProductsPage() {
  const { addToCart } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [priceRange, setPriceRange] = useState([0, 5000])
  const [sortBy, setSortBy] = useState("featured")
  const [inStockOnly, setInStockOnly] = useState(false)
  const [newOnly, setNewOnly] = useState(false)

  // Filter products based on search, category, price range, etc.
  const filteredProducts = allProducts.filter((product) => {
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Category filter
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory

    // Price filter
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]

    // Stock filter
    const matchesStock = !inStockOnly || product.stock > 0

    // New only filter
    const matchesNew = !newOnly || product.isNew

    return matchesSearch && matchesCategory && matchesPrice && matchesStock && matchesNew
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    if (sortBy === "name-asc") return a.name.localeCompare(b.name)
    if (sortBy === "name-desc") return b.name.localeCompare(a.name)
    // Default: featured (no specific sort)
    return 0
  })

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Products</h1>

      {/* Search and filter bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex gap-2">
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

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-4 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center">
                        <Checkbox
                          id={`category-${category}`}
                          checked={selectedCategory === category}
                          onCheckedChange={() => setSelectedCategory(category)}
                        />
                        <label
                          htmlFor={`category-${category}`}
                          className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 5000]}
                      max={5000}
                      step={100}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between mt-2 text-sm">
                      <span>Ksh {priceRange[0]}</span>
                      <span>Ksh {priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox
                      id="in-stock"
                      checked={inStockOnly}
                      onCheckedChange={(checked) => setInStockOnly(checked as boolean)}
                    />
                    <label htmlFor="in-stock" className="ml-2 text-sm font-medium leading-none">
                      In Stock Only
                    </label>
                  </div>

                  <div className="flex items-center">
                    <Checkbox
                      id="new-only"
                      checked={newOnly}
                      onCheckedChange={(checked) => setNewOnly(checked as boolean)}
                    />
                    <label htmlFor="new-only" className="ml-2 text-sm font-medium leading-none">
                      New Products Only
                    </label>
                  </div>
                </div>

                <Button
                  className="w-full"
                  onClick={() => {
                    setSelectedCategory("All Categories")
                    setPriceRange([0, 5000])
                    setInStockOnly(false)
                    setNewOnly(false)
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Results count */}
      <p className="text-gray-500 mb-6">Showing {sortedProducts.length} products</p>

      {/* Products grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg font-medium">No products found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
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
                  {product.prescription ? (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Requires Prescription
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

