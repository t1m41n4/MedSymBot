"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/auth-context"
import AccountLayout from "@/components/account/account-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, Eye } from "lucide-react"
import PrescriptionUploadForm from "@/components/account/prescription-upload-form"

export default function PrescriptionsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("active")

  if (!user) {
    router.push("/login")
    return null
  }

  // Mock prescription data
  const prescriptions = [
    {
      id: "rx-123456",
      date: "2023-12-15",
      doctor: "Dr. Sarah Kimani",
      status: "active",
      medications: [
        { name: "Amoxicillin 500mg", refills: 2, remaining: 1 },
        { name: "Paracetamol 500mg", refills: 3, remaining: 3 },
      ],
      expiryDate: "2024-06-15",
    },
    {
      id: "rx-789012",
      date: "2023-11-20",
      doctor: "Dr. John Mwangi",
      status: "active",
      medications: [{ name: "Metformin 850mg", refills: 5, remaining: 3 }],
      expiryDate: "2024-05-20",
    },
    {
      id: "rx-345678",
      date: "2023-09-05",
      doctor: "Dr. Elizabeth Ochieng",
      status: "expired",
      medications: [
        { name: "Lisinopril 10mg", refills: 3, remaining: 0 },
        { name: "Atorvastatin 20mg", refills: 3, remaining: 0 },
      ],
      expiryDate: "2024-03-05",
    },
  ]

  const activePrescriptions = prescriptions.filter((p) => p.status === "active")
  const expiredPrescriptions = prescriptions.filter((p) => p.status === "expired")

  return (
    <AccountLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Prescriptions</h1>
          <Button onClick={() => router.push("/account/prescriptions/upload")}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Prescription
          </Button>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="active">Active Prescriptions ({activePrescriptions.length})</TabsTrigger>
            <TabsTrigger value="expired">Expired Prescriptions ({expiredPrescriptions.length})</TabsTrigger>
            <TabsTrigger value="upload">Upload New</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="pt-6">
            {activePrescriptions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg font-medium mb-2">No Active Prescriptions</p>
                  <p className="text-gray-500 mb-6 text-center">
                    You don't have any active prescriptions at the moment.
                  </p>
                  <Button onClick={() => setActiveTab("upload")}>Upload a Prescription</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {activePrescriptions.map((prescription) => (
                  <Card key={prescription.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Prescription #{prescription.id}</CardTitle>
                          <CardDescription>
                            Prescribed by {prescription.doctor} on {prescription.date}
                          </CardDescription>
                        </div>
                        <Badge className="bg-green-500">Active</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Medications</h4>
                          <ul className="space-y-2">
                            {prescription.medications.map((med, index) => (
                              <li key={index} className="flex items-center justify-between text-sm">
                                <span>{med.name}</span>
                                <span className="text-gray-500">{med.remaining} refills remaining</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Expires on {prescription.expiryDate}</span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-4 w-4" />
                              View Details
                            </Button>
                            <Button size="sm">Refill Now</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="expired" className="pt-6">
            {expiredPrescriptions.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-lg font-medium mb-2">No Expired Prescriptions</p>
                  <p className="text-gray-500 mb-6 text-center">You don't have any expired prescriptions.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {expiredPrescriptions.map((prescription) => (
                  <Card key={prescription.id}>
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Prescription #{prescription.id}</CardTitle>
                          <CardDescription>
                            Prescribed by {prescription.doctor} on {prescription.date}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                          Expired
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Medications</h4>
                          <ul className="space-y-2">
                            {prescription.medications.map((med, index) => (
                              <li key={index} className="flex items-center justify-between text-sm">
                                <span>{med.name}</span>
                                <span className="text-gray-500">0 refills remaining</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-red-500">Expired on {prescription.expiryDate}</span>
                          <div className="space-x-2">
                            <Button size="sm" variant="outline">
                              <Eye className="mr-1 h-4 w-4" />
                              View Details
                            </Button>
                            <Button size="sm">Request Renewal</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upload" className="pt-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload New Prescription</CardTitle>
                <CardDescription>Upload a photo or scan of your prescription</CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionUploadForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AccountLayout>
  )
}

