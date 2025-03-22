import type { Metadata } from "next"
import PrescriptionsPage from "@/components/prescriptions/prescriptions-page"

export const metadata: Metadata = {
  title: "Prescriptions | AfyaGo",
  description: "Upload and manage your prescriptions with AfyaGo",
}

export default function Prescriptions() {
  return <PrescriptionsPage />
}

