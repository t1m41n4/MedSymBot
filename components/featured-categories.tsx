import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Pill, Thermometer, Heart, LigatureIcon as Bandage, Baby, Droplet } from "lucide-react"

const categories = [
  {
    name: "Medications",
    icon: <Pill className="h-8 w-8 text-teal-600" />,
    href: "/categories/medications",
    description: "Prescription & OTC medicines",
  },
  {
    name: "Health Devices",
    icon: <Thermometer className="h-8 w-8 text-teal-600" />,
    href: "/categories/devices",
    description: "Monitors & medical equipment",
  },
  {
    name: "Wellness",
    icon: <Heart className="h-8 w-8 text-teal-600" />,
    href: "/categories/wellness",
    description: "Vitamins & supplements",
  },
  {
    name: "First Aid",
    icon: <Bandage className="h-8 w-8 text-teal-600" />,
    href: "/categories/first-aid",
    description: "Emergency & wound care",
  },
  {
    name: "Baby Care",
    icon: <Baby className="h-8 w-8 text-teal-600" />,
    href: "/categories/baby-care",
    description: "Products for infants & children",
  },
  {
    name: "Personal Care",
    icon: <Droplet className="h-8 w-8 text-teal-600" />,
    href: "/categories/personal-care",
    description: "Hygiene & skincare products",
  },
]

const FeaturedCategories = () => {
  return (
    <section className="py-12">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
        <p className="mt-2 text-lg text-gray-600">Browse our wide range of healthcare products</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="h-full transition-all hover:shadow-md hover:border-teal-200">
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="mb-4 rounded-full bg-teal-50 p-3">{category.icon}</div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{category.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default FeaturedCategories

