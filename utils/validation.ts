import { z } from 'zod'

export const productSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
  price: z.number().positive(),
  stock: z.number().min(0),
  description: z.string(),
  category: z.string()
})

export const prescriptionSchema = z.object({
  patientName: z.string().min(1),
  doctorName: z.string().min(1),
  doctorLicenseNumber: z.string().min(1),
  medications: z.array(z.object({
    productId: z.number(),
    dosage: z.string(),
    frequency: z.string()
  }))
})
