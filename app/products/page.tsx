import type { Metadata } from "next"
import ProductsPage from "@/components/products/products-page"

export const metadata: Metadata = {
  title: "Products | AfyaGo,
  description: "Browse our wide range of healthcare products and medications",
}

export default function Products() {
  return <ProductsPage />
}

