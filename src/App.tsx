import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { CartProvider, useCart } from './store/useCart';
import { AuthProvider } from './store/useAuth';
import Homepage from './pages/HomePage';
import ProductDetail from './Components/ProductDetail';
import Cart from './Components/Cart';
import Delivery from './Components/Delivery';
import RestaurantProfile from './Components/RestaurantProfile';
import UploadNewProduct from './Components/UploadNewProduct';
import Header from './Components/Header';
import { ProductProvider } from './store/useProduct';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import VerifyOTP from './pages/VerifyOTP';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <AppContent />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const { cart } = useCart();

  // Determine if we should show the header based on the current path
  const authPaths = ['/signin', '/signup', '/forgot-password', '/verify-otp', '/reset-password'];
  const showHeader = !authPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <Header cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/restaurant/:id" element={<RestaurantProfile />} />
          <Route path="/upload" element={<UploadNewProduct />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </main>
    </div>
  );
}