import type { Metadata } from "next"
import CategoryPage from "@/components/categories/category-page"

export const metadata: Metadata = {
  title: "Category Products | MedExpress",
  description: "Browse products by category",
}

export default function Category({ params }: { params: { category: string } }) {
  return <CategoryPage category={params.category} />
}

