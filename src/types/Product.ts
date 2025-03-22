export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isPrescriptionRequired: boolean;
  stock: number;
  authRequirement?: AuthRequirement;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  canonicalUrl?: string;
  breadcrumbs?: {
    name: string;
    url: string;
  }[];
}

export type ProductCategory = 'otc' | 'prescription' | 'personal-care' | 'supplements';

export interface AuthRequirement {
  type: 'prescription';
  validationMethod: 'upload' | 'verification';
}
