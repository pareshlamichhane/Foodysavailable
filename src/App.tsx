import { useState } from 'react';
import { CartProvider, useCart } from './store/useCart';
import { AuthProvider } from './store/useAuth'; // Add this
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

export default function App() {
  return (
    <AuthProvider> {/* Add AuthProvider */}
      <ProductProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const { cart } = useCart();

  const navigate = (page: string, data: any = null) => {
    setCurrentPage(page);
    if (page === 'product-detail') setSelectedProduct(data);
    if (page === 'restaurant') setSelectedRestaurant(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage !== 'signin' && currentPage !== 'signup' && (
        <Header navigate={navigate} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      )}
      <main>
        {currentPage === 'home' && <Homepage navigate={navigate} />}
        {currentPage === 'product-detail' && <ProductDetail product={selectedProduct} navigate={navigate} />}
        {currentPage === 'cart' && <Cart navigate={navigate} />}
        {currentPage === 'delivery' && <Delivery navigate={navigate} />}
        {currentPage === 'restaurant' && <RestaurantProfile restaurant={selectedRestaurant} navigate={navigate} />}
        {currentPage === 'upload' && <UploadNewProduct navigate={navigate} />}
        {currentPage === 'signin' && <SignIn navigate={navigate} />}
        {currentPage === 'signup' && <SignUp navigate={navigate} />}
      </main>
    </div>
  );
}