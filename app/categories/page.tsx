import type { Metadata } from "next"
import CategoriesPage from "@/components/categories/categories-page"

export const metadata: Metadata = {
  title: "Categories | MedExpress",
  description: "Browse our product categories for all your healthcare needs",
}

export default function Categories() {
  return <CategoriesPage />
}

