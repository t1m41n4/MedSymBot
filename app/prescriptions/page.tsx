import type { Metadata } from "next"
import PrescriptionsPage from "@/components/prescriptions/prescriptions-page"

export const metadata: Metadata = {
  title: "Prescriptions | MedExpress",
  description: "Upload and manage your prescriptions with MedExpress",
}

export default function Prescriptions() {
  return <PrescriptionsPage />
}

