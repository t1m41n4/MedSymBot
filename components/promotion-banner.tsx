import Link from "next/link"
import { Button } from "@/components/ui/button"

const PromotionBanner = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl my-12 overflow-hidden">
      <div className="px-6 py-12 md:px-12 text-center md:text-left md:flex md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">25% OFF Your First Order</h2>
          <p className="mt-2 text-purple-100 max-w-md">
            Use code WELCOME25 at checkout. Valid for new customers on orders over $30.
          </p>
        </div>
        <div className="mt-6 md:mt-0 md:ml-8">
          <Button asChild size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            <Link href="/products">Shop Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PromotionBanner

