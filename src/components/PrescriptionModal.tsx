import { useState, useEffect } from 'react';
import { Product } from '../types/Product';
import { ProductService } from '../services/ProductService';

interface PrescriptionModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PrescriptionModal = ({ product, isOpen, onClose, onSuccess }: PrescriptionModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const validateFile = async (file: File): Promise<string | null> => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    const readFileHeader = async (file: File): Promise<string> => {
      const buffer = await file.slice(0, 4).arrayBuffer();
      return Array.from(new Uint8Array(buffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    };

    const isValidFileType = async (file: File): Promise<boolean> => {
      const header = await readFileHeader(file);
      const validHeaders = {
        '89504e47': 'image/png',
        'ffd8ffe0': 'image/jpeg',
        '25504446': 'application/pdf'
      };
      return Object.keys(validHeaders).includes(header);
    };

    if (!allowedTypes.includes(file.type) || !(await isValidFileType(file))) {
      return 'Invalid file type. Please upload PDF, JPEG, or PNG files only.';
    }

    if (file.size > maxSize) {
      return 'File size too large. Maximum size is 5MB.';
    }

    const simulateVirusScan = async (file: File): Promise<boolean> => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    };

    if (!(await simulateVirusScan(file))) {
      return 'File failed virus scan. Please upload a different file.';
    }

    return null;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const error = await validateFile(file);
    if (error) {
      setError(error);
      setFile(null);
      return;
    }

    setFile(file);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setError('');

    const formData = new FormData();
    formData.append('prescription', file);

    try {
      const result = await ProductService.getInstance().validatePrescription(product.id, formData);
      if (result) {
        onSuccess();
        onClose();
      }
    } catch (err) {
      setError('Failed to upload prescription. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      role="dialog"
      aria-labelledby="prescription-title"
      aria-describedby="prescription-desc"
    >
      <div
        className="bg-white p-6 rounded-lg max-w-md w-full"
        aria-modal="true"
        tabIndex={-1}
      >
        <h2 id="prescription-title" className="text-xl font-bold mb-4">
          Upload Prescription
        </h2>
        <p id="prescription-desc" className="mb-4">
          Please upload a valid prescription for {product.name}
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="mb-4"
            aria-label="Upload prescription file"
          />
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600"
              disabled={uploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
              disabled={!file || uploading}
            >
              {uploading ? 'Uploading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
