import express, { Request, Response } from 'express';
import cors from 'cors';
import { SERVER_PRODUCTS, SERVER_FARMERS } from './data/seedData';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Data Store (Synchronized with MySQL Schema Model)
let products = [...SERVER_PRODUCTS];
let farmers = [...SERVER_FARMERS];
let orders: any[] = [];

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'AgroConnect REST API', timestamp: new Date().toISOString() });
});

// Products API
app.get('/api/products', (req: Request, res: Response) => {
  const { category, search, state, organic } = req.query;
  let filtered = [...products];

  if (category) {
    filtered = filtered.filter((p) => p.categoryId === category);
  }
  if (state) {
    filtered = filtered.filter((p) => p.originState.toLowerCase() === (state as string).toLowerCase());
  }
  if (organic === 'true') {
    filtered = filtered.filter((p) => p.isOrganic);
  }
  if (search) {
    const q = (search as string).toLowerCase();
    filtered = filtered.filter(
      (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
    );
  }

  res.json({ count: filtered.length, products: filtered });
});

app.get('/api/products/:id', (req: Request, res: Response) => {
  const product = products.find((p) => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

app.post('/api/products', (req: Request, res: Response) => {
  const newProduct = {
    ...req.body,
    id: `prod-${Date.now()}`,
    ratingAvg: 5.0,
    inStock: true,
  };
  products.unshift(newProduct);
  res.status(201).json(newProduct);
});

// Farmers API
app.get('/api/farmers', (req: Request, res: Response) => {
  res.json({ count: farmers.length, farmers });
});

app.get('/api/farmers/:id', (req: Request, res: Response) => {
  const farmer = farmers.find((f) => f.id === req.params.id);
  if (!farmer) return res.status(404).json({ error: 'Farmer not found' });
  res.json(farmer);
});

app.put('/api/farmers/:id/verify', (req: Request, res: Response) => {
  const { status } = req.body;
  farmers = farmers.map((f) =>
    f.id === req.params.id
      ? { ...f, verificationStatus: status, isVerified: status === 'VERIFIED' }
      : f
  );
  res.json({ message: 'Farmer verification status updated', status });
});

// Orders API
app.get('/api/orders', (req: Request, res: Response) => {
  res.json({ count: orders.length, orders });
});

app.post('/api/orders', (req: Request, res: Response) => {
  const newOrder = {
    ...req.body,
    id: `ord-${Date.now()}`,
    orderNumber: `AGC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
    status: 'PENDING',
    paymentStatus: 'ESCROW_HELD',
    createdAt: new Date().toISOString(),
  };
  orders.unshift(newOrder);
  res.status(201).json(newOrder);
});

app.put('/api/orders/:id/status', (req: Request, res: Response) => {
  const { status } = req.body;
  orders = orders.map((o) => (o.id === req.params.id ? { ...o, status } : o));
  res.json({ message: 'Order status updated', status });
});

// Mandi Prices API
app.get('/api/mandi-prices', (req: Request, res: Response) => {
  res.json({
    updated: new Date().toISOString(),
    rates: [
      { crop: 'Red Onion', market: 'Lasalgaon APMC', modalPrice: 2750, unit: 'Quintal', trend: 'UP' },
      { crop: 'Sharbati Wheat', market: 'Khanna Mandi', modalPrice: 3200, unit: 'Quintal', trend: 'UP' },
      { crop: 'Desi Tomato', market: 'Solapur APMC', modalPrice: 3400, unit: 'Quintal', trend: 'DOWN' },
      { crop: 'Guntur Chilli', market: 'Guntur Yard', modalPrice: 19800, unit: 'Quintal', trend: 'UP' },
    ],
  });
});

// Admin Stats
app.get('/api/admin/stats', (req: Request, res: Response) => {
  res.json({
    totalGmv: 5450000,
    totalFarmers: 10450,
    totalBuyers: 15400,
    activeCrops: 2580,
    pendingVerifications: farmers.filter((f) => f.verificationStatus === 'PENDING').length,
  });
});

app.listen(PORT, () => {
  console.log(`🌾 AgroConnect API Server running on port ${PORT}`);
});
