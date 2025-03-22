import { z } from 'zod'

export const productSchema = z.object({
  id: z.number().positive(),
  name: z.string().min(1).max(100),
  price: z.number().positive(),
  stock: z.number().min(0),
  description: z.string().min(10),
  category: z.string(),
  images: z.array(z.string().url()).min(1),
  rating: z.number().min(0).max(5).optional(),
  reviews: z.number().min(0).optional(),
  prescription: z.boolean().optional(),
  manufacturer: z.string().optional(),
  strength: z.string().optional(),
  dosageForm: z.string().optional(),
  storageConditions: z.string().optional()
})

export const orderSchema = z.object({
  items: z.array(z.object({
    productId: z.number(),
    quantity: z.number().positive(),
    price: z.number().positive()
  })),
  total: z.number().positive(),
  shipping: z.object({
    address: z.string(),
    city: z.string(),
    phone: z.string()
  }),
  paymentMethod: z.enum(['mpesa', 'card', 'cash'])
})

export type Product = z.infer<typeof productSchema>
export type Order = z.infer<typeof orderSchema>
