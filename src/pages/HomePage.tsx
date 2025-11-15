import { useState } from 'react';
import { Search } from 'lucide-react';
import ProductCard from '../Components/ProductCard';
import { useProducts } from '../store/useProduct';

export default function HomePage({ navigate }: any) {
  const { products } = useProducts();
  
  console.log('🏠 HomePage - Rendering with products:', products.length, products);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const itemsPerPage = 6;

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.restaurant.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIdx = (currentPageNum - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2">Discover Delicious Food</h2>
        <p className="text-sm text-gray-600 mb-6">Showing {products.length} products</p>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for food or restaurants..."
            className="w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPageNum(1);
            }}
          />
        </div>

        <div className="flex gap-3 flex-wrap mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentPageNum(1);
              }}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white'
                  : 'bg-white border hover:border-orange-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {paginatedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {paginatedProducts.map(product => (
            <ProductCard key={product.id} product={product} navigate={navigate} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPageNum(prev => Math.max(1, prev - 1))}
            disabled={currentPageNum === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPageNum(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPageNum === i + 1 ? 'bg-orange-600 text-white' : 'border'
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPageNum(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPageNum === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
