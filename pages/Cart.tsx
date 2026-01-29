
import React from 'react';
import { CartItem, Page } from '../types';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, q: number) => void;
  setCurrentPage: (p: Page) => void;
}

const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateCartQuantity, setCurrentPage }) => {
  const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);
  const delivery = subtotal > 0 ? 50 : 0;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="py-32 px-4 text-center">
        <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-6" />
          <h2 className="text-3xl font-bold font-oswald uppercase mb-4">Votre panier est vide</h2>
          <p className="text-gray-500 mb-8">Découvrez nos produits premium pour l'entretien de votre véhicule.</p>
          <button 
            onClick={() => setCurrentPage('products')}
            className="w-full bg-accent text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all"
          >
            Aller à la Boutique
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-5xl font-bold font-oswald uppercase mb-12 tracking-tighter">VOTRE <span className="text-accent">PANIER</span></h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="flex-1 space-y-6">
          {cart.map(item => (
            <div key={item.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                {/* Fix: imageUrl instead of image */}
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold font-oswald uppercase text-lg line-clamp-1">{item.name}</h4>
                <p className="text-accent font-bold">{(item.price || 0).toLocaleString()} MAD</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center bg-gray-50 rounded-xl p-1">
                    <button onClick={() => updateCartQuantity(item.id, item.quantity - 1)} className="px-3 py-1 font-bold">-</button>
                    <span className="px-3 font-bold text-sm">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.quantity + 1)} className="px-3 py-1 font-bold">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <div className="text-right hidden sm:block">
                <p className="text-xs uppercase font-bold text-gray-400 mb-1">Total</p>
                <p className="text-xl font-bold font-oswald">{((item.price || 0) * item.quantity).toLocaleString()} MAD</p>
              </div>
            </div>
          ))}

          <button 
            onClick={() => setCurrentPage('products')}
            className="flex items-center text-gray-500 hover:text-accent font-bold uppercase text-xs tracking-widest mt-6 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" /> Continuer vos achats
          </button>
        </div>

        {/* Summary Card */}
        <div className="lg:w-96">
          <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 sticky top-28">
            <h3 className="text-2xl font-bold font-oswald mb-8 uppercase">Résumé</h3>
            <div className="space-y-4 text-sm font-medium border-b border-gray-100 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-500">Sous-total</span>
                <span>{(subtotal || 0).toLocaleString()} MAD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Frais de livraison</span>
                <span>{(delivery || 0).toLocaleString()} MAD</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-bold font-oswald mb-8">
              <span>TOTAL</span>
              <span className="text-accent">{(total || 0).toLocaleString()} MAD</span>
            </div>
            <button 
              onClick={() => setCurrentPage('checkout')}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center group"
            >
              Commander
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-[10px] text-gray-400 mt-6 text-center uppercase tracking-widest leading-relaxed">
              Paiement à la livraison uniquement (Casablanca & Environs)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
