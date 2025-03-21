"use client"

import Image from "next/image"
import { useCart } from "@/context/cart-context"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function OrderSummary() {
  const { cartItems, getCartTotal } = useCart()
  const shippingCost = cartItems.length > 0 ? 250 : 0
  const tax = getCartTotal() * 0.16 // 16% VAT
  const total = getCartTotal() + shippingCost + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Your cart is empty</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="h-16 w-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-gray-500 text-xs">Qty: {item.quantity || 1}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">Ksh {item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span>Ksh {getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Shipping</span>
              <span>Ksh {shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Tax (16% VAT)</span>
              <span>Ksh {tax.toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>Ksh {total.toFixed(2)}</span>
          </div>

          {total > 5000 && (
            <div className="bg-green-50 text-green-700 text-sm p-3 rounded-md mt-4">
              Free shipping on orders over Ksh 5,000 will be applied at checkout.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

