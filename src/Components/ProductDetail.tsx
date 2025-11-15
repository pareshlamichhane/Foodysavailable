import { Star, Clock } from 'lucide-react';
import { useCart } from '../store/useCart';

export default function ProductDetail({ product, navigate }: any) {
  const { addToCart } = useCart();

  if (!product) return <div className="p-8 text-center">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate('home')} className="mb-4 text-orange-600 hover:underline">
        ← Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="text-9xl text-center py-16 bg-gray-50">
          {product.image}
        </div>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.restaurant}</p>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1">
              <Star size={20} className="text-yellow-500 fill-yellow-500" />
              <span className="font-bold">{product.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-gray-500" />
              <span>{product.prepTime} min</span>
            </div>
            <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          <p className="text-gray-700 mb-6">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-orange-600">${product.price}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-orange-600 text-white px-8 py-3 rounded-lg hover:bg-orange-700"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}