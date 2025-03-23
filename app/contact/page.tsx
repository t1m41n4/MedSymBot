import type { Metadata } from "next"
import ContactPage from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact Us | AfyaGo",
  description: "Get in touch with AfyaGo for any questions or support",
}

export default function Contact() {
  return <ContactPage />
}

