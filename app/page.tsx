import Hero from "@/components/hero"
import FeaturedCategories from "@/components/featured-categories"
import FeaturedProducts from "@/components/featured-products"
import PromotionBanner from "@/components/promotion-banner"
import TestimonialSection from "@/components/testimonial-section"
import ChatbotButton from "@/components/chatbot/chatbot-button"

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <FeaturedCategories />
      <PromotionBanner />
      <FeaturedProducts />
      <TestimonialSection />
      <ChatbotButton />
    </div>
  )
}

