
import React, { useState } from 'react';
import { Product, Page } from '../types';
import { ShoppingCart, ArrowLeft, ShieldCheck, Truck, RotateCcw, Package } from 'lucide-react';

interface ProductDetailProps {
  product: Product;
  addToCart: (p: Product, q: number) => void;
  setCurrentPage: (p: Page) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, addToCart, setCurrentPage }) => {
  const [qty, setQty] = useState(1);
  const price = product.price || 0;
  const stock = product.stock || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => setCurrentPage('products')}
        className="flex items-center text-gray-500 hover:text-accent font-bold uppercase text-xs tracking-widest mb-10 transition-colors"
      >
        <ArrowLeft size={16} className="mr-2" /> Retour à la boutique
      </button>

      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1">
          <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-100 p-8">
             <img src={product.imageUrl} alt={product.name} className="w-full h-[500px] object-contain" />
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <span className="bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
              {product.brand}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-oswald text-gray-900 uppercase mt-4 mb-2">{product.name}</h1>
            <p className="text-gray-400 font-medium">Catégorie: <span className="text-gray-900 capitalize">{product.categoryId}</span></p>
          </div>

          <div className="text-4xl font-bold font-oswald text-accent">
            {price.toLocaleString()} MAD
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="space-y-4 pt-6 border-t border-gray-100">
             <div className="flex items-center space-x-3 text-sm font-medium">
                <Package className={stock > 0 ? 'text-green-500' : 'text-red-500'} size={20} />
                <span>Stock: {stock > 0 ? `${stock} unités disponibles` : 'Rupture de stock'}</span>
             </div>
             
             {stock > 0 && (
               <div className="flex flex-col sm:flex-row gap-4 items-center pt-4">
                  <div className="flex items-center bg-gray-100 rounded-2xl p-2 h-14 w-full sm:w-auto">
                    <button onClick={() => setQty(q => Math.max(1, q-1))} className="px-4 text-xl font-bold">-</button>
                    <span className="px-6 font-bold w-12 text-center">{qty}</span>
                    <button onClick={() => setQty(q => Math.min(stock, q+1))} className="px-4 text-xl font-bold">+</button>
                  </div>
                  <button 
                    onClick={() => addToCart(product, qty)}
                    className="flex-1 h-14 bg-accent text-white px-8 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center space-x-3 w-full"
                  >
                    <ShoppingCart size={20} />
                    <span>Ajouter au Panier</span>
                  </button>
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
