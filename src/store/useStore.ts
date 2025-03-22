import create from 'zustand';
import { Product } from '../types/Product';

interface CartStore {
  items: { product: Product; quantity: number }[];
  wishlist: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  toggleWishlist: (product: Product) => void;
  loading: boolean;
  error: string | null;
  updateQuantity: (productId: string, quantity: number) => void;
  setLoading: (status: boolean) => void;
  setError: (error: string | null) => void;
  sessionId: string | null;
  setSessionId: (id: string) => void;
  authAttempts: Map<string, { count: number; lastAttempt: number }>;
  checkAuthRateLimit: (userId: string) => boolean;
}

export const useStore = create<CartStore>((set, get) => ({
  items: [],
  wishlist: [],
  sessionId: null,
  setSessionId: (id) => set({ sessionId: id }),
  authAttempts: new Map(),
  addToCart: (product) =>
    set((state) => {
      try {
        // Validate session
        if (!state.sessionId) {
          throw new Error('Invalid session');
        }

        // Sanitize inputs
        const sanitizedProduct = {
          ...product,
          name: product.name.replace(/[<>]/g, ''),
          description: product.description.replace(/[<>]/g, '')
        };

        // Validate product stock before adding
        const existingItem = state.items.find(item => item.product.id === sanitizedProduct.id);
        const currentQuantity = existingItem?.quantity || 0;

        if (currentQuantity >= sanitizedProduct.stock) {
          throw new Error('Product out of stock');
        }

        if (sanitizedProduct.isPrescriptionRequired && !sanitizedProduct.authRequirement?.validationMethod) {
          throw new Error('Prescription validation required');
        }

        // Track suspicious behavior
        const now = Date.now();
        const lastAdd = state.authAttempts.get(product.id)?.lastAttempt || 0;
        if (now - lastAdd < 1000) { // Less than 1 second between adds
          throw new Error('Suspicious activity detected');
        }

        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.product.id === sanitizedProduct.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        }
        return { items: [...state.items, { product: sanitizedProduct, quantity: 1 }] };
      } catch (error) {
        // Log security events
        console.warn('Security Event: cart_operation_failed', {
          productId: product.id,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      items: state.items.filter(item => item.product.id !== productId)
    })),
  toggleWishlist: (product) =>
    set((state) => ({
      wishlist: state.wishlist.some(p => p.id === product.id)
        ? state.wishlist.filter(p => p.id !== product.id)
        : [...state.wishlist, product]
    })),
  loading: false,
  error: null,
  updateQuantity: (productId, quantity) =>
    set((state) => {
      // Validate input
      if (typeof quantity !== 'number' || quantity < 0 || !Number.isInteger(quantity)) {
        throw new Error('Invalid quantity');
      }

      const item = state.items.find(item => item.product.id === productId);
      if (!item) return state;

      // Validate quantity against stock
      if (quantity > item.product.stock) {
        throw new Error('Requested quantity exceeds available stock');
      }

      return {
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, Math.min(quantity, item.product.stock)) }
            : item
        ).filter(item => item.quantity > 0)
      };
    }),
  setLoading: (status) => set({ loading: status }),
  setError: (error) => set({ error }),
  checkAuthRateLimit: (userId) => {
    const MAX_ATTEMPTS = 5;
    const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
    const now = Date.now();
    const attempts = get().authAttempts.get(userId) || { count: 0, lastAttempt: now };

    if (now - attempts.lastAttempt > WINDOW_MS) {
      get().authAttempts.set(userId, { count: 1, lastAttempt: now });
      return true;
    }

    if (attempts.count >= MAX_ATTEMPTS) {
      return false;
    }

    get().authAttempts.set(userId, {
      count: attempts.count + 1,
      lastAttempt: now
    });
    return true;
  }
}));
