import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Truck, ShieldCheck, HeartHandshake, Users, Award, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl mb-16">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-500/90 to-emerald-600/90" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">About MedExpress</h1>
          <p className="mt-6 max-w-2xl text-xl text-white">
            Your trusted online pharmacy, delivering quality healthcare products and medications across Kenya.
          </p>
        </div>
      </div>

      {/* Our Story */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2018, MedExpress was born out of a simple yet powerful vision: to make quality healthcare
            accessible to all Kenyans. We recognized the challenges many people faced in accessing medications and
            healthcare products, especially those in remote areas or with mobility constraints.
          </p>
          <p className="text-gray-600 mb-4">
            What began as a small operation in Nairobi has grown into Kenya's leading online pharmacy, serving thousands
            of customers nationwide. Our journey has been driven by a commitment to excellence, reliability, and
            customer care.
          </p>
          <p className="text-gray-600">
            Today, MedExpress continues to innovate and expand, leveraging technology to improve healthcare access while
            maintaining the personal touch that has defined our service from day one.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=600"
            alt="MedExpress Team"
            width={600}
            height={400}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Our Mission & Values */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At MedExpress, we're guided by a clear mission and strong values that shape everything we do.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <HeartHandshake className="mr-2 h-6 w-6 text-teal-600" />
                Our Mission
              </h3>
              <p className="text-gray-600">
                To improve healthcare access across Kenya by providing a reliable, convenient, and affordable way for
                people to get the medications and health products they need, when they need them.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <span>Make quality healthcare accessible to all</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <span>Provide authentic medications at fair prices</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-teal-600 mr-2 mt-0.5" />
                  <span>Deliver healthcare products with speed and reliability</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="mr-2 h-6 w-6 text-teal-600" />
                Our Values
              </h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-medium">Integrity</p>
                  <p className="text-gray-600">
                    We maintain the highest ethical standards in all our operations, ensuring all products are authentic
                    and properly sourced.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Customer-Centric</p>
                  <p className="text-gray-600">
                    Our customers' health and satisfaction are at the center of everything we do.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Innovation</p>
                  <p className="text-gray-600">
                    We continuously seek new ways to improve our services and make healthcare more accessible.
                  </p>
                </li>
                <li>
                  <p className="font-medium">Community</p>
                  <p className="text-gray-600">
                    We're committed to making a positive impact in the communities we serve.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose MedExpress</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We strive to provide the best possible service and experience for our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                <ShieldCheck className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-bold mb-2">100% Authentic</h3>
              <p className="text-gray-600">
                All our products are sourced from licensed manufacturers and distributors, ensuring authenticity and
                quality.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                <Truck className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Same-day delivery in Nairobi and next-day delivery to most other locations across Kenya.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-bold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of licensed pharmacists is available to answer your questions and provide guidance.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                <Clock className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-bold mb-2">24/7 Service</h3>
              <p className="text-gray-600">
                Order anytime, day or night. Our website is always open, and our customer service team is always
                available.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Our Team */}
      <div className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals behind MedExpress who work tirelessly to ensure you receive the best
            service.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Dr. Sarah Kimani",
              role: "Chief Pharmacist",
              image: "/placeholder.svg?height=300&width=300",
              bio: "With over 15 years of experience in pharmaceutical care, Dr. Kimani leads our team of pharmacists and ensures all operations meet the highest standards.",
            },
            {
              name: "John Mwangi",
              role: "Operations Director",
              image: "/placeholder.svg?height=300&width=300",
              bio: "John oversees our logistics and delivery operations, ensuring that your medications reach you quickly and safely.",
            },
            {
              name: "Elizabeth Ochieng",
              role: "Customer Care Manager",
              image: "/placeholder.svg?height=300&width=300",
              bio: "Elizabeth leads our customer support team, dedicated to providing exceptional service and addressing all your healthcare needs.",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4">
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="text-teal-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Experience the MedExpress Difference</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Join thousands of satisfied customers who trust MedExpress for their healthcare needs. Start shopping today
          and discover why we're Kenya's leading online pharmacy.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/products">Shop Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

