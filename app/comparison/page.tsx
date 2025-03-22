"use client"

import { useComparison } from "@/context/comparison-context"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/context/cart-context"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function ComparisonPage() {
  const { comparisonList, removeFromComparison, clearComparison } = useComparison()
  const { addToCart } = useCart()

  if (comparisonList.length === 0) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">No Products to Compare</h1>
        <p className="mb-6">Add products to comparison to see their features side by side.</p>
        <Button asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Product Comparison</h1>
        <Button variant="outline" onClick={clearComparison}>Clear All</Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left p-4 border bg-gray-50">Feature</th>
              {comparisonList.map((product) => (
                <th key={product.id} className="p-4 border bg-gray-50 min-w-[250px]">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute -top-2 -right-2"
                      onClick={() => removeFromComparison(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="mx-auto mb-4"
                    />
                    <h3 className="font-medium text-lg mb-2">{product.name}</h3>
                    <p className="text-teal-600 text-sm mb-2">{product.category}</p>
                    <p className="font-semibold mb-4">Ksh {product.price.toFixed(2)}</p>
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-4 border font-medium">Description</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">{product.description}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">Stock Status</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">
                  {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">Rating</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">
                  {product.rating} / 5 ({product.reviews} reviews)
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">SKU</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">{product.sku}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">Dosage Form</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">{product.dosageForm || '-'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">Strength</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">{product.strength || '-'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">Storage</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">{product.storageConditions || '-'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-4 border font-medium">Manufacturer</td>
              {comparisonList.map((product) => (
                <td key={product.id} className="p-4 border">{product.manufacturer || '-'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Lowest: Ksh {Math.min(...comparisonList.map(p => p.price))}</p>
              <p>Highest: Ksh {Math.max(...comparisonList.map(p => p.price))}</p>
              <p>Average: Ksh {(comparisonList.reduce((acc, p) => acc + p.price, 0) / comparisonList.length).toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Rating Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Best Rated: {comparisonList.reduce((best, p) => p.rating > best.rating ? p : best).name}</p>
              <p>Most Reviews: {comparisonList.reduce((most, p) => p.reviews > most.reviews ? p : most).name}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Availability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>{comparisonList.filter(p => p.stock > 0).length} of {comparisonList.length} in stock</p>
              <p>{comparisonList.filter(p => p.prescription).length} require prescription</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
