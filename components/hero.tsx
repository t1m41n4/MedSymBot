"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useChatbot } from "@/context/chatbot-context"

const Hero = () => {
  const { openChatbot } = useChatbot()

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600 py-16 sm:py-24 rounded-xl my-8">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/90 to-emerald-600/90" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Your Health, Delivered</h1>
            <p className="mt-6 text-xl text-white">
              Get your medications and health products delivered to your doorstep. Fast, reliable, and secure.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-white text-teal-600 hover:bg-gray-100">
                <Link href="/products">Shop Now</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="border-white text-white hover:bg-white/10 focus:bg-white/20 transition-colors"
              >
                <Link href="/prescriptions">Upload Prescription</Link>
              </Button>
            </div>
            <p className="mt-6 text-base text-teal-100">
              Free delivery on orders over Ksh 5,000. No prescription? Chat with our AI assistant for recommendations.
            </p>
          </div>
          <div className="mt-12 lg:col-span-5 lg:mt-0">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-white/20">
              <h2 className="text-lg font-semibold text-white mb-4">Quick Health Check</h2>
              <p className="text-teal-100 mb-4">
                Not sure what you need? Our AI-powered MedSymBot can help you find the right medication based on your
                symptoms.
              </p>
              <Button className="w-full bg-white text-teal-600 hover:bg-gray-100" onClick={openChatbot}>
                Chat with MedSymBot
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero

