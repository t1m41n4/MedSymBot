import type { Metadata } from "next"
import { Suspense } from 'react'
import { ProductDetail } from '@/components/products/product-detail'
import { SkeletonCard } from '@/components/ui/skeleton-loader'
import { ProductReviews } from '@/components/products/product-reviews'
import { RelatedProducts } from '@/components/products/related-products'

export const metadata: Metadata = {
  title: "Product Details | AfyaGo",
  description: "View detailed information about our healthcare products",
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto py-8">
      <Suspense fallback={<SkeletonCard />}>
        <ProductDetail id={parseInt(params.id)} />
      </Suspense>

      <div className="mt-16">
        <Suspense fallback={<SkeletonCard count={3} />}>
          <RelatedProducts productId={parseInt(params.id)} />
        </Suspense>
      </div>

      <div className="mt-16">
        <Suspense fallback={<SkeletonCard />}>
          <ProductReviews productId={parseInt(params.id)} />
        </Suspense>
      </div>
    </div>
  )
}

