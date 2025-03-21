"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ShoppingBag } from "lucide-react"

export default function CheckoutSuccessPage() {
  const router = useRouter()
  const { clearCart } = useCart()

  // Clear the cart when the success page is loaded
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container mx-auto py-16 px-4 flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <CardTitle className="text-2xl">Order Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">Thank you for your purchase. Your order has been received and is being processed.</p>
          <p className="text-sm text-gray-500 mb-2">Order #: ORD-{Math.floor(100000 + Math.random() * 900000)}</p>
          <p className="text-sm text-gray-500">A confirmation email has been sent to your registered email address.</p>
          <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-100">
            <p className="text-sm text-green-800">
              Your payment has been confirmed and your order will be shipped within 24 hours.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button asChild className="w-full">
            <Link href="/account/orders">View Order</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/products">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

