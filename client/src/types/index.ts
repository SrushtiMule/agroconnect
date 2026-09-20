export type Role = 'ADMIN' | 'FARMER' | 'BUYER' | 'DELIVERY_PARTNER';

export type FarmingType = 'ORGANIC' | 'NATURAL' | 'CONVENTIONAL' | 'MIXED';

export type QualityGrade = 'A_PLUS' | 'A' | 'B' | 'C';

export type ProductUnit = 'KG' | 'QUINTAL' | 'TON' | 'PIECE' | 'BOX' | 'CRATE';

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PACKED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'ESCROW_HELD' | 'RELEASED_TO_FARMER' | 'REFUNDED';

export type VerificationStatus = 'PENDING' | 'VERIFIED' | 'REJECTED' | 'NEEDS_INFO';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: Role;
  avatarUrl: string;
  createdAt: string;
  token?: string;
}

export interface FarmerProfile {
  id: string;
  userId: string;
  name: string;
  farmName: string;
  farmSizeAcres: number;
  experienceYears: number;
  farmingType: FarmingType;
  bio: string;
  avatarUrl: string;
  coverImage?: string;
  state: string;
  district: string;
  village: string;
  pincode: string;
  latitude: number;
  longitude: number;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  ratingAvg: number;
  totalReviews: number;
  totalProductsCount: number;
  totalOrdersFulfilled: number;
  bankDetails?: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
  };
  documents?: {
    type: string;
    name: string;
    url: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    uploadDate: string;
  }[];
  topCrops: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  itemCount: number;
  popularItems: string[];
}

export interface Product {
  id: string;
  farmerId: string;
  farmerName: string;
  farmerAvatar: string;
  farmerRating: number;
  isFarmerVerified: boolean;
  categoryId: string;
  categoryName: string;
  name: string;
  slug: string;
  description: string;
  images: string[];
  pricePerUnit: number;
  unit: ProductUnit;
  availableQuantity: number;
  minOrderQuantity: number;
  qualityGrade: QualityGrade;
  farmingType: FarmingType;
  isOrganic: boolean;
  harvestDate: string;
  shelfLifeDays: number;
  originState: string;
  originDistrict: string;
  originVillage?: string;
  deliveryOptions: ('PICKUP' | 'FARMER_DELIVERY' | 'AGROEXPRESS')[];
  inStock: boolean;
  ratingAvg: number;
  reviewsCount: number;
  totalSales: number;
  tierDiscounts?: {
    minQuantity: number;
    discountPercent: number;
  }[];
  specifications?: {
    moistureContent?: string;
    pesticideResidual?: string;
    cultivationMethod?: string;
    soilType?: string;
  };
  createdAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  productId?: string;
  farmerId?: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  images?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedDelivery: string;
  appliedDiscount: number;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  lat?: number;
  lng?: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  unit: ProductUnit;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  buyerId: string;
  buyerName: string;
  buyerPhone: string;
  buyerEmail: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discountAmount: number;
  totalAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: 'UPI' | 'CREDIT_DEBIT_CARD' | 'NET_BANKING' | 'CASH_ON_DELIVERY';
  deliveryAddress: Address;
  deliveryType: 'STANDARD_FREIGHT' | 'AGROEXPRESS_24H' | 'FARMER_DELIVERY' | 'MANDI_PICKUP';
  createdAt: string;
  estimatedDelivery: string;
  timeline: {
    status: OrderStatus;
    title: string;
    description: string;
    timestamp: string;
    completed: boolean;
    current: boolean;
  }[];
  tracking?: {
    driverName: string;
    driverPhone: string;
    vehicleNumber: string;
    currentCoords: [number, number];
    originCoords: [number, number];
    destCoords: [number, number];
    routeSteps: string[];
  };
}

export interface MandiPrice {
  id: string;
  cropName: string;
  marketName: string;
  state: string;
  district: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  unit: string;
  priceChangePct: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  updatedDate: string;
  historicalPrices: { date: string; price: number }[];
}

export interface WeatherData {
  city: string;
  state: string;
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  rainfallProbability: number;
  windSpeed: number;
  uvIndex: number;
  soilMoisture: string;
  advisory: string;
  forecast: {
    day: string;
    tempMax: number;
    tempMin: number;
    condition: string;
    rainProb: number;
  }[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: Role;
  receiverId: string;
  messageText: string;
  timestamp: string;
  isRead: boolean;
  productCard?: {
    id: string;
    name: string;
    price: number;
    unit: string;
    image: string;
  };
  offerData?: {
    originalPrice: number;
    offerPrice: number;
    quantity: number;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  };
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'ORDER' | 'VERIFICATION' | 'PAYMENT' | 'PRICE_ALERT' | 'GENERAL';
  linkUrl: string;
  isRead: boolean;
  createdAt: string;
}

export interface AgriArticle {
  id: string;
  title: string;
  slug: string;
  category: 'Farming Techniques' | 'Organic Farming' | 'Government Schemes' | 'Pest Management' | 'Soil Health';
  readTime: string;
  imageUrl: string;
  summary: string;
  publishedDate: string;
  author: string;
  authorRole: string;
  content: string[];
}
