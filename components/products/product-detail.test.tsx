import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProductDetailPage from './product-detail'
import { useProductCache } from '@/hooks/use-product-cache'
import '@jest/globals'
import '@testing-library/jest-dom'

jest.mock('@/hooks/use-product-cache')

describe('ProductDetailPage', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test description',
    // ...other required fields
  }

  beforeEach(() => {
    (useProductCache as jest.Mock).mockReturnValue({
      data: mockProduct,
      isLoading: false
    })
  })

  it('renders product details correctly', () => {
    render(<ProductDetailPage id={1} />)
    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  })

  it('handles quantity changes correctly', async () => {
    render(<ProductDetailPage id={1} />)
    const increaseButton = screen.getByLabelText('Increase quantity')

    fireEvent.click(increaseButton)
    await waitFor(() => {
      expect(screen.getByText('2')).toBeInTheDocument()
    })
  })

  it('shows loading state', () => {
    (useProductCache as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true
    })

    render(<ProductDetailPage id={1} />)
    expect(screen.getByText('Loading product details...')).toBeInTheDocument()
  })
})
