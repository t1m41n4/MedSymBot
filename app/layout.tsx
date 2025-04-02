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
import { FloatingButtons } from "@/components/floating-buttons"
import { ComparisonProvider } from '@/context/comparison-context'
import { ErrorBoundary } from "@/components/error-boundary"
import { ClientProvider } from "@/components/providers/client-provider"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: "AfyaGo | Online Pharmacy",
  description: "Your trusted online pharmacy for all your medication needs in Kenya. Fast delivery, genuine medicines.",
  keywords: "pharmacy, medicine, healthcare, prescription, Kenya, Nairobi, delivery",
  openGraph: {
    title: "AfyaGo | Online Pharmacy",
    description: "Your trusted online pharmacy for all your medication needs",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AfyaGo | Online Pharmacy",
    description: "Your trusted online pharmacy for all your medication needs",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "google-site-verification-code",
  },
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
          <ErrorBoundary>
            <ClientProvider>
              <AuthProvider>
                <CartProvider>
                  <ChatbotProvider>
                    <ComparisonProvider>
                      <div className="flex min-h-screen flex-col">
                        <Header />
                        <main className="flex-1">{children}</main>
                        <Footer />
                        <FloatingButtons />
                      </div>
                      <Toaster />
                    </ComparisonProvider>
                  </ChatbotProvider>
                </CartProvider>
              </AuthProvider>
            </ClientProvider>
          </ErrorBoundary>
        </ThemeProviderWrapper>
      </body>
    </html>
  )
}