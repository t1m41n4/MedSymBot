import type { Metadata } from "next"
import ContactPage from "@/components/contact/contact-page"

export const metadata: Metadata = {
  title: "Contact Us | AfyaGo,
  description: "Get in touch with AfyaGofor any questions or support",
}

export default function Contact() {
  return <ContactPage />
}

