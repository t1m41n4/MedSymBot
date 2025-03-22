export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  isPopular?: boolean
  isNew?: boolean
  description: string
  longDescription: string
  stock: number
  sku: string
  reviews: number
  rating: number
  prescription?: boolean
  batchNumber?: string
  expiryDate?: string
  dosageForm?: string
  strength?: string
  manufacturer?: string
  storageConditions?: string
  relatedProducts: number[]
  images: string[]
}

export interface MedicationInteraction {
  severity: 'high' | 'medium' | 'low'
  description: string
  interactingDrug: string
}

export interface MedicationWarning {
  type: 'contraindication' | 'sideEffect' | 'precaution'
  description: string
}
