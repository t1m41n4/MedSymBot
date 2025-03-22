import { Product, ProductCategory } from '../types/Product';

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

interface RequestConfig {
  timeout?: number;
  retries?: number;
}

interface SecureRequestConfig extends RequestConfig {
  requiresAuth?: boolean;
  csrfToken?: string;
}

interface RateLimitConfig {
  maxAttempts: number;
  windowMs: number;
}

export class ProductService {
  private static instance: ProductService;
  private rateLimitStore: Map<string, { count: number; resetTime: number }> = new Map();
  private securityMetrics: Map<string, { attempts: number; lastAttempt: number }> = new Map();

  private constructor() {}

  static getInstance(): ProductService {
    if (!ProductService.instance) {
      ProductService.instance = new ProductService();
    }
    return ProductService.instance;
  }

  private async fetchWithRetry(
    url: string,
    options?: RequestInit,
    config: RequestConfig = {}
  ) {
    const { timeout = 5000, retries = 3 } = config;
    let lastError: Error | null = null;

    for (let i = 0; i < retries; i++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response;
      } catch (error) {
        lastError = error as Error;
        if (i === retries - 1) throw lastError;
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
      }
    }
  }

  private checkRateLimit(endpoint: string, config: RateLimitConfig): boolean {
    const now = Date.now();
    const key = `${endpoint}_${this.getSessionId()}`;
    const limit = this.rateLimitStore.get(key);

    if (!limit || now > limit.resetTime) {
      this.rateLimitStore.set(key, { count: 1, resetTime: now + config.windowMs });
      return true;
    }

    if (limit.count >= config.maxAttempts) {
      return false;
    }

    limit.count++;
    return true;
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('session_id');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      sessionStorage.setItem('session_id', sessionId);
    }
    return sessionId;
  }

  private async fetchWithSecurity(
    url: string,
    options?: RequestInit,
    config: SecureRequestConfig = {}
  ) {
    const { timeout = 5000, retries = 3, requiresAuth = false } = config;
    const headers = new Headers(options?.headers);

    // Rate limit check
    if (!this.checkRateLimit(url, { maxAttempts: 5, windowMs: 60000 })) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    // Add security headers
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('X-Frame-Options', 'DENY');
    headers.set('X-XSS-Protection', '1; mode=block');

    // Add CSRF token if available
    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
    if (csrfToken) {
      headers.set('X-CSRF-Token', csrfToken);
    }

    // Add auth token if required
    if (requiresAuth) {
      const authToken = await this.getAuthToken();
      if (!authToken) throw new Error('Authentication required');
      headers.set('Authorization', `Bearer ${authToken}`);
    }

    // Add Content Security Policy
    headers.set('Content-Security-Policy',
      "default-src 'self'; " +
      "img-src 'self' https: data:; " +
      "script-src 'self'; " +
      "style-src 'self' 'unsafe-inline';"
    );

    // Add secure cookie attributes
    document.cookie = "session=; SameSite=Strict; Secure; HttpOnly";

    // Add additional security headers
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    // Add performance monitoring
    const startTime = performance.now();
    try {
      const response = await this.fetchWithRetry(url, {
        ...options,
        headers,
        credentials: 'same-origin'
      }, { timeout, retries });

      // Monitor response times
      const endTime = performance.now();
      this.logPerformanceMetric(url, endTime - startTime);

      return response;
    } catch (error) {
      this.logSecurityEvent('request_error', { url, error: error.message });
      throw error;
    }
  }

  private logSecurityEvent(type: string, data: Record<string, any>) {
    // Log security events to monitoring service
    console.warn(`Security Event: ${type}`, data);
    // TODO: Implement actual security monitoring service
  }

  private logPerformanceMetric(url: string, duration: number) {
    // Log performance metrics
    console.info(`Performance: ${url} took ${duration}ms`);
    // TODO: Implement actual performance monitoring service
  }

  async getProductsByCategory(
    category: ProductCategory,
    page: number = 1,
    pageSize: number = 12
  ): Promise<PaginatedResponse<Product>> {
    try {
      const response = await this.fetchWithRetry(
        `/api/products?category=${this.sanitizeInput(category)}&page=${page}&pageSize=${pageSize}`
      );
      return response.json();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product | null> {
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`/api/products/${this.sanitizeInput(id)}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      return response.json();
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async validatePrescription(productId: string, prescriptionData: FormData): Promise<boolean> {
    try {
      // Validate file type and size
      const file = prescriptionData.get('prescription') as File;
      if (!this.isValidPrescriptionFile(file)) {
        throw new Error('Invalid file type or size');
      }

      const response = await this.fetchWithSecurity(
        `/api/prescriptions/validate/${this.sanitizeInput(productId)}`,
        {
          method: 'POST',
          body: prescriptionData,
        },
        { requiresAuth: true }
      );
      return response.ok;
    } catch (error) {
      console.error('Error validating prescription:', error);
      throw error;
    }
  }

  async checkPrescriptionStatus(productId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/prescriptions/status/${this.sanitizeInput(productId)}`);
      return response.ok;
    } catch (error) {
      console.error('Error checking prescription status:', error);
      return false;
    }
  }

  private isValidPrescriptionFile(file: File): boolean {
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    return file.size <= maxSize && allowedTypes.includes(file.type);
  }

  private async getAuthToken(): Promise<string | null> {
    // Implement secure token storage/retrieval
    return localStorage.getItem('auth_token');
  }

  private sanitizeInput(input: string): string {
    return input.replace(/[<>]/g, '').trim();
  }
}
