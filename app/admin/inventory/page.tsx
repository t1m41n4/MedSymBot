"use client"

import { useState } from "react"
import AdminLayout from "@/components/admin/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Trash2, AlertCircle, ArrowUpDown, Download, Upload } from "lucide-react"
import AddProductDialog from "@/components/admin/add-product-dialog"

// Mock inventory data
const inventoryData = [
  {
    id: "PRD-001",
    name: "Paracetamol 500mg",
    category: "Medications",
    price: 5.99,
    stock: 120,
    threshold: 20,
    status: "In Stock",
  },
  {
    id: "PRD-002",
    name: "Ibuprofen 400mg",
    category: "Medications",
    price: 7.49,
    stock: 85,
    threshold: 15,
    status: "In Stock",
  },
  {
    id: "PRD-003",
    name: "Digital Thermometer",
    category: "Health Devices",
    price: 24.99,
    stock: 18,
    threshold: 10,
    status: "In Stock",
  },
  {
    id: "PRD-004",
    name: "Blood Pressure Monitor",
    category: "Health Devices",
    price: 89.99,
    stock: 12,
    threshold: 5,
    status: "In Stock",
  },
  {
    id: "PRD-005",
    name: "First Aid Kit",
    category: "First Aid",
    price: 19.99,
    stock: 5,
    threshold: 10,
    status: "Low Stock",
  },
  {
    id: "PRD-006",
    name: "Vitamin C 1000mg",
    category: "Vitamins",
    price: 12.99,
    stock: 0,
    threshold: 15,
    status: "Out of Stock",
  },
  {
    id: "PRD-007",
    name: "Hand Sanitizer",
    category: "Personal Care",
    price: 3.99,
    stock: 45,
    threshold: 20,
    status: "In Stock",
  },
  {
    id: "PRD-008",
    name: "Face Masks (50 pack)",
    category: "Personal Care",
    price: 15.99,
    stock: 8,
    threshold: 10,
    status: "Low Stock",
  },
]

export default function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  // Filter inventory based on search query and filters
  const filteredInventory = inventoryData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Inventory Management</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Import
            </Button>
            <Button size="sm" onClick={() => setIsAddProductOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search products..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-4">
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Medications">Medications</SelectItem>
                    <SelectItem value="Health Devices">Health Devices</SelectItem>
                    <SelectItem value="First Aid">First Aid</SelectItem>
                    <SelectItem value="Vitamins">Vitamins</SelectItem>
                    <SelectItem value="Personal Care">Personal Care</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="In Stock">In Stock</SelectItem>
                    <SelectItem value="Low Stock">Low Stock</SelectItem>
                    <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>
                      <div className="flex items-center">
                        Product Name
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.id}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end">
                          {product.stock < product.threshold && <AlertCircle className="h-4 w-4 text-red-500 mr-1" />}
                          <span>{product.stock}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            product.status === "In Stock"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : product.status === "Low Stock"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-red-100 text-red-800 hover:bg-red-100"
                          }
                        >
                          {product.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      <AddProductDialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen} />
    </AdminLayout>
  )
}

