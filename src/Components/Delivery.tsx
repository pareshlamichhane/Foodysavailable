import { useState } from "react";
import { useCart } from "../store/useCart";

export default function Delivery({ navigate }) {
  const { cart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    instructions: ''
  });

  const handleSubmit = () => {
    alert('Order placed successfully! 🎉');
    navigate('home');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 3.99;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Delivery Details</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">Full Name</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Delivery Address</label>
              <input
                type="text"
                required
                className="w-full border rounded-lg px-4 py-2"
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">City</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">Zip Code</label>
                <input
                  type="text"
                  required
                  className="w-full border rounded-lg px-4 py-2"
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Delivery Instructions (Optional)</label>
              <textarea
                className="w-full border rounded-lg px-4 py-2"
                rows="3"
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
            >
              Place Order - ${total.toFixed(2)}
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between">
                <span>{item.name} x{item.quantity}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>$3.99</span>
            </div>
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span className="text-orange-600">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}