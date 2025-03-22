import Image from 'next/image';
import { Product } from '../types/Product';
import { useStore } from '../store/useStore';
import { useState, useEffect } from 'react';
import ProductService from '../services/ProductService';
import { PrescriptionModal } from './PrescriptionModal';
import Head from 'next/head';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, toggleWishlist, wishlist, loading, error, setError } = useStore();
  const [prescriptionStatus, setPrescriptionStatus] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState(false);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const isWishlisted = wishlist.some(p => p.id === product.id);

  useEffect(() => {
    if (product.isPrescriptionRequired) {
      ProductService.getInstance().checkPrescriptionStatus(product.id)
        .then(setPrescriptionStatus);
    }
  }, [product.id, product.isPrescriptionRequired]);

  const handleAddToCart = async () => {
    if (product.isPrescriptionRequired && !prescriptionStatus) {
      setShowPrescriptionModal(true);
      return;
    }
    addToCart(product);
  };

  const handlePrescriptionSuccess = () => {
    setPrescriptionStatus(true);
    addToCart(product);
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stock > 0 ? 'InStock' : 'OutOfStock',
      priceValidUntil: new Date(Date.now() + 86400000).toISOString()
    },
    brand: {
      '@type': 'Brand',
      name: 'AfyaGo'
    },
    category: product.category,
    sku: product.id,
    mpn: product.id
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-48 bg-gray-200 rounded-lg"></div>
        <div className="mt-4 space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded">
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => setError(null)}
          className="mt-2 text-sm text-red-500"
        >
          Dismiss
        </button>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{`${product.name} - Online Pharmacy`}</title>
        <meta name="description" content={product.description} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={product.image} />
        <meta name="robots" content={product.isPrescriptionRequired ? 'noindex' : 'index,follow'} />
        <link rel="canonical" href={product.canonicalUrl || `https://example.com/products/${product.id}`} />
        <meta name="keywords" content={product.seoKeywords?.join(', ')} />
        <meta property="product:availability" content={product.stock > 0 ? 'in stock' : 'out of stock'} />
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="USD" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <article
        className="overflow-hidden rounded-lg shadow-lg"
        aria-labelledby={`product-${product.id}`}
        itemScope
        itemType="https://schema.org/Product"
      >
        <div className="relative h-48">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h2 id={`product-${product.id}`} className="text-lg font-semibold">
            {product.name}
          </h2>
          <p className="mt-2 text-gray-600">{product.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold">${product.price}</span>
            <div className="space-x-2">
              <button
                onClick={() => toggleWishlist(product)}
                className="text-red-500"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                {isWishlisted ? '❤️' : '🤍'}
              </button>
              <button
                onClick={handleAddToCart}
                className={`rounded px-4 py-2 text-white ${
                  product.isPrescriptionRequired && !prescriptionStatus
                    ? 'bg-gray-500'
                    : 'bg-blue-500'
                }`}
                disabled={product.isPrescriptionRequired && !prescriptionStatus}
                aria-label={`Add ${product.name} to cart`}
              >
                {product.isPrescriptionRequired && !prescriptionStatus
                  ? 'Requires Prescription'
                  : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </article>

      {showPrescriptionModal && (
        <PrescriptionModal
          product={product}
          isOpen={showPrescriptionModal}
          onClose={() => setShowPrescriptionModal(false)}
          onSuccess={handlePrescriptionSuccess}
        />
      )}
    </>
  );
};
