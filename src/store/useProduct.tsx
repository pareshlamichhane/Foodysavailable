import { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  restaurant: string;
  rating: number;
  image: string;
  description: string;
  prepTime: number;
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

interface ProductProviderProps {
  children: ReactNode;
}

const initialProducts = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', restaurant: 'Pizza Palace', rating: 4.5, image: '🍕', description: 'Classic tomato and mozzarella', prepTime: 30 },
  { id: 2, name: 'Cheeseburger', price: 8.99, category: 'Burgers', restaurant: 'Burger Haven', rating: 4.2, image: '🍔', description: 'Juicy beef patty with cheese', prepTime: 20 },
  { id: 3, name: 'Caesar Salad', price: 7.99, category: 'Salads', restaurant: 'Green Bowl', rating: 4.0, image: '🥗', description: 'Fresh romaine with caesar dressing', prepTime: 15 },
  { id: 4, name: 'Pad Thai', price: 11.99, category: 'Asian', restaurant: 'Thai Kitchen', rating: 4.7, image: '🍜', description: 'Traditional Thai noodles', prepTime: 25 },
  { id: 5, name: 'Sushi Roll', price: 14.99, category: 'Asian', restaurant: 'Sushi Bar', rating: 4.8, image: '🍱', description: 'Fresh salmon and avocado', prepTime: 20 },
];

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Debug log whenever products change
  useEffect(() => {
    console.log('🔥 PRODUCTS STATE UPDATED:', products);
  }, [products]);

  const addProduct = (product: Product) => {
    console.log('🚀 ADD PRODUCT CALLED with:', product);
    setProducts(prev => {
      const newProducts = [product, ...prev];
      console.log('📦 NEW PRODUCTS ARRAY:', newProducts);
      return newProducts;
    });
  };

  const value = { products, addProduct };

  console.log('🏗️ ProductProvider rendering with products:', products.length);

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};