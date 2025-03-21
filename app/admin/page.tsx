"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import {
  ShoppingCart,
  Users,
  Package,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  AlertCircle,
} from "lucide-react"

// Mock data for dashboard
const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
]

const categoryData = [
  { name: "Medications", value: 45 },
  { name: "Health Devices", value: 20 },
  { name: "Wellness", value: 15 },
  { name: "First Aid", value: 10 },
  { name: "Personal Care", value: 10 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

export default function AdminDashboard() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("week")

  const stats = [
    {
      title: "Total Revenue",
      value: "$12,345",
      change: "+12.5%",
      trend: "up",
      icon: <DollarSign className="h-5 w-5" />,
    },
    {
      title: "Orders",
      value: "156",
      change: "+8.2%",
      trend: "up",
      icon: <ShoppingCart className="h-5 w-5" />,
    },
    {
      title: "Customers",
      value: "2,450",
      change: "+5.7%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Inventory Items",
      value: "1,245",
      change: "-2.3%",
      trend: "down",
      icon: <Package className="h-5 w-5" />,
    },
  ]

  const recentOrders = [
    {
      id: "ORD-123456",
      customer: "John Doe",
      date: "2023-03-15",
      status: "Delivered",
      total: "$125.99",
    },
    {
      id: "ORD-123457",
      customer: "Jane Smith",
      date: "2023-03-15",
      status: "Processing",
      total: "$89.50",
    },
    {
      id: "ORD-123458",
      customer: "Michael Johnson",
      date: "2023-03-14",
      status: "Shipped",
      total: "$210.75",
    },
    {
      id: "ORD-123459",
      customer: "Sarah Williams",
      date: "2023-03-14",
      status: "Pending",
      total: "$45.25",
    },
    {
      id: "ORD-123460",
      customer: "David Brown",
      date: "2023-03-13",
      status: "Delivered",
      total: "$178.30",
    },
  ]

  const lowStockItems = [
    {
      id: "PRD-001",
      name: "Paracetamol 500mg",
      category: "Medications",
      stock: 5,
      threshold: 10,
    },
    {
      id: "PRD-015",
      name: "Digital Thermometer",
      category: "Health Devices",
      stock: 3,
      threshold: 8,
    },
    {
      id: "PRD-042",
      name: "First Aid Kit",
      category: "First Aid",
      stock: 2,
      threshold: 5,
    },
  ]

  const pendingPrescriptions = [
    {
      id: "RX-123456",
      customer: "Alice Johnson",
      date: "2023-03-15",
      status: "Pending Review",
    },
    {
      id: "RX-123457",
      customer: "Bob Smith",
      date: "2023-03-14",
      status: "Pending Review",
    },
    {
      id: "RX-123458",
      customer: "Carol Williams",
      date: "2023-03-14",
      status: "Pending Review",
    },
  ]

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => setTimeRange("week")}>
              Week
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange("month")}>
              Month
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeRange("year")}>
              Year
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-gray-100 p-2">{stat.icon}</div>
                  <div className={`flex items-center ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    <span className="text-sm font-medium">{stat.change}</span>
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                  <p className="text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Overview</CardTitle>
              <CardDescription>Monthly sales performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#0D9488" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sales by Category</CardTitle>
              <CardDescription>Distribution of sales across product categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => router.push("/admin/orders")}>
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-2 font-medium">Order ID</th>
                      <th className="text-left py-3 px-2 font-medium">Customer</th>
                      <th className="text-left py-3 px-2 font-medium">Date</th>
                      <th className="text-left py-3 px-2 font-medium">Status</th>
                      <th className="text-right py-3 px-2 font-medium">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-b">
                        <td className="py-3 px-2">{order.id}</td>
                        <td className="py-3 px-2">{order.customer}</td>
                        <td className="py-3 px-2">{order.date}</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === "Delivered"
                                ? "bg-green-100 text-green-800"
                                : order.status === "Processing"
                                  ? "bg-blue-100 text-blue-800"
                                  : order.status === "Shipped"
                                    ? "bg-purple-100 text-purple-800"
                                    : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-2 text-right">{order.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Low Stock Items</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/admin/inventory")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                      <div className="flex items-center">
                        <AlertCircle className="h-4 w-4 text-red-500 mr-2" />
                        <span className="text-sm font-medium">
                          {item.stock} / {item.threshold}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Pending Prescriptions</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => router.push("/admin/prescriptions")}>
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pendingPrescriptions.map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{prescription.id}</p>
                        <p className="text-sm text-gray-500">{prescription.customer}</p>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 text-blue-500 mr-2" />
                        <span className="text-sm">{prescription.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}

