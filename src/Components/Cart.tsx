import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../store/useCart';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 3.99;
  const total = subtotal + deliveryFee;
  const navigate = useNavigate();
  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-gray-600 mb-6">Add some delicious food to get started!</p>
        <button onClick={() => navigate('/')} className="bg-orange-600 text-white px-6 py-3 rounded-lg">
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        {cart.map(item => (
          <div key={item.id} className="flex items-center gap-4 py-4 border-b last:border-b-0">
            <div className="text-4xl">{item.image}</div>
            <div className="flex-1">
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.restaurant}</p>
              <p className="text-orange-600 font-bold">${item.price}</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
              >
                <Minus size={16} />
              </button>
              <span className="font-bold w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-100"
              >
                <Plus size={16} />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-xl font-bold pt-2 border-t">
            <span>Total</span>
            <span className="text-orange-600">${total.toFixed(2)}</span>
          </div>
        </div>
        <button
          onClick={() => navigate('delivery')}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}