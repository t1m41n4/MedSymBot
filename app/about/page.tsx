import type { Metadata } from "next"
import AboutPage from "@/components/about/about-page"

export const metadata: Metadata = {
  title: "About Us | MedExpress",
  description: "Learn about MedExpress, your trusted online pharmacy in Kenya",
}

export default function About() {
  return <AboutPage />
}

