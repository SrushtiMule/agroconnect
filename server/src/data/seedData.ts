export interface ProductRecord {
  id: string;
  farmerId: string;
  farmerName: string;
  categoryId: string;
  categoryName: string;
  name: string;
  description: string;
  pricePerUnit: number;
  unit: string;
  availableQuantity: number;
  minOrderQuantity: number;
  qualityGrade: string;
  isOrganic: boolean;
  originState: string;
  originDistrict: string;
  inStock: boolean;
  ratingAvg: number;
  images: string[];
}

export const SERVER_PRODUCTS: ProductRecord[] = [
  {
    id: 'prod-1',
    farmerId: 'farmer-1',
    farmerName: 'Rajesh Patil',
    categoryId: 'cat-veg',
    categoryName: 'Fresh Vegetables',
    name: 'Fresh Nashik Red Onions (Grade A+)',
    description: 'Renowned Nashik pinkish-red onions cured naturally under sun sheds. 60+ days shelf life.',
    pricePerUnit: 28,
    unit: 'KG',
    availableQuantity: 4500,
    minOrderQuantity: 10,
    qualityGrade: 'A_PLUS',
    isOrganic: true,
    originState: 'Maharashtra',
    originDistrict: 'Nashik',
    inStock: true,
    ratingAvg: 4.94,
    images: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&auto=format&fit=crop&q=80'],
  },
  {
    id: 'prod-2',
    farmerId: 'farmer-2',
    farmerName: 'Sardar Gurpreet Singh',
    categoryId: 'cat-grains',
    categoryName: 'Grains & Cereals',
    name: 'Punjab Sharbati Golden Wheat (Whole Grain)',
    description: 'The king of Indian wheat. Heavy, lustrous golden grains with high natural gluten.',
    pricePerUnit: 32,
    unit: 'KG',
    availableQuantity: 12000,
    minOrderQuantity: 25,
    qualityGrade: 'A_PLUS',
    isOrganic: true,
    originState: 'Punjab',
    originDistrict: 'Ludhiana',
    inStock: true,
    ratingAvg: 4.98,
    images: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80'],
  },
];

export const SERVER_FARMERS = [
  {
    id: 'farmer-1',
    name: 'Rajesh Patil',
    farmName: 'Patil Organic Agri Farms',
    farmSizeAcres: 18.5,
    experienceYears: 16,
    state: 'Maharashtra',
    district: 'Nashik',
    isVerified: true,
    verificationStatus: 'VERIFIED',
    ratingAvg: 4.92,
  },
  {
    id: 'farmer-2',
    name: 'Sardar Gurpreet Singh',
    farmName: 'Golden Fields Bio-Estate',
    farmSizeAcres: 42.0,
    experienceYears: 24,
    state: 'Punjab',
    district: 'Ludhiana',
    isVerified: true,
    verificationStatus: 'VERIFIED',
    ratingAvg: 4.95,
  },
];
