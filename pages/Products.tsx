
import React, { useState } from 'react';
import { Product, Page } from '../types';
import { Search, Filter, ShoppingBag, Info } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface ProductsProps {
  products: Product[];
  viewProduct: (id: string) => void;
}

const Products: React.FC<ProductsProps> = ({ products, viewProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrage robuste
  const filteredProducts = products.filter(product => {
    const isActive = product.isActive !== false; // Visible par défaut si non spécifié
    const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;
    const matchesSearch = 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    
    return isActive && matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="bg-automotive pt-20 pb-24 px-4 text-center relative overflow-hidden">
        <div className="absolute right-0 bottom-0 opacity-10">
            <ShoppingBag size={300} className="text-white" />
        </div>
        <div className="relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold text-white font-oswald mb-6 uppercase tracking-tighter">BOUTIQUE <span className="text-accent">PIÈCES</span></h1>
            <p className="text-gray-400 max-w-2xl mx-auto mb-10 uppercase text-xs font-bold tracking-[0.3em]">Qualité Premium & Prix Compétitifs</p>
            
            <div className="max-w-2xl mx-auto relative group">
              <input 
                type="text" 
                placeholder="Rechercher une pièce, une marque..."
                className="w-full pl-14 pr-6 py-5 rounded-[2rem] bg-white border-none shadow-2xl outline-none text-gray-900 group-hover:ring-4 group-hover:ring-accent/5 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 group-hover:text-accent transition-colors" />
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          <aside className="lg:w-72 space-y-10">
            <div>
              <h3 className="text-xl font-bold font-oswald mb-6 uppercase flex items-center tracking-widest">
                <Filter size={18} className="mr-3 text-accent" />
                Filtrer
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory('all')}
                  className={`w-full text-left px-5 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all ${
                    selectedCategory === 'all' ? 'bg-accent text-white shadow-lg shadow-red-500/20' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                  }`}
                >
                  Toutes les pièces
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-between ${
                      selectedCategory === cat.id ? 'bg-accent text-white shadow-lg shadow-red-500/20' : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="opacity-40">{products.filter(p => p.categoryId === cat.id).length}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-between items-center mb-10">
                <p className="text-xs uppercase font-bold tracking-[0.2em] text-gray-400">
                  Résultats: <span className="text-gray-900">{filteredProducts.length} articles</span>
                </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-[2.5rem] border border-dashed border-gray-200">
                <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-400 font-bold uppercase tracking-widest">Aucun produit trouvé</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    onClick={() => viewProduct(product.id)}
                    className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-gray-100 flex flex-col group cursor-pointer"
                  >
                    <div className="h-64 relative overflow-hidden bg-gray-50 p-6">
                      <img 
                        src={product.imageUrl || 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400'} 
                        alt={product.name} 
                        className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-6 left-6 flex flex-col gap-2">
                         <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest text-accent shadow-sm">
                          {product.brand}
                        </span>
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <h4 className="text-xl font-bold font-oswald mb-3 uppercase text-gray-900 group-hover:text-accent transition-colors line-clamp-1">{product.name}</h4>
                      <div className="flex justify-between items-end mt-auto">
                          <div>
                             <p className="text-xs font-bold uppercase text-gray-400 tracking-widest">Prix</p>
                             <p className="text-2xl font-bold font-oswald text-gray-900">{(product.price || 0).toLocaleString()} MAD</p>
                          </div>
                          <div className="bg-gray-50 p-3 rounded-xl group-hover:bg-accent group-hover:text-white transition-all">
                             <Info size={18} />
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
