import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().regex(/^\+?[\d\s-]{10,}$/, "Invalid phone number")
})

export const addressSchema = z.object({
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().regex(/^\d{5}$/, "Invalid postal code"),
  country: z.string().min(2, "Country is required")
})

export const prescriptionSchema = z.object({
  doctorName: z.string().min(2, "Doctor name is required"),
  licenseNumber: z.string().min(4, "License number is required"),
  patientName: z.string().min(2, "Patient name is required"),
  medication: z.string().min(2, "Medication name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  file: z.instanceof(File).refine((f) => f.size <= 5000000, "File must be less than 5MB")
})
