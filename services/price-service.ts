const VAT_RATE = 0.16
const FREE_SHIPPING_THRESHOLD = 5000
const BASE_SHIPPING_COST = 500

export class PriceService {
  static calculateVAT(price: number): number {
    return price * VAT_RATE
  }

  static calculateTotal(subtotal: number): number {
    return subtotal * (1 + VAT_RATE)
  }

  static calculateShipping(subtotal: number): number {
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : BASE_SHIPPING_COST
  }
}
