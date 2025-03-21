"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, CreditCard, Phone, CheckCircle } from "lucide-react"

// Form schema for card payment
const cardFormSchema = z.object({
  cardNumber: z.string().min(16, "Card number must be at least 16 digits"),
  cardHolder: z.string().min(3, "Cardholder name is required"),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),
  cvv: z.string().min(3, "CVV must be at least 3 digits"),
})

// Form schema for M-Pesa payment
const mpesaFormSchema = z.object({
  phoneNumber: z.string().regex(/^(?:\+254|0)[17]\d{8}$/, "Enter a valid Kenyan phone number"),
})

// Form schema for PayPal (just email for this example)
const paypalFormSchema = z.object({
  email: z.string().email("Enter a valid email address"),
})

type CardFormValues = z.infer<typeof cardFormSchema>
type MpesaFormValues = z.infer<typeof mpesaFormSchema>
type PaypalFormValues = z.infer<typeof paypalFormSchema>

interface PaymentMethodsProps {
  amount: number
  onPaymentComplete: () => void
}

export default function PaymentMethods({ amount, onPaymentComplete }: PaymentMethodsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState<"card" | "mpesa" | "paypal">("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [mpesaStatus, setMpesaStatus] = useState<"pending" | "confirmed" | null>(null)

  // Card payment form
  const cardForm = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
    },
  })

  // M-Pesa payment form
  const mpesaForm = useForm<MpesaFormValues>({
    resolver: zodResolver(mpesaFormSchema),
    defaultValues: {
      phoneNumber: "",
    },
  })

  // PayPal payment form
  const paypalForm = useForm<PaypalFormValues>({
    resolver: zodResolver(paypalFormSchema),
    defaultValues: {
      email: "",
    },
  })

  // Handle card payment submission
  const onCardSubmit = (data: CardFormValues) => {
    setIsProcessing(true)

    // Simulate card payment processing
    setTimeout(() => {
      toast({
        title: "Payment Successful",
        description: "Your card payment has been processed successfully.",
      })
      setIsProcessing(false)
      onPaymentComplete()
    }, 2000)
  }

  // Handle M-Pesa payment submission
  const onMpesaSubmit = (data: MpesaFormValues) => {
    setIsProcessing(true)

    // Simulate M-Pesa STK push
    setTimeout(() => {
      toast({
        title: "M-Pesa Request Sent",
        description: "Please check your phone and enter your M-Pesa PIN to complete payment.",
      })
      setIsProcessing(false)
      setMpesaStatus("pending")

      // Simulate M-Pesa confirmation after some time
      setTimeout(() => {
        setMpesaStatus("confirmed")
        toast({
          title: "M-Pesa Payment Confirmed",
          description: "Your payment has been received. Thank you!",
        })
        onPaymentComplete()
      }, 5000)
    }, 2000)
  }

  // Handle PayPal payment submission
  const onPaypalSubmit = (data: PaypalFormValues) => {
    setIsProcessing(true)

    // Simulate PayPal redirect and payment
    setTimeout(() => {
      toast({
        title: "Redirecting to PayPal",
        description: "You will be redirected to PayPal to complete your payment.",
      })

      // Simulate successful return from PayPal
      setTimeout(() => {
        toast({
          title: "PayPal Payment Successful",
          description: "Your payment has been processed successfully.",
        })
        setIsProcessing(false)
        onPaymentComplete()
      }, 3000)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
        <RadioGroup
          defaultValue="card"
          value={paymentMethod}
          onValueChange={(value) => setPaymentMethod(value as "card" | "mpesa" | "paypal")}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem value="card" id="card" className="peer sr-only" />
            <label
              htmlFor="card"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <CreditCard className="mb-3 h-6 w-6" />
              <span className="text-sm font-medium">Card Payment</span>
            </label>
          </div>

          <div>
            <RadioGroupItem value="mpesa" id="mpesa" className="peer sr-only" />
            <label
              htmlFor="mpesa"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Phone className="mb-3 h-6 w-6" />
              <span className="text-sm font-medium">M-Pesa</span>
            </label>
          </div>

          <div>
            <RadioGroupItem value="paypal" id="paypal" className="peer sr-only" />
            <label
              htmlFor="paypal"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <div className="mb-3 h-6 w-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 11l5-7" />
                  <path d="M21 11V6a2 2 0 0 0-2-2h-4l-5 7" />
                  <path d="M3 7v5a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                  <path d="M18 22H6a2 2 0 0 1-2-2v-3" />
                </svg>
              </div>
              <span className="text-sm font-medium">PayPal</span>
            </label>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t pt-6">
        {paymentMethod === "card" && (
          <Form {...cardForm}>
            <form onSubmit={cardForm.handleSubmit(onCardSubmit)} className="space-y-4">
              <FormField
                control={cardForm.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="1234 5678 9012 3456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={cardForm.control}
                name="cardHolder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cardholder Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={cardForm.control}
                  name="expiryDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expiry Date</FormLabel>
                      <FormControl>
                        <Input placeholder="MM/YY" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={cardForm.control}
                  name="cvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CVV</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="123" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4">
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    `Pay Ksh ${amount.toFixed(2)}`
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}

        {paymentMethod === "mpesa" && (
          <>
            {mpesaStatus === "confirmed" ? (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="rounded-full bg-green-100 p-3 mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-medium mb-2">Payment Confirmed</h3>
                <p className="text-gray-500 mb-6">Your M-Pesa payment has been received. Thank you!</p>
              </div>
            ) : mpesaStatus === "pending" ? (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium flex items-center">
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Waiting for M-Pesa confirmation
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Please enter your M-Pesa PIN on your phone to complete the payment.
                </p>
              </div>
            ) : (
              <Form {...mpesaForm}>
                <form onSubmit={mpesaForm.handleSubmit(onMpesaSubmit)} className="space-y-4">
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Image src="/placeholder.svg?height=60&width=120" alt="M-Pesa Logo" width={120} height={60} />
                    </div>
                  </div>

                  <FormField
                    control={mpesaForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>M-Pesa Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 0712345678" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button type="submit" className="w-full" disabled={isProcessing}>
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending M-Pesa Request...
                        </>
                      ) : (
                        `Pay Ksh ${amount.toFixed(2)} via M-Pesa`
                      )}
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center mt-2">
                    You will receive an M-Pesa prompt on your phone to complete the payment.
                  </p>
                </form>
              </Form>
            )}
          </>
        )}

        {paymentMethod === "paypal" && (
          <Form {...paypalForm}>
            <form onSubmit={paypalForm.handleSubmit(onPaypalSubmit)} className="space-y-4">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <Image src="/placeholder.svg?height=60&width=120" alt="PayPal Logo" width={120} height={60} />
                </div>
              </div>

              <FormField
                control={paypalForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PayPal Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your-email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button type="submit" className="w-full bg-[#0070ba] hover:bg-[#005ea6]" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Connecting to PayPal...
                    </>
                  ) : (
                    `Pay Ksh ${amount.toFixed(2)} with PayPal`
                  )}
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
    </div>
  )
}

