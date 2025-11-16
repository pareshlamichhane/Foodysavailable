import { ShoppingCart, User, LogOut } from 'lucide-react';
import { useCart } from '../store/useCart';
import  useAuth  from '../store/useAuth';

export default function Header({ navigate }: any) {
  const { cart } = useCart();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    navigate('home');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600 cursor-pointer" onClick={() => navigate('home')}>
          FoodHub
        </h1>
        <nav className="flex gap-6 items-center">
          <button onClick={() => navigate('home')} className="hover:text-orange-600">
            Home
          </button>
          
          {isAdmin && (
            <button onClick={() => navigate('upload')} className="hover:text-orange-600">
              Upload Product
            </button>
          )}
          
          <button onClick={() => navigate('cart')} className="relative hover:text-orange-600">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <User size={20} className="text-orange-600" />
                <span className="text-sm font-medium">{user?.name}</span>
                {isAdmin && (
                  <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-600"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate('signin')}
              className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700"
            >
              Sign In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}