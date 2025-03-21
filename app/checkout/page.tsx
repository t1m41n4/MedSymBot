"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useCart } from "@/context/cart-context"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PaymentMethods from "@/components/checkout/payment-methods"
import ShippingForm from "@/components/checkout/shipping-form"
import OrderSummary from "@/components/checkout/order-summary"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("shipping")
  const [shippingInfo, setShippingInfo] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  })

  // Redirect to cart if cart is empty
  if (cartItems.length === 0) {
    router.push("/cart")
    return null
  }

  // Redirect to login if user is not authenticated
  if (!user) {
    router.push("/login?redirect=/checkout")
    return null
  }

  const handleShippingSubmit = (data: typeof shippingInfo) => {
    setShippingInfo(data)
    setActiveTab("payment")
  }

  const handlePaymentComplete = () => {
    // Clear cart and redirect to success page
    setTimeout(() => {
      clearCart()
      router.push("/checkout/success")
    }, 1000)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="mb-8">
        <Link href="/cart" className="flex items-center text-teal-600 hover:text-teal-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="shipping" disabled={activeTab === "payment"}>
                    <div className="flex items-center">
                      <span className="mr-2">1. Shipping</span>
                      {activeTab === "payment" && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                  </TabsTrigger>
                  <TabsTrigger value="payment" disabled={activeTab === "shipping"}>
                    2. Payment
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="shipping" className="pt-6">
                  <ShippingForm onSubmit={handleShippingSubmit} />
                </TabsContent>

                <TabsContent value="payment" className="pt-6">
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Shipping to:</h3>
                    <div className="text-sm text-gray-600">
                      <p>{shippingInfo.fullName}</p>
                      <p>{shippingInfo.address}</p>
                      <p>
                        {shippingInfo.city}, {shippingInfo.state} {shippingInfo.postalCode}
                      </p>
                      <p>{shippingInfo.country}</p>
                      <p>{shippingInfo.phone}</p>
                    </div>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-teal-600"
                      onClick={() => setActiveTab("shipping")}
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="border-t pt-6">
                    <PaymentMethods amount={getCartTotal()} onPaymentComplete={handlePaymentComplete} />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

