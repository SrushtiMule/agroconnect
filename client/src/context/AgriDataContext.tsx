import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  FarmerProfile,
  Order,
  MandiPrice,
  Review,
  ChatMessage,
  NotificationItem,
  AgriArticle,
  WeatherData,
  OrderStatus,
  VerificationStatus,
} from '../types';
import { safeReadStorage, safeWriteStorage } from '../utils/storage';
import {
  PRODUCTS,
  FARMERS,
  MOCK_ORDERS,
  MANDI_PRICES,
  MOCK_REVIEWS,
  MOCK_CHAT_MESSAGES,
  MOCK_NOTIFICATIONS,
  MOCK_ARTICLES,
  MOCK_WEATHER,
  CATEGORIES,
} from '../data/mockData';

interface AgriDataContextType {
  products: Product[];
  farmers: FarmerProfile[];
  orders: Order[];
  mandiPrices: MandiPrice[];
  reviews: Review[];
  chatMessages: ChatMessage[];
  notifications: NotificationItem[];
  articles: AgriArticle[];
  weather: WeatherData;
  // Product actions
  addProduct: (newProduct: Omit<Product, 'id' | 'createdAt' | 'ratingAvg' | 'reviewsCount' | 'totalSales'>) => Product;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  // Farmer actions
  addFarmer: (newFarmer: Partial<FarmerProfile>) => FarmerProfile;
  verifyFarmer: (farmerId: string, status: VerificationStatus, note?: string) => void;
  // Order actions
  createOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>) => Order;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus, note?: string) => void;
  // Chat actions
  sendChatMessage: (msg: { receiverId: string; messageText: string; productCard?: any; offerData?: any }) => void;
  // Review actions
  addReview: (review: Omit<Review, 'id' | 'date'>) => void;
  // Notification actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => void;
}

const AgriDataContext = createContext<AgriDataContextType | undefined>(undefined);

export const AgriDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    return safeReadStorage<Product[]>('agroconnect_products', PRODUCTS);
  });

  const [farmers, setFarmers] = useState<FarmerProfile[]>(() => {
    return safeReadStorage<FarmerProfile[]>('agroconnect_farmers', FARMERS);
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    return safeReadStorage<Order[]>('agroconnect_orders', MOCK_ORDERS);
  });

  const [mandiPrices, setMandiPrices] = useState<MandiPrice[]>(() => {
    return safeReadStorage<MandiPrice[]>('agroconnect_mandi', MANDI_PRICES);
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    return safeReadStorage<Review[]>('agroconnect_reviews', MOCK_REVIEWS);
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    return safeReadStorage<ChatMessage[]>('agroconnect_chats', MOCK_CHAT_MESSAGES);
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    return safeReadStorage<NotificationItem[]>('agroconnect_notifications', MOCK_NOTIFICATIONS);
  });

  useEffect(() => {
    safeWriteStorage('agroconnect_products', products);
  }, [products]);

  useEffect(() => {
    safeWriteStorage('agroconnect_farmers', farmers);
  }, [farmers]);

  useEffect(() => {
    safeWriteStorage('agroconnect_orders', orders);
  }, [orders]);

  useEffect(() => {
    safeWriteStorage('agroconnect_reviews', reviews);
  }, [reviews]);

  useEffect(() => {
    safeWriteStorage('agroconnect_chats', chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    safeWriteStorage('agroconnect_notifications', notifications);
  }, [notifications]);

  // Product Methods
  const addProduct = (newProduct: Omit<Product, 'id' | 'createdAt' | 'ratingAvg' | 'reviewsCount' | 'totalSales'>): Product => {
    const product: Product = {
      ...newProduct,
      id: `prod-${Date.now()}`,
      ratingAvg: 5.0,
      reviewsCount: 0,
      totalSales: 0,
      createdAt: new Date().toISOString(),
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p)));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Farmer Methods
  const addFarmer = (newFarmerData: Partial<FarmerProfile>): FarmerProfile => {
    const newFarmer: FarmerProfile = {
      id: `farmer-${Date.now()}`,
      userId: newFarmerData.userId || `user-${Date.now()}`,
      name: newFarmerData.name || 'New Farmer',
      farmName: newFarmerData.farmName || 'Green Farm',
      farmSizeAcres: newFarmerData.farmSizeAcres || 5,
      experienceYears: newFarmerData.experienceYears || 5,
      farmingType: newFarmerData.farmingType || 'ORGANIC',
      bio: newFarmerData.bio || 'Passionate about sustainable organic farming in India.',
      avatarUrl: newFarmerData.avatarUrl || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&auto=format&fit=crop&q=80',
      state: newFarmerData.state || 'Maharashtra',
      district: newFarmerData.district || 'Nashik',
      village: newFarmerData.village || 'Niphad',
      pincode: newFarmerData.pincode || '422303',
      latitude: newFarmerData.latitude || 20.0784,
      longitude: newFarmerData.longitude || 74.1089,
      isVerified: false,
      verificationStatus: 'PENDING',
      ratingAvg: 5.0,
      totalReviews: 0,
      totalProductsCount: 0,
      totalOrdersFulfilled: 0,
      topCrops: newFarmerData.topCrops || ['Vegetables'],
      documents: [
        {
          type: '7/12 Land Record',
          name: '7_12_Extract_Niphad_Farm.pdf',
          url: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&auto=format&fit=crop&q=80',
          status: 'PENDING',
          uploadDate: new Date().toISOString().split('T')[0],
        },
        {
          type: 'Aadhaar Card',
          name: 'Aadhaar_Front_Back.pdf',
          url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop&q=80',
          status: 'PENDING',
          uploadDate: new Date().toISOString().split('T')[0],
        },
      ],
    };
    setFarmers((prev) => [newFarmer, ...prev]);
    return newFarmer;
  };

  const verifyFarmer = (farmerId: string, status: VerificationStatus, note?: string) => {
    setFarmers((prev) =>
      prev.map((f) =>
        f.id === farmerId
          ? {
              ...f,
              verificationStatus: status,
              isVerified: status === 'VERIFIED',
            }
          : f
      )
    );

    // Also update notification
    addNotification({
      title: `Farmer Verification: ${status === 'VERIFIED' ? 'Approved' : 'Status Updated'}`,
      message: `Farmer profile has been marked as ${status}. ${note || ''}`,
      type: 'VERIFICATION',
      linkUrl: `/farmer/${farmerId}`,
    });
  };

  // Order Methods
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'timeline'>): Order => {
    const orderId = `ord-${Date.now().toString().slice(-4)}`;
    const orderNumber = `AGC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          status: 'PENDING',
          title: 'Order Placed & Escrow Secured',
          description: 'Payment verified and held safely in AgroConnect Escrow.',
          timestamp: 'Just now',
          completed: true,
          current: true,
        },
        {
          status: 'CONFIRMED',
          title: 'Farmer Confirmation Pending',
          description: `Waiting for ${orderData.farmerName} to review harvest batch.`,
          timestamp: 'Pending',
          completed: false,
          current: false,
        },
        {
          status: 'PACKED',
          title: 'Quality Sorting & Packing',
          description: 'Sorting produce by grade and eco-friendly crate packaging.',
          timestamp: 'Pending',
          completed: false,
          current: false,
        },
        {
          status: 'OUT_FOR_DELIVERY',
          title: 'AgroExpress Transit',
          description: 'Dispatched on refrigerated vehicle directly from farm origin.',
          timestamp: 'Pending',
          completed: false,
          current: false,
        },
        {
          status: 'DELIVERED',
          title: 'Delivered & Escrow Settlement',
          description: 'Safe delivery confirmed at buyer destination.',
          timestamp: 'Pending',
          completed: false,
          current: false,
        },
      ],
      tracking: {
        driverName: 'Ramesh Patil Logistics',
        driverPhone: '+91 98221 55667',
        vehicleNumber: 'MH-15-TC-7890 (Agri Express Van)',
        currentCoords: [19.5000, 73.8000],
        originCoords: [20.0784, 74.1089],
        destCoords: [
          orderData.deliveryAddress?.lat || 18.5204,
          orderData.deliveryAddress?.lng || 73.8567,
        ],
        routeSteps: [
          'Farm Pick-up Node',
          'District Sorting Hub',
          'Highway Express Route',
          'Destination Cluster',
          'Final Doorstep Delivery',
        ],
      },
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Send notification
    addNotification({
      title: `Order ${orderNumber} Placed Successfully 🎉`,
      message: `Your farm produce order of ₹${orderData.totalAmount.toLocaleString('en-IN')} has been sent to ${orderData.farmerName}.`,
      type: 'ORDER',
      linkUrl: `/tracking/${orderId}`,
    });

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, note?: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const updatedTimeline = order.timeline.map((step) => {
          if (step.status === newStatus) {
            return {
              ...step,
              completed: true,
              current: true,
              timestamp: 'Updated just now',
              description: note || step.description,
            };
          }
          // Mark previous steps as completed
          const statusOrder: OrderStatus[] = ['PENDING', 'CONFIRMED', 'PACKED', 'OUT_FOR_DELIVERY', 'DELIVERED'];
          const currentIndex = statusOrder.indexOf(newStatus);
          const stepIndex = statusOrder.indexOf(step.status);
          return {
            ...step,
            completed: stepIndex <= currentIndex,
            current: stepIndex === currentIndex,
          };
        });

        const updatedPaymentStatus = newStatus === 'DELIVERED' ? 'RELEASED_TO_FARMER' : order.paymentStatus;

        return {
          ...order,
          status: newStatus,
          paymentStatus: updatedPaymentStatus,
          timeline: updatedTimeline,
        };
      })
    );

    addNotification({
      title: `Order Status Updated: ${newStatus.replace(/_/g, ' ')}`,
      message: `Order #${orderId} is now marked as ${newStatus.toLowerCase().replace(/_/g, ' ')}.`,
      type: 'ORDER',
      linkUrl: `/tracking/${orderId}`,
    });
  };

  // Chat Methods
  const sendChatMessage = (msg: { receiverId: string; messageText: string; productCard?: any; offerData?: any }) => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'current-user',
      senderName: 'You',
      senderRole: 'BUYER',
      receiverId: msg.receiverId,
      messageText: msg.messageText,
      timestamp: 'Just now',
      isRead: false,
      productCard: msg.productCard,
      offerData: msg.offerData,
    };
    setChatMessages((prev) => [...prev, newMsg]);

    // Simulate instant farmer response after 1.5s
    setTimeout(() => {
      const replyMsg: ChatMessage = {
        id: `msg-reply-${Date.now()}`,
        senderId: msg.receiverId,
        senderName: 'Farmer Rajesh Patil',
        senderRole: 'FARMER',
        receiverId: 'current-user',
        messageText: msg.offerData
          ? `Thank you for your bulk offer! We can fulfill your requirement of ${msg.offerData.quantity} KG at ₹${msg.offerData.offerPrice}/KG. I have approved this special rate.`
          : 'Thank you for reaching out! We are currently harvesting our freshest batch. All items are sorted Grade A+ with zero chemical residues. Let me know if you need custom bulk packing.',
        timestamp: 'Just now',
        isRead: false,
      };
      setChatMessages((prev) => [...prev, replyMsg]);
    }, 1500);
  };

  // Review Methods
  const addReview = (reviewData: Omit<Review, 'id' | 'date'>) => {
    const newRev: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: 'Today',
      verifiedPurchase: true,
    };
    setReviews((prev) => [newRev, ...prev]);

    // Recalculate product rating if applicable
    if (reviewData.productId) {
      setProducts((prev) =>
        prev.map((p) => {
          if (p.id !== reviewData.productId) return p;
          const currentTotal = p.ratingAvg * p.reviewsCount;
          const newCount = p.reviewsCount + 1;
          const newAvg = Number(((currentTotal + reviewData.rating) / newCount).toFixed(2));
          return {
            ...p,
            ratingAvg: newAvg,
            reviewsCount: newCount,
          };
        })
      );
    }
  };

  // Notification Methods
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const addNotification = (notif: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>) => {
    const newNotif: NotificationItem = {
      ...notif,
      id: `notif-${Date.now()}`,
      createdAt: 'Just now',
      isRead: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  return (
    <AgriDataContext.Provider
      value={{
        products,
        farmers,
        orders,
        mandiPrices,
        reviews,
        chatMessages,
        notifications,
        articles: MOCK_ARTICLES,
        weather: MOCK_WEATHER,
        addProduct,
        updateProduct,
        deleteProduct,
        addFarmer,
        verifyFarmer,
        createOrder,
        updateOrderStatus,
        sendChatMessage,
        addReview,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        addNotification,
      }}
    >
      {children}
    </AgriDataContext.Provider>
  );
};

export const useAgriData = () => {
  const context = useContext(AgriDataContext);
  if (!context) {
    throw new Error('useAgriData must be used within an AgriDataProvider');
  }
  return context;
};
