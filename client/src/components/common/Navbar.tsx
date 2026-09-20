import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAgriData } from '../../context/AgriDataContext';
import {
  Sprout,
  ShoppingBag,
  Heart,
  Bell,
  User,
  Search,
  Menu,
  X,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  TrendingUp,
  CloudSun,
  BookOpen,
  MapPin,
  ShieldCheck,
  Package,
} from 'lucide-react';

interface NavbarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, navigate }) => {
  const { currentUser, currentRole, logout } = useAuth();
  const { itemCount } = useCart();
  const { wishlistIds } = useWishlist();
  const { notifications, markNotificationAsRead } = useAgriData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const unreadNotifs = notifications.filter((n) => !n.isRead);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/marketplace?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Marketplace', path: '/marketplace' },
    { label: 'Farmers', path: '/farmers' },
    { label: 'Categories', path: '/categories' },
    { label: 'Mandi Prices', path: '/market-prices', icon: <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> },
    { label: 'Weather', path: '/weather', icon: <CloudSun className="w-3.5 h-3.5 text-amber-500" /> },
    { label: 'Agri Knowledge', path: '/knowledge', icon: <BookOpen className="w-3.5 h-3.5 text-forest-600" /> },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-earth-100 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-forest-800 to-forest-600 flex items-center justify-center text-white shadow-md shadow-forest-900/10 group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 flex items-center">
                Agro<span className="text-forest-600">Connect</span>
              </span>
              <span className="text-[10px] font-semibold text-emerald-700 tracking-wider uppercase block -mt-1">
                Kisan-to-Buyer Marketplace
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center relative flex-1 max-w-md mx-4"
          >
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search crops, onions, wheat, turmeric, organic vegetables..."
              className="w-full bg-earth-50/80 hover:bg-earth-50 focus:bg-white text-slate-800 placeholder-slate-400 text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-full border border-earth-200 focus:border-forest-600 focus:ring-2 focus:ring-forest-500/20 transition-all outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          </form>

          {/* Nav Links - Desktop */}
          <nav className="hidden xl:flex items-center gap-1.5 text-sm font-medium text-slate-600">
            {navLinks.slice(0, 7).map((item) => {
              const active = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors ${
                    active
                      ? 'bg-forest-50 text-forest-700 font-semibold'
                      : 'hover:bg-earth-50 hover:text-slate-900'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Buttons & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              onClick={() => navigate('/wishlist')}
              title="Saved Produce"
              className="relative p-2.5 rounded-full hover:bg-earth-100 text-slate-600 hover:text-rose-600 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlistIds.length}
                </span>
              )}
            </button>

            {/* Notifications Center */}
            <div className="relative">
              <button
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                title="Notifications"
                className="relative p-2.5 rounded-full hover:bg-earth-100 text-slate-600 hover:text-forest-700 transition-colors"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-emerald-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {notifDropdownOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-earth-100 py-3 z-50 animate-fade-in">
                  <div className="flex items-center justify-between px-4 pb-2 border-b border-earth-100">
                    <span className="font-bold text-slate-900 text-sm">Notifications</span>
                    <button
                      onClick={() => {
                        navigate('/notifications');
                        setNotifDropdownOpen(false);
                      }}
                      className="text-xs text-forest-600 hover:underline font-semibold"
                    >
                      View All
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto divide-y divide-earth-50">
                    {notifications.slice(0, 4).map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => {
                          markNotificationAsRead(notif.id);
                          if (notif.linkUrl) navigate(notif.linkUrl);
                          setNotifDropdownOpen(false);
                        }}
                        className={`p-3 text-xs cursor-pointer hover:bg-earth-50 transition-colors ${
                          !notif.isRead ? 'bg-forest-50/50' : ''
                        }`}
                      >
                        <p className="font-semibold text-slate-800">{notif.title}</p>
                        <p className="text-slate-500 mt-0.5 line-clamp-2">{notif.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">{notif.createdAt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Shopping Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              className="relative flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 px-3.5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all border border-emerald-200"
            >
              <ShoppingBag className="w-4 h-4 text-emerald-700" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="bg-forest-700 text-white text-[11px] font-bold px-1.5 py-0.2 rounded-full">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Farmer Sell CTA / Dashboard Button */}
            {currentRole === 'FARMER' ? (
              <button
                onClick={() => navigate('/farmer/dashboard')}
                className="hidden md:flex items-center gap-1.5 bg-gradient-to-r from-forest-700 to-forest-600 hover:from-forest-800 hover:to-forest-700 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-forest-900/15 hover:shadow-lg transition-all"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Farmer Desk</span>
              </button>
            ) : currentRole === 'ADMIN' ? (
              <button
                onClick={() => navigate('/admin/dashboard')}
                className="hidden md:flex items-center gap-1.5 bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Console</span>
              </button>
            ) : (
              <button
                onClick={() => navigate('/farmer/register')}
                className="hidden md:flex items-center gap-1.5 bg-forest-700 hover:bg-forest-800 text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-md transition-all"
              >
                <Sprout className="w-4 h-4" />
                <span>Sell Produce</span>
              </button>
            )}

            {/* Profile Avatar & Dropdown or Sign In */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-full hover:bg-earth-100 transition-colors border border-transparent hover:border-earth-200"
                >
                  <img
                    src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full object-cover border border-forest-600"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-earth-100 py-2 z-50 animate-fade-in text-xs">
                    <div className="px-4 py-2.5 border-b border-earth-100">
                      <p className="font-bold text-slate-900 text-sm">{currentUser?.name}</p>
                      <p className="text-slate-500 text-[11px] truncate">{currentUser?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                        {currentRole}
                      </span>
                    </div>

                  {currentRole === 'FARMER' && (
                    <>
                      <button
                        onClick={() => {
                          navigate('/farmer/dashboard');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-slate-700"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-600" />
                        <span>Farmer Dashboard</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/farmer/products');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-slate-700"
                      >
                        <Package className="w-4 h-4 text-emerald-600" />
                        <span>My Crop Listings</span>
                      </button>
                      <button
                        onClick={() => {
                          navigate('/farmer/orders');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-slate-700"
                      >
                        <ShoppingBag className="w-4 h-4 text-emerald-600" />
                        <span>Farmer Orders</span>
                      </button>
                    </>
                  )}

                  {currentRole === 'ADMIN' && (
                    <button
                      onClick={() => {
                        navigate('/admin/dashboard');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-purple-700 font-semibold"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Admin Overview</span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      navigate('/orders');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-slate-700"
                  >
                    <ShoppingBag className="w-4 h-4 text-slate-500" />
                    <span>My Buyer Orders</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/messages');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-slate-700"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Farmer Chat</span>
                  </button>

                  <button
                    onClick={() => {
                      navigate('/profile');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-earth-50 flex items-center gap-2 text-slate-700"
                  >
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile Settings</span>
                  </button>

                  <div className="border-t border-earth-100 mt-1 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                        navigate('/login');
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 flex items-center gap-2 text-rose-600 font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/login')}
                className="text-xs font-bold text-slate-700 hover:text-forest-700 px-3 py-2 rounded-xl hover:bg-earth-100 transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all shadow-xs"
              >
                Register
              </button>
            </div>
          )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-slate-600 hover:bg-earth-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden pb-6 pt-2 border-t border-earth-100 animate-slide-up space-y-3">
            <form onSubmit={handleSearch} className="relative px-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search crops, grains, fruits..."
                className="w-full bg-earth-50 pl-10 pr-4 py-2 rounded-lg border border-earth-200 text-sm outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-5 top-3" />
            </form>

            <div className="grid grid-cols-2 gap-1 px-2 text-sm font-medium">
              {navLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-slate-700 hover:bg-forest-50 hover:text-forest-700"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="px-2 pt-2 border-t border-earth-100 flex gap-2">
              <button
                onClick={() => {
                  navigate('/farmer/register');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 bg-forest-700 text-white text-center py-2.5 rounded-lg text-sm font-semibold"
              >
                Sell on AgroConnect
              </button>
              <button
                onClick={() => {
                  navigate('/marketplace');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 bg-earth-100 text-slate-800 text-center py-2.5 rounded-lg text-sm font-semibold"
              >
                Browse Crops
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
