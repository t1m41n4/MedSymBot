"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Phone, Mail, MapPin, Clock, Send, Loader2, Check } from "lucide-react"

const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  subject: z.string().min(2, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactFormSchema>

export default function ContactPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  })

  const onSubmit = (data: ContactFormValues) => {
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      })
      form.reset()
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Contact Us</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Phone className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Phone</h3>
                <p className="text-gray-600 mb-1">Customer Support:</p>
                <p className="text-gray-900">+254 700 123 456</p>
                <p className="text-gray-600 mb-1 mt-3">Prescription Services:</p>
                <p className="text-gray-900">+254 711 987 654</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Mail className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-gray-600 mb-1">General Inquiries:</p>
                <p className="text-gray-900">info@medexpress.com</p>
                <p className="text-gray-600 mb-1 mt-3">Customer Support:</p>
                <p className="text-gray-900">support@medexpress.com</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-start">
              <div className="rounded-full bg-teal-100 p-3 mr-4">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-bold mb-2">Business Hours</h3>
                <p className="text-gray-600 mb-1">Monday - Friday:</p>
                <p className="text-gray-900">8:00 AM - 8:00 PM</p>
                <p className="text-gray-600 mb-1 mt-3">Saturday - Sunday:</p>
                <p className="text-gray-900">9:00 AM - 5:00 PM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="john@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="+254 700 123 456" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="How can we help you?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Please provide details about your inquiry..."
                        className="min-h-[150px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Form>
        </div>

        {/* Location */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Location</h2>

          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="rounded-full bg-teal-100 p-3 mr-4">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Address</h3>
                  <p className="text-gray-600 mb-1">MedExpress Headquarters:</p>
                  <p className="text-gray-900">123 Health Street</p>
                  <p className="text-gray-900">Nairobi, Kenya</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-lg overflow-hidden h-[400px] bg-gray-200 mb-6">
            {/* Map placeholder - in a real implementation, this would be a Google Maps or similar embed */}
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-gray-500">Interactive Map</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-bold mb-4">Delivery Areas</h3>
            <p className="text-gray-600 mb-4">
              We deliver to all major cities and towns across Kenya, with same-day delivery available in:
            </p>
            <ul className="grid grid-cols-2 gap-2">
              <li className="flex items-center">
                <Check className="h-4 w-4 text-teal-600 mr-2" />
                <span>Nairobi</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-teal-600 mr-2" />
                <span>Mombasa</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-teal-600 mr-2" />
                <span>Kisumu</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-teal-600 mr-2" />
                <span>Nakuru</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-teal-600 mr-2" />
                <span>Eldoret</span>
              </li>
              <li className="flex items-center">
                <Check className="h-4 w-4 text-teal-600 mr-2" />
                <span>Thika</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

