import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PrescriptionModal } from './PrescriptionModal';
import { ProductService } from '../services/ProductService';

jest.mock('../services/ProductService', () => ({
  getInstance: jest.fn(() => ({
    validatePrescription: jest.fn(),
  })),
}));

const mockProduct = {
  id: '1',
  name: 'Test Prescription Product',
  price: 9.99,
  description: 'Test description',
  category: 'prescription',
  image: '/test-image.jpg',
  isPrescriptionRequired: true,
  stock: 10,
};

describe('PrescriptionModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders modal when isOpen is true', () => {
    render(
      <PrescriptionModal
        product={mockProduct}
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Upload Prescription')).toBeInTheDocument();
  });

  it('handles file upload and submission', async () => {
    const validatePrescription = jest.fn().mockResolvedValue(true);
    (ProductService.getInstance as jest.Mock).mockImplementation(() => ({
      validatePrescription,
    }));

    render(
      <PrescriptionModal
        product={mockProduct}
        isOpen={true}
        onClose={mockOnClose}
        onSuccess={mockOnSuccess}
      />
    );

    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const input = screen.getByLabelText('Upload prescription file');

    fireEvent.change(input, { target: { files: [file] } });
    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(validatePrescription).toHaveBeenCalled();
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });
});
