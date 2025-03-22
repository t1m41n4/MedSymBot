import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProductCard } from './ProductCard';

const mockProduct = {
  id: '1',
  name: 'Test Product',
  price: 9.99,
  description: 'Test description',
  category: 'otc',
  image: '/test-image.jpg',
  isPrescriptionRequired: false,
  stock: 10
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument();
  });

  it('calls onAddToCart when add to cart button is clicked', () => {
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    fireEvent.click(screen.getByRole('button'));
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });

  it('renders loading skeleton when loading is true', () => {
    const { container } = render(<ProductCard product={mockProduct} />);
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument();
  });

  it('renders error message when error occurs', () => {
    const errorMessage = 'Failed to load product';
    render(<ProductCard product={mockProduct} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Dismiss'));
    expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
  });

  it('handles quantity updates correctly', () => {
    render(<ProductCard product={mockProduct} />);

    const quantityInput = screen.getByLabelText('Quantity');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    expect(quantityInput).toHaveValue('2');
  });
});

describe('ProductCard with prescription products', () => {
  const prescriptionProduct = {
    ...mockProduct,
    isPrescriptionRequired: true,
  };

  it('shows prescription required message for prescription products', () => {
    render(<ProductCard product={prescriptionProduct} />);
    expect(screen.getByText('Requires Prescription')).toBeInTheDocument();
  });

  it('disables add to cart button for unauthorized prescription products', () => {
    render(<ProductCard product={prescriptionProduct} />);
    const button = screen.getByRole('button', { name: /add .* to cart/i });
    expect(button).toBeDisabled();
  });

  it('shows prescription modal when clicking add to cart for prescription products', () => {
    render(<ProductCard product={prescriptionProduct} />);

    fireEvent.click(screen.getByRole('button', { name: /add .* to cart/i }));

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Upload Prescription')).toBeInTheDocument();
  });

  it('enables add to cart after successful prescription validation', async () => {
    render(<ProductCard product={prescriptionProduct} />);

    fireEvent.click(screen.getByRole('button', { name: /add .* to cart/i }));

    // Simulate successful prescription upload
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    fireEvent.change(screen.getByLabelText('Upload prescription file'), {
      target: { files: [file] }
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /add .* to cart/i })).toBeEnabled();
    });
  });
});

describe('ProductCard security', () => {
  it('sanitizes product data before display', () => {
    const maliciousProduct = {
      ...mockProduct,
      name: '<script>alert("xss")</script>Product',
      description: '<img onerror="alert(1)"/>Description'
    };

    render(<ProductCard product={maliciousProduct} />);

    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('validates session before adding to cart', async () => {
    render(<ProductCard product={mockProduct} />);

    fireEvent.click(screen.getByRole('button', { name: /add .* to cart/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid session')).toBeInTheDocument();
    });
  });
});

describe('ProductCard SEO and Security', () => {
  it('renders structured data correctly', () => {
    render(<ProductCard product={mockProduct} />);
    const scriptTag = document.querySelector('script[type="application/ld+json"]');
    expect(scriptTag).toBeInTheDocument();

    const structuredData = JSON.parse(scriptTag?.textContent || '');
    expect(structuredData['@type']).toBe('Product');
    expect(structuredData.name).toBe(mockProduct.name);
  });

  it('blocks rapid auth attempts', () => {
    const { result } = renderHook(() => useStore());

    // Simulate multiple auth attempts
    for (let i = 0; i < 6; i++) {
      const allowed = result.current.checkAuthRateLimit('testUser');
      if (i < 5) {
        expect(allowed).toBe(true);
      } else {
        expect(allowed).toBe(false);
      }
    }
  });
});
