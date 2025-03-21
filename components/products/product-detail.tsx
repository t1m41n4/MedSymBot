"use client"

import { CardContent } from "@/components/ui/card"

import { Card } from "@/components/ui/card"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ShoppingCart, Heart, Share2, ChevronRight, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"

// Mock product data
const products = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 150,
    image: "/placeholder.svg?height=500&width=500",
    category: "Pain Relief",
    isPopular: true,
    isNew: false,
    description:
      "Effective pain relief for headaches, toothaches, and fever. Each tablet contains 500mg of paracetamol.",
    longDescription: `
      <p>Paracetamol 500mg tablets provide effective relief from pain and fever. It's suitable for various conditions including headaches, toothaches, backaches, period pain, and cold & flu symptoms.</p>
      
      <h4>Key Benefits:</h4>
      <ul>
        <li>Fast-acting pain relief</li>
        <li>Reduces fever</li>
        <li>Gentle on the stomach</li>
        <li>Non-drowsy formula</li>
      </ul>
      
      <h4>Dosage:</h4>
      <p>Adults and children over 12 years: 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.</p>
      
      <h4>Ingredients:</h4>
      <p>Each tablet contains 500mg Paracetamol. Also contains maize starch, potassium sorbate, purified talc, stearic acid, povidone, and sodium starch glycolate.</p>
    `,
    stock: 50,
    sku: "MED-PR-001",
    reviews: 24,
    rating: 4.5,
    relatedProducts: [2, 7, 10],
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    price: 200,
    image: "/placeholder.svg?height=500&width=500",
    category: "Pain Relief",
    isPopular: false,
    isNew: false,
    description:
      "Anti-inflammatory pain relief for muscle aches, back pain, and arthritis. Each tablet contains 400mg of ibuprofen.",
    longDescription: `
      <p>Ibuprofen 400mg tablets provide effective relief from pain, inflammation, and fever. It's particularly effective for conditions involving inflammation such as arthritis, sprains, and strains.</p>
      
      <h4>Key Benefits:</h4>
      <ul>
        <li>Reduces inflammation</li>
        <li>Relieves pain</li>
        <li>Reduces fever</li>
        <li>Works for up to 8 hours</li>
      </ul>
      
      <h4>Dosage:</h4>
      <p>Adults and children over 12 years: 1 tablet every 8 hours with food. Do not exceed 3 tablets in 24 hours.</p>
      
      <h4>Ingredients:</h4>
      <p>Each tablet contains 400mg Ibuprofen. Also contains microcrystalline cellulose, croscarmellose sodium, lactose monohydrate, silicon dioxide, and magnesium stearate.</p>
    `,
    stock: 35,
    sku: "MED-PR-002",
    reviews: 18,
    rating: 4.2,
    relatedProducts: [1, 7, 10],
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    price: 600,
    image: "/placeholder.svg?height=500&width=500",
    category: "Vitamins",
    isPopular: false,
    isNew: true,
    description:
      "High-strength vitamin C supplement to support immune function. Each tablet contains 1000mg of vitamin C.",
    longDescription: `
      <p>Vitamin C 1000mg tablets provide high-strength immune support. Vitamin C is an essential nutrient that helps maintain the body's defense systems and contributes to normal collagen formation.</p>
      
      <h4>Key Benefits:</h4>
      <ul>
        <li>Supports immune system function</li>
        <li>Contributes to collagen formation for skin health</li>
        <li>Powerful antioxidant protection</li>
        <li>Helps reduce tiredness and fatigue</li>
      </ul>
      
      <h4>Dosage:</h4>
      <p>Adults: 1 tablet daily with food.</p>
      
      <h4>Ingredients:</h4>
      <p>Each tablet contains 1000mg Vitamin C (Ascorbic Acid). Also contains microcrystalline cellulose, stearic acid, croscarmellose sodium, and silicon dioxide.</p>
    `,
    stock: 45,
    sku: "MED-VT-001",
    reviews: 32,
    rating: 4.8,
    relatedProducts: [7, 8, 11],
    images: [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500",
    ],
  },
  // Add more products as needed with similar structure
]

export default function ProductDetailPage({ id }: { id: number }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  // Find the product by ID
  const product = products.find((p) => p.id === id)

  // If product not found, show error
  if (!product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    )
  }

  // Find related products
  const relatedProductsData = product.relatedProducts
    .map((relatedId) => products.find((p) => p.id === relatedId))
    .filter(Boolean) as typeof products

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <div className="container mx-auto py-12 px-4">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-teal-600">
          Home
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href="/products" className="hover:text-teal-600">
          Products
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <Link href={`/categories/${product.category.toLowerCase().replace(" ", "-")}`} className="hover:text-teal-600">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="font-medium text-gray-900">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="aspect-square overflow-hidden rounded-lg border mb-4">
            <Image
              src={product.images[activeImage] || "/placeholder.svg"}
              alt={product.name}
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-square cursor-pointer rounded-md border overflow-hidden ${
                  activeImage === index ? "ring-2 ring-teal-600" : ""
                }`}
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-6">
            <div className="flex items-center mb-2">
              <span className="text-sm text-teal-600">{product.category}</span>
              {product.isNew && <Badge className="ml-2 bg-purple-600">New</Badge>}
              {product.isPopular && <Badge className="ml-2 bg-amber-500">Popular</Badge>}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : i < product.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">{product.reviews} reviews</span>
            </div>

            <p className="text-xl font-semibold text-gray-900 mb-4">Ksh {product.price.toFixed(2)}</p>

            <p className="text-gray-600 mb-6">{product.description}</p>

            <div className="flex items-center mb-6">
              <span className="text-sm font-medium text-gray-900 mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="px-4">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-3 w-3" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>

              <span className="ml-4 text-sm text-gray-500">
                {product.stock > 0 ? (
                  <>
                    <Check className="inline h-4 w-4 text-green-500 mr-1" />
                    In Stock
                  </>
                ) : (
                  "Out of Stock"
                )}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button className="flex-1" onClick={handleAddToCart} disabled={product.stock === 0}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>

              <Button variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>

            <div className="border-t pt-4">
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <span className="font-medium text-gray-900 mr-2">SKU:</span>
                {product.sku}
              </div>

              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium text-gray-900 mr-2">Share:</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                    <span className="sr-only">Share</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start border-b rounded-none">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="py-6">
            <div dangerouslySetInnerHTML={{ __html: product.longDescription }} />
          </TabsContent>

          <TabsContent value="details" className="py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">Product Information</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 font-medium">SKU</td>
                      <td className="py-2">{product.sku}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Category</td>
                      <td className="py-2">{product.category}</td>
                    </tr>
                    <tr className="border-b">
                      <td className="py-2 font-medium">Stock</td>
                      <td className="py-2">{product.stock} units</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Shipping Information</h3>
                <p className="mb-4">We offer fast and reliable shipping across Kenya.</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Free delivery on orders over Ksh 5,000</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Same-day delivery in Nairobi (for orders placed before 12 PM)</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                    <span>Next-day delivery to most other locations in Kenya</span>
                  </li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="py-6">
            <div className="text-center py-8">
              <p className="text-lg font-medium">Customer reviews coming soon!</p>
              <p className="text-gray-500 mt-2">We're working on implementing our review system.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProductsData.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProductsData.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="overflow-hidden">
                <div className="relative">
                  <Link href={`/products/${relatedProduct.id}`}>
                    <div className="aspect-square overflow-hidden">
                      <Image
                        src={relatedProduct.image || "/placeholder.svg"}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="h-full w-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  </Link>
                </div>
                <CardContent className="p-4">
                  <div className="text-sm text-teal-600 mb-1">{relatedProduct.category}</div>
                  <Link href={`/products/${relatedProduct.id}`}>
                    <h3 className="font-medium text-gray-900 hover:text-teal-600 transition-colors">
                      {relatedProduct.name}
                    </h3>
                  </Link>
                  <div className="mt-2 font-semibold">Ksh {relatedProduct.price.toFixed(2)}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

