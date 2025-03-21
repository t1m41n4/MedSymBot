"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Pill,
  Thermometer,
  Heart,
  LigatureIcon as Bandage,
  Baby,
  Droplet,
  Stethoscope,
  Syringe,
  Leaf,
  Eye,
} from "lucide-react"

const categories = [
  {
    name: "Medications",
    icon: <Pill className="h-12 w-12 text-teal-600" />,
    href: "/categories/medications",
    description: "Prescription & OTC medicines",
    featured: true,
    subcategories: ["Pain Relief", "Antibiotics", "Allergy", "Digestive Health", "Respiratory"],
  },
  {
    name: "Health Devices",
    icon: <Thermometer className="h-12 w-12 text-teal-600" />,
    href: "/categories/devices",
    description: "Monitors & medical equipment",
    featured: true,
    subcategories: ["Blood Pressure Monitors", "Thermometers", "Glucose Monitors", "Nebulizers"],
  },
  {
    name: "Wellness",
    icon: <Heart className="h-12 w-12 text-teal-600" />,
    href: "/categories/wellness",
    description: "Vitamins & supplements",
    featured: true,
    subcategories: ["Multivitamins", "Minerals", "Probiotics", "Immune Support", "Energy Boosters"],
  },
  {
    name: "First Aid",
    icon: <Bandage className="h-12 w-12 text-teal-600" />,
    href: "/categories/first-aid",
    description: "Emergency & wound care",
    featured: true,
    subcategories: ["Bandages", "Antiseptics", "Burn Treatment", "First Aid Kits"],
  },
  {
    name: "Baby Care",
    icon: <Baby className="h-12 w-12 text-teal-600" />,
    href: "/categories/baby-care",
    description: "Products for infants & children",
    featured: true,
    subcategories: ["Baby Formula", "Diapers", "Baby Medicines", "Baby Skincare"],
  },
  {
    name: "Personal Care",
    icon: <Droplet className="h-12 w-12 text-teal-600" />,
    href: "/categories/personal-care",
    description: "Hygiene & skincare products",
    featured: true,
    subcategories: ["Skincare", "Oral Care", "Hair Care", "Hand Sanitizers", "Face Masks"],
  },
  {
    name: "Medical Supplies",
    icon: <Stethoscope className="h-12 w-12 text-teal-600" />,
    href: "/categories/medical-supplies",
    description: "Professional medical supplies",
    featured: false,
    subcategories: ["Syringes", "Gloves", "Masks", "Wound Dressings"],
  },
  {
    name: "Diabetes Care",
    icon: <Syringe className="h-12 w-12 text-teal-600" />,
    href: "/categories/diabetes-care",
    description: "Diabetes management products",
    featured: false,
    subcategories: ["Glucose Monitors", "Test Strips", "Insulin Supplies", "Diabetic Foot Care"],
  },
  {
    name: "Herbal Products",
    icon: <Leaf className="h-12 w-12 text-teal-600" />,
    href: "/categories/herbal-products",
    description: "Natural & herbal remedies",
    featured: false,
    subcategories: ["Herbal Supplements", "Essential Oils", "Traditional Remedies"],
  },
  {
    name: "Eye Care",
    icon: <Eye className="h-12 w-12 text-teal-600" />,
    href: "/categories/eye-care",
    description: "Vision & eye health products",
    featured: false,
    subcategories: ["Eye Drops", "Contact Lens Solutions", "Reading Glasses", "Eye Supplements"],
  },
]

export default function CategoriesPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="h-full transition-all hover:shadow-md hover:border-teal-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-full bg-teal-50 p-4">{category.icon}</div>
                  <div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-500 mb-4">{category.description}</p>

                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Popular subcategories:</h4>
                      <ul className="space-y-1">
                        {category.subcategories.slice(0, 3).map((subcategory) => (
                          <li key={subcategory} className="text-sm text-teal-600 hover:underline">
                            {subcategory}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

