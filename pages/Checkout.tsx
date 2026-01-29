
import React, { useState } from 'react';
import { CartItem, Page } from '../types';
import { Lock, Truck, CreditCard, ChevronRight } from 'lucide-react';

interface CheckoutProps {
  cart: CartItem[];
  placeOrder: (data: any) => void;
  setCurrentPage: (p: Page) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, placeOrder, setCurrentPage }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * item.quantity), 0);
  const total = subtotal + 50;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await placeOrder(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="flex-1 space-y-10">
          <h1 className="text-5xl font-bold font-oswald uppercase tracking-tighter text-gray-900">FINALISER <span className="text-accent">LA COMMANDE</span></h1>
          
          <form onSubmit={handleSubmit} className="space-y-8">
             <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
                <h3 className="text-xl font-bold font-oswald uppercase mb-4 flex items-center text-gray-900">
                    <Truck className="mr-3 text-accent" /> Informations de Livraison
                </h3>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-4">Nom Complet</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Ex: Ahmed Benani" 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent text-gray-900 placeholder-gray-300" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-4">Téléphone (WhatsApp)</label>
                  <input 
                    required 
                    type="tel" 
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="06..." 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent text-gray-900 placeholder-gray-300" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-4">Adresse de Livraison (Casablanca & Environs)</label>
                  <textarea 
                    required 
                    rows={3}
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Quartier, Rue, N° Appart..." 
                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent resize-none text-gray-900 placeholder-gray-300" 
                  />
                </div>
             </div>

             <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold font-oswald uppercase mb-6 flex items-center text-gray-900">
                    <CreditCard className="mr-3 text-accent" /> Mode de Paiement
                </h3>
                <label className="flex items-center p-6 bg-red-50 rounded-2xl border-2 border-accent cursor-pointer">
                    <input type="radio" checked readOnly className="h-5 w-5 accent-accent mr-4" />
                    <div>
                        <p className="font-bold text-gray-900 uppercase text-sm tracking-widest">Paiement à la livraison (COD)</p>
                        <p className="text-xs text-accent/70 mt-1">Réglez en espèces directement auprès du livreur EL HAJI AUTO.</p>
                    </div>
                </label>
             </div>

             <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-accent text-white py-6 rounded-[2rem] font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl shadow-red-500/20 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
             >
                {isSubmitting ? 'Traitement en cours...' : 'Confirmer ma commande'} <ChevronRight size={20} className="ml-2" />
             </button>
          </form>
        </div>

        <div className="lg:w-96">
          <div className="bg-gray-900 text-white p-10 rounded-[2.5rem] shadow-2xl sticky top-28">
            <h3 className="text-2xl font-bold font-oswald mb-8 uppercase tracking-widest">Récapitulatif</h3>
            <div className="space-y-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar mb-8 border-b border-gray-800 pb-8">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-lg overflow-hidden shrink-0">
                    <img src={item.imageUrl} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold line-clamp-1 uppercase">{item.name}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{item.quantity} x {(item.price || 0).toLocaleString()} MAD</p>
                  </div>
                  <p className="text-xs font-bold">{((item.price || 0) * item.quantity).toLocaleString()} MAD</p>
                </div>
              ))}
            </div>
            <div className="space-y-4 mb-8">
               <div className="flex justify-between text-xs text-gray-400 uppercase font-bold tracking-widest">
                  <span>Sous-total</span>
                  <span>{(subtotal || 0).toLocaleString()} MAD</span>
               </div>
               <div className="flex justify-between text-xs text-gray-400 uppercase font-bold tracking-widest">
                  <span>Livraison</span>
                  <span>50 MAD</span>
               </div>
            </div>
            <div className="flex justify-between text-3xl font-bold font-oswald border-t border-gray-800 pt-8">
              <span>TOTAL</span>
              <span className="text-accent">{(total || 0).toLocaleString()} MAD</span>
            </div>
            <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500">
               <Lock size={14} />
               <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Transaction Sécurisée Firestore</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
