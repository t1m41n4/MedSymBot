import type { Metadata } from "next"
import ProductDetailPage from "@/components/products/product-detail"

export const metadata: Metadata = {
  title: "Product Details | MedExpress",
  description: "View detailed information about our healthcare products",
}

export default function ProductDetail({ params }: { params: { id: string } }) {
  return <ProductDetailPage id={Number.parseInt(params.id)} />
}

