import type { Product } from '@/types/product'

export function generateProductStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    sku: `PRD-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "AfyaGo",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: product.price,
      availability: product.stock > 0 ? "InStock" : "OutOfStock",
      seller: {
        "@type": "Organization",
        name: "AfyaGo"
      }
    },
    category: product.category,
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy",
      returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
      returnTime: "P30D"
    }
  }
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "AfyaGo",
    url: "https://afyago.com",
    logo: "https://afyago.com/logo.png",
    sameAs: [
      "https://facebook.com/afyago",
      "https://twitter.com/afyago"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+254-XXX-XXXXXX",
      contactType: "customer service",
      areaServed: "KE"
    }
  }
}
