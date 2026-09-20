import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AgriDataProvider } from './context/AgriDataContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';

import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

// Pages
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { ProductDetail } from './pages/ProductDetail';
import { Categories } from './pages/Categories';
import { FarmersDirectory } from './pages/FarmersDirectory';
import { FarmerProfile } from './pages/FarmerProfile';
import { FarmerRegistration } from './pages/FarmerRegistration';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderTracking } from './pages/OrderTracking';
import { Orders } from './pages/Orders';
import { Wishlist } from './pages/Wishlist';
import { Messages } from './pages/Messages';
import { MarketPrices } from './pages/MarketPrices';
import { WeatherAdvisory } from './pages/WeatherAdvisory';
import { AgriKnowledge } from './pages/AgriKnowledge';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Notifications } from './pages/Notifications';
import { Profile } from './pages/Profile';
import { Login } from './pages/Auth/Login';
import { Register } from './pages/Auth/Register';

// Farmer Pages
import { FarmerDashboard } from './pages/farmer/FarmerDashboard';
import { FarmerProducts } from './pages/farmer/FarmerProducts';
import { FarmerAddProduct } from './pages/farmer/FarmerAddProduct';
import { FarmerOrders } from './pages/farmer/FarmerOrders';
import { FarmerPayments } from './pages/farmer/FarmerPayments';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminVerification } from './pages/admin/AdminVerification';
import { AdminComplaints } from './pages/admin/AdminComplaints';

export function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path.split('?')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Router Renderer
  const renderCurrentPage = () => {
    const path = currentPath;

    if (path === '/') return <Home navigate={navigate} />;
    if (path === '/marketplace') return <Marketplace navigate={navigate} />;
    if (path.startsWith('/product/')) {
      const id = path.replace('/product/', '');
      return <ProductDetail productId={id} navigate={navigate} />;
    }
    if (path === '/categories') return <Categories navigate={navigate} />;
    if (path === '/farmers') return <FarmersDirectory navigate={navigate} />;
    if (path.startsWith('/farmer/') && !path.startsWith('/farmer/dashboard') && !path.startsWith('/farmer/products') && !path.startsWith('/farmer/orders') && !path.startsWith('/farmer/payments') && !path.startsWith('/farmer/register')) {
      const id = path.replace('/farmer/', '');
      return <FarmerProfile farmerId={id} navigate={navigate} />;
    }
    if (path === '/farmer/register') return <FarmerRegistration navigate={navigate} />;
    if (path === '/farmer/dashboard') return <FarmerDashboard navigate={navigate} />;
    if (path === '/farmer/products') return <FarmerProducts navigate={navigate} />;
    if (path === '/farmer/products/add') return <FarmerAddProduct navigate={navigate} />;
    if (path === '/farmer/orders') return <FarmerOrders navigate={navigate} />;
    if (path === '/farmer/payments') return <FarmerPayments navigate={navigate} />;

    if (path === '/cart') return <Cart navigate={navigate} />;
    if (path === '/checkout') return <Checkout navigate={navigate} />;
    if (path.startsWith('/tracking/')) {
      const id = path.replace('/tracking/', '');
      return <OrderTracking orderId={id} navigate={navigate} />;
    }
    if (path === '/orders') return <Orders navigate={navigate} />;
    if (path === '/wishlist') return <Wishlist navigate={navigate} />;
    if (path === '/messages') return <Messages navigate={navigate} />;
    if (path === '/market-prices') return <MarketPrices navigate={navigate} />;
    if (path === '/weather') return <WeatherAdvisory navigate={navigate} />;
    if (path === '/knowledge') return <AgriKnowledge navigate={navigate} />;
    if (path === '/about') return <About navigate={navigate} />;
    if (path === '/contact') return <Contact navigate={navigate} />;
    if (path === '/notifications') return <Notifications navigate={navigate} />;
    if (path === '/profile') return <Profile navigate={navigate} />;
    if (path === '/login') return <Login navigate={navigate} />;
    if (path === '/register') return <Register navigate={navigate} />;

    if (path === '/admin/dashboard') return <AdminDashboard navigate={navigate} />;
    if (path === '/admin/verification') return <AdminVerification navigate={navigate} />;
    if (path === '/admin/complaints') return <AdminComplaints navigate={navigate} />;

    // Fallback
    return <Home navigate={navigate} />;
  };

  return (
    <AuthProvider>
      <AgriDataProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen flex flex-col bg-[#FBF9F4] text-slate-900 font-sans">
              {/* Navigation Header */}
              <Navbar currentPath={currentPath} navigate={navigate} />

              {/* Active Route Page Content */}
              <main className="flex-1">
                {renderCurrentPage()}
              </main>

              {/* Footer */}
              <Footer navigate={navigate} />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AgriDataProvider>
    </AuthProvider>
  );
}

export default App;
