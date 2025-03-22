"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, ArrowRight, Info, AlertTriangle } from "lucide-react"
import PrescriptionUploadForm from "@/components/account/prescription-upload-form"

export default function PrescriptionsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("info")

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Prescription Services</h1>

      <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start mb-8">
          <TabsTrigger value="info">How It Works</TabsTrigger>
          <TabsTrigger value="upload">Upload Prescription</TabsTrigger>
          <TabsTrigger value="faq">FAQs</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <h2 className="text-2xl font-bold mb-4">Easy Prescription Fulfillment</h2>
              <p className="text-gray-600 mb-6">
                At AfyaGo, we make it easy to get your prescription medications delivered right to your doorstep.
                Our secure and convenient prescription service ensures you never run out of your essential medications.
              </p>

              <div className="space-y-6">
                <div className="flex">
                  <div className="rounded-full bg-teal-100 h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-teal-600">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Upload Your Prescription</h3>
                    <p className="text-gray-600">
                      Take a clear photo or scan of your prescription and upload it through our secure platform.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="rounded-full bg-teal-100 h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-teal-600">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Verification by Our Pharmacists</h3>
                    <p className="text-gray-600">
                      Our licensed pharmacists will verify your prescription and prepare your medications.
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="rounded-full bg-teal-100 h-8 w-8 flex items-center justify-center mr-4 flex-shrink-0">
                    <span className="font-bold text-teal-600">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Delivery to Your Door</h3>
                    <p className="text-gray-600">
                      We'll deliver your medications directly to your home or office, with discreet packaging.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-8" onClick={() => setActiveTab("upload")}>
                Upload Prescription
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>

            <div className="rounded-lg overflow-hidden">
              <img src="/placeholder.svg?height=400&width=600" alt="Prescription Service" className="w-full h-auto" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                  <FileText className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-bold mb-2">Valid Prescriptions</h3>
                <p className="text-gray-600">
                  We accept prescriptions from licensed doctors and healthcare providers in Kenya. Prescriptions must be
                  clear, recent, and contain all required information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                  <Info className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-bold mb-2">Prescription Privacy</h3>
                <p className="text-gray-600">
                  Your prescription information is kept strictly confidential. We use secure encryption to protect your
                  personal and medical information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="rounded-full bg-teal-100 p-3 inline-flex mb-4">
                  <AlertTriangle className="h-6 w-6 text-teal-600" />
                </div>
                <h3 className="font-bold mb-2">Important Notice</h3>
                <p className="text-gray-600">
                  Some medications may require additional verification. Controlled substances may have restrictions on
                  delivery and refills as per Kenyan regulations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-6">
              Upload your prescription now and get your medications delivered to your doorstep. It's quick, easy, and
              secure.
            </p>
            <Button size="lg" onClick={() => setActiveTab("upload")}>
              Upload Prescription
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="upload">
          {user ? (
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Prescription</CardTitle>
                <CardDescription>Upload a clear photo or scan of your prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionUploadForm />
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">Login Required</h3>
                <p className="text-gray-500 mb-6">You need to be logged in to upload and manage your prescriptions.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/login?tab=register">Create Account</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="faq">
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="text-xl font-bold mb-2">What types of prescriptions do you accept?</h3>
              <p className="text-gray-600">
                We accept valid prescriptions from licensed doctors, dentists, and other healthcare providers in Kenya.
                The prescription must be clear, recent (within the last 6 months for most medications), and contain all
                required information including patient details, medication name, dosage, and doctor's signature.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How do I upload my prescription?</h3>
              <p className="text-gray-600">
                You can upload your prescription by taking a clear photo or scanning it, then uploading the image
                through our website. Make sure all details are clearly visible in the image. You'll need to create an
                account or log in first.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How long does it take to process a prescription?</h3>
              <p className="text-gray-600">
                Most prescriptions are processed within 24 hours. Once verified by our pharmacists, we'll prepare your
                medications and arrange for delivery. You'll receive updates via email or SMS at each stage of the
                process.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Can I get refills on my prescription?</h3>
              <p className="text-gray-600">
                Yes, if your prescription includes refills, we can process them for you. You can request refills through
                your account dashboard. For some medications, especially controlled substances, additional verification
                may be required for refills.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">How are prescription medications delivered?</h3>
              <p className="text-gray-600">
                Prescription medications are delivered in discreet, secure packaging to protect your privacy. We offer
                same-day delivery in Nairobi and next-day delivery to most other locations in Kenya.
                Temperature-sensitive medications are transported in special packaging to maintain their efficacy.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">Is my prescription information kept confidential?</h3>
              <p className="text-gray-600">
                Absolutely. We take your privacy very seriously. All prescription information is encrypted and stored
                securely. We comply with all relevant privacy laws and regulations. Your medical information is never
                shared with third parties without your consent, except as required by law.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">What if my prescription medication is out of stock?</h3>
              <p className="text-gray-600">
                If a medication is temporarily out of stock, we'll contact you promptly to discuss alternatives. This
                may include sourcing the medication from another supplier, suggesting a generic equivalent (with your
                doctor's approval), or providing an estimated timeframe for when the medication will be available.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

