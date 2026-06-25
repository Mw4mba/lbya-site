export type ProductCode =
  | 'MCT_BASIC'
  | 'MCT_PROFESSIONAL'
  | 'MCT_ENTERPRISE'
  | 'NBC_ESSENTIAL'
  | 'NBC_PROFESSIONAL'
  | 'NBC_ENTERPRISE'
  | 'NBC_SECURE_OFFLINE'
  | 'ADD_ON';

export type BillingTerm = 'monthly' | 'yearly' | 'three_years';

export type CartAddOn = {
  addOnCode: string;
  addOnName?: string;
  quantity: number;
  unitPriceEur?: number;
};

export type CartItem = {
  productCode: ProductCode;
  productName: string;
  planCode: string;
  billingTerm: BillingTerm;
  seats: number;
  basePriceEur: number;
  seatPriceEur?: number;
  addOns?: CartAddOn[];
  stripePriceId?: string;
};

export type CheckoutRequestPayload = {
  productCode: ProductCode;
  planCode: string;
  billingTerm: BillingTerm;
  seats: number;
  addOns?: Array<Pick<CartAddOn, 'addOnCode' | 'quantity'>>;
  customerEmail: string;
  companyName?: string;
  organizationId?: string;
  workspaceId?: string;
  successUrl?: string;
  cancelUrl?: string;
};

export type BillingStatusResponse = {
  status: 'completed' | 'pending' | 'failed' | 'not_found';
  paymentStatus: 'paid' | 'unpaid' | 'pending' | 'failed' | 'unknown';
  customerEmail?: string;
  subscriptionStatus?: string;
  productAccessStatus?: string;
};
