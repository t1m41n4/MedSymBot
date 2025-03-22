export interface InventoryTransaction {
  id: number;
  productId: number;
  type: 'in' | 'out' | 'adjustment';
  quantity: number;
  batchNumber: string;
  expiryDate: string;
  timestamp: Date;
  notes?: string;
}

export interface StockAlert {
  productId: number;
  type: 'low_stock' | 'expiring_soon' | 'expired';
  threshold: number;
  currentStock: number;
  message: string;
}

export interface BatchInfo {
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  quantity: number;
  manufacturer: string;
  storageConditions?: string;
}
