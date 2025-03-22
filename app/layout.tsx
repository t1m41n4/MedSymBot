import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProviderWrapper } from "@/components/providers/theme-provider-wrapper"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/context/cart-context"
import { AuthProvider } from "@/context/auth-context"
import { ChatbotProvider } from "@/context/chatbot-context"
import ChatbotButton from "@/components/chatbot/chatbot-button"
import { ComparisonProvider } from '@/context/comparison-context'
import { ComparisonFloatingButtonWrapper } from "@/components/comparison/floating-button-wrapper"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "MedExpress | Online Pharmacy",
  description: "Your trusted online pharmacy for all your medication needs",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProviderWrapper>
          <AuthProvider>
            <CartProvider>
              <ChatbotProvider>
                <ComparisonProvider>
                  <div className="flex min-h-screen flex-col">
                    <Header />
                    <main className="flex-1">{children}</main>
                    <Footer />
                    <ChatbotButton />
                    <ComparisonFloatingButtonWrapper />
                  </div>
                  <Toaster />
                </ComparisonProvider>
              </ChatbotProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}