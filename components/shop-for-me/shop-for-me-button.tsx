"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bot, X, Search, Loader2, ShoppingCart } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

// Mock product database for search functionality
const productDatabase = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    price: 150,
    category: "Pain Relief",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Ibuprofen 400mg",
    price: 200,
    category: "Pain Relief",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: 3, name: "Cetirizine 10mg", price: 180, category: "Allergy", image: "/placeholder.svg?height=200&width=200" },
  { id: 4, name: "Loratadine 10mg", price: 250, category: "Allergy", image: "/placeholder.svg?height=200&width=200" },
  {
    id: 5,
    name: "Amoxicillin 500mg",
    price: 350,
    category: "Antibiotics",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 6,
    name: "Digital Thermometer",
    price: 1200,
    category: "Devices",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 7,
    name: "Blood Pressure Monitor",
    price: 4500,
    category: "Devices",
    image: "/placeholder.svg?height=200&width=200",
  },
  { id: 8, name: "First Aid Kit", price: 1500, category: "First Aid", image: "/placeholder.svg?height=200&width=200" },
  { id: 9, name: "Vitamin C 1000mg", price: 600, category: "Vitamins", image: "/placeholder.svg?height=200&width=200" },
  {
    id: 10,
    name: "Multivitamin Complex",
    price: 800,
    category: "Vitamins",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 11,
    name: "Hand Sanitizer",
    price: 250,
    category: "Personal Care",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 12,
    name: "Face Masks (50 pack)",
    price: 750,
    category: "Personal Care",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function ShopForMeButton() {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof productDatabase>([])
  const [selectedProducts, setSelectedProducts] = useState<typeof productDatabase>([])

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsSearching(true)
    setSearchResults([])

    // Simulate search delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Search the product database
    const results = productDatabase.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )

    setSearchResults(results)
    setIsSearching(false)
  }

  const addProductToSelection = (product: (typeof productDatabase)[0]) => {
    setSelectedProducts((prev) => [...prev, product])

    // Remove from search results
    setSearchResults((prev) => prev.filter((p) => p.id !== product.id))

    toast({
      title: "Product Selected",
      description: `${product.name} has been added to your selection.`,
    })
  }

  const removeProductFromSelection = (productId: number) => {
    const productToRemove = selectedProducts.find((p) => p.id === productId)

    if (productToRemove) {
      setSelectedProducts((prev) => prev.filter((p) => p.id !== productId))

      // Add back to search results if it matches the current query
      if (
        productToRemove.name.toLowerCase().includes(query.toLowerCase()) ||
        productToRemove.category.toLowerCase().includes(query.toLowerCase())
      ) {
        setSearchResults((prev) => [...prev, productToRemove])
      }
    }
  }

  const addAllToCart = () => {
    selectedProducts.forEach((product) => {
      addToCart(product)
    })

    toast({
      title: "Products Added to Cart",
      description: `${selectedProducts.length} products have been added to your cart.`,
    })

    setSelectedProducts([])
    setIsOpen(false)
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        data-shop-for-me="true"
      >
        <Bot className="mr-2 h-4 w-4" />
        Shop For Me
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold flex items-center">
                <Bot className="mr-2 h-5 w-5 text-purple-600" />
                AI Shopping Assistant
              </h2>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>

            <div className="p-4 border-b">
              <p className="text-gray-600 mb-4">
                Tell me what you're looking for, and I'll find the right products for you. You can search for specific
                items or describe your symptoms.
              </p>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search for products or describe your needs..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch()
                      }
                    }}
                  />
                </div>
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>

              <div className="mt-2 flex flex-wrap gap-2">
                {["Headache", "Cold & Flu", "Allergies", "First Aid", "Vitamins"].map((suggestion) => (
                  <Button
                    key={suggestion}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setQuery(suggestion)
                      handleSearch()
                    }}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {isSearching ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-2" />
                  <p className="text-gray-500">Searching for products...</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div>
                  <h3 className="font-medium mb-3">Search Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {searchResults.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-lg p-3 flex items-center hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                          <p className="text-sm font-semibold mt-1">Ksh {product.price.toFixed(2)}</p>
                        </div>
                        <Button size="sm" variant="ghost" onClick={() => addProductToSelection(product)}>
                          Add
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : query && !isSearching ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No products found matching "{query}"</p>
                  <p className="text-sm text-gray-400 mt-1">Try a different search term or browse categories</p>
                </div>
              ) : null}

              {selectedProducts.length > 0 && (
                <div className={`${searchResults.length > 0 ? "mt-6" : ""}`}>
                  <h3 className="font-medium mb-3">Selected Products</h3>
                  <div className="space-y-3">
                    {selectedProducts.map((product) => (
                      <div
                        key={product.id}
                        className="border rounded-lg p-3 flex items-center bg-purple-50 border-purple-100"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.category}</p>
                          <p className="text-sm font-semibold mt-1">Ksh {product.price.toFixed(2)}</p>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeProductFromSelection(product.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t bg-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Selected Products: {selectedProducts.length}</p>
                  {selectedProducts.length > 0 && (
                    <p className="font-medium">
                      Total: Ksh {selectedProducts.reduce((sum, product) => sum + product.price, 0).toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>
                    Cancel
                  </Button>
                  <Button
                    onClick={addAllToCart}
                    disabled={selectedProducts.length === 0}
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

