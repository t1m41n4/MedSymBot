import type { Metadata } from "next"
import AboutPage from "@/components/about/about-page"

export const metadata: Metadata = {
  title: "About Us | AfyaGo,
  description: "Learn about AfyaGo your trusted online pharmacy in Kenya",
}

export default function About() {
  return <AboutPage />
}

