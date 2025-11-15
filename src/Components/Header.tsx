import { ShoppingCart } from "lucide-react";
import {mockRestaurants} from "./jsondata.js"
 export default function Header({ navigate, cartCount }) {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-orange-600 cursor-pointer" onClick={() => navigate('home')}>
          FoodHub
        </h1>
        <nav className="flex gap-6 items-center">
          <button onClick={() => navigate('home')} className="hover:text-orange-600">Home</button>
          <button onClick={() => navigate('restaurant', mockRestaurants[0])} className="hover:text-orange-600">Restaurants</button>
          <button onClick={() => navigate('upload')} className="hover:text-orange-600">Upload Product</button>
          <button onClick={() => navigate('cart')} className="relative hover:text-orange-600">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}