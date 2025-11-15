import {mockProducts} from "./jsondata.js"
import { Clock, MapPin, Star } from "lucide-react";
import ProductCard from "./ProductCard";

export default function RestaurantProfile({ restaurant, navigate }) {
  if (!restaurant) return <div className="p-8 text-center">Restaurant not found</div>;

  const restaurantProducts = mockProducts.filter(p => p.restaurant === restaurant.name);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button onClick={() => navigate('home')} className="mb-4 text-orange-600 hover:underline">
        ← Back
      </button>
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
        <div className="flex items-center gap-6 text-gray-600">
          <div className="flex items-center gap-1">
            <Star size={20} className="text-yellow-500 fill-yellow-500" />
            <span>{restaurant.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} />
            <span>{restaurant.deliveryTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} />
            <span>Min. Order: ${restaurant.minOrder}</span>
          </div>
          <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
            {restaurant.cuisine}
          </span>
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {restaurantProducts.map(product => (
          <ProductCard key={product.id} product={product} navigate={navigate} />
        ))}
      </div>
    </div>
  );
}