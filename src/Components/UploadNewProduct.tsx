import { useState } from 'react';
import { useProducts } from '../store/useProduct';

export default function UploadNewProduct({ navigate }: any) {
  const { addProduct, products } = useProducts();
  
  console.log('📋 UploadNewProduct - Current products count:', products.length);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Pizza',
    restaurant: '',
    description: '',
    prepTime: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.price || !formData.restaurant || !formData.prepTime || !formData.description) {
      alert('Please fill all fields!');
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: formData.name,
      price: parseFloat(formData.price),
      category: formData.category,
      restaurant: formData.restaurant,
      rating: 4.5,
      image: '🍽️',
      description: formData.description,
      prepTime: parseInt(formData.prepTime)
    };

    console.log('✅ Submitting product:', newProduct);
    addProduct(newProduct);
    console.log('✅ addProduct called successfully');
    
    alert('Product uploaded! Check homepage.');
    
    // Reset form
    setFormData({
      name: '',
      price: '',
      category: 'Pizza',
      restaurant: '',
      description: '',
      prepTime: ''
    });
    
    navigate('home');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Upload New Product (Admin)</h1>
      <p className="mb-4 text-sm text-gray-600">Currently {products.length} products in system</p>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2">Product Name *</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="e.g., Supreme Pizza"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Price ($) *</label>
            <input
              type="number"
              step="0.01"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
              placeholder="e.g., 15.99"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Category *</label>
            <select
              className="w-full border rounded-lg px-4 py-2"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Pizza</option>
              <option>Burgers</option>
              <option>Salads</option>
              <option>Asian</option>
              <option>Mexican</option>
              <option>Italian</option>
              <option>Appetizers</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Restaurant Name *</label>
            <input
              type="text"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.restaurant}
              onChange={(e) => setFormData({...formData, restaurant: e.target.value})}
              placeholder="e.g., Joe's Pizza"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Preparation Time (minutes) *</label>
            <input
              type="number"
              required
              className="w-full border rounded-lg px-4 py-2"
              value={formData.prepTime}
              onChange={(e) => setFormData({...formData, prepTime: e.target.value})}
              placeholder="e.g., 30"
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold mb-2">Description *</label>
            <textarea
              required
              className="w-full border rounded-lg px-4 py-2"
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the product..."
            />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
            >
              Upload Product
            </button>
            <button
              onClick={() => navigate('home')}
              className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}