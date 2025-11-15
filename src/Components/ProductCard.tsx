import { Star } from "lucide-react";
import { useCart } from "../store/useCart";

export default function ProductCard({ product, navigate }: any) {
  const { addToCart } = useCart();
  
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer">
      <div onClick={() => navigate('product-detail', product)}>
        <div className="text-6xl text-center py-8 bg-gray-50 rounded-t-lg">
          {product.image}
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg mb-1">{product.name}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.restaurant}</p>
          <div className="flex items-center gap-2 mb-2">
            <Star size={16} className="text-yellow-500 fill-yellow-500" />
            <span className="text-sm">{product.rating}</span>
            <span className="text-sm text-gray-500">• {product.prepTime} min</span>
          </div>
          <p className="text-orange-600 font-bold text-xl mb-3">${product.price}</p>
        </div>
      </div>
      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}