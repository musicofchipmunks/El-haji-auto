
import React from 'react';
import { Order, Product, Page } from '../types';
import { LayoutDashboard, Package, ShoppingBag, LogOut, TrendingUp, Users, ArrowRight, Calendar } from 'lucide-react';
import { elhautoAuth as auth, signOut } from '../firebase';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  setCurrentPage: (p: Page) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ orders, products, setCurrentPage }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + (o.totalPrice || 0), 0);
  const newOrdersCount = orders.filter(o => o.status === 'new').length;
  const lowStock = products.filter(p => (p.stock || 0) < 5).length;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentPage('home');
    } catch (e) {
      console.error("Logout error", e);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      <aside className="lg:w-72 bg-automotive text-white p-8 space-y-10 shrink-0">
        <div className="font-bold font-oswald text-2xl tracking-tighter text-white uppercase">
          EL HAJI <span className="text-accent">Admin</span>
        </div>
        <nav className="space-y-2">
          <button onClick={() => setCurrentPage('admin-dashboard')} className="w-full flex items-center space-x-3 p-4 rounded-xl bg-accent text-white font-bold uppercase text-xs tracking-widest">
            <LayoutDashboard size={20} /> <span>Dashboard</span>
          </button>
          <button onClick={() => setCurrentPage('admin-products')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors">
            <Package size={20} /> <span>Produits</span>
          </button>
          <button onClick={() => setCurrentPage('admin-orders')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors">
            <ShoppingBag size={20} /> <span>Commandes</span>
          </button>
          <button onClick={() => setCurrentPage('admin-appointments')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors">
            <Calendar size={20} /> <span>Rendez-vous</span>
          </button>
        </nav>
        <div className="pt-10 border-t border-gray-800">
          <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 text-red-400 font-bold uppercase text-xs tracking-widest hover:text-red-300">
            <LogOut size={20} /> <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold font-oswald uppercase tracking-tighter mb-10 text-gray-900">
          Tableau de <span className="text-accent">Bord</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="bg-blue-50 text-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Chiffre d'Affaires</p>
              <h4 className="text-2xl font-bold font-oswald mt-1 text-gray-900">{(totalRevenue || 0).toLocaleString()} MAD</h4>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="bg-accent/10 text-accent w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <ShoppingBag size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Commandes</p>
              <h4 className="text-2xl font-bold font-oswald mt-1 text-gray-900">{newOrdersCount}</h4>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="bg-orange-50 text-orange-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Package size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Stock Critique</p>
              <h4 className="text-2xl font-bold font-oswald mt-1 text-gray-900">{lowStock}</h4>
           </div>
           <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <div className="bg-purple-50 text-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Clients</p>
              <h4 className="text-2xl font-bold font-oswald mt-1 text-gray-900">{[...new Set(orders.map(o => o.phone))].length}</h4>
           </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 border-b border-gray-50 flex justify-between items-center">
             <h3 className="text-xl font-bold font-oswald uppercase text-gray-900">Activité Récente</h3>
             <button onClick={() => setCurrentPage('admin-orders')} className="text-accent font-bold text-xs uppercase flex items-center hover:underline">Voir tout <ArrowRight size={14} className="ml-1"/></button>
          </div>
          <div className="p-20 text-center">
             <LayoutDashboard size={48} className="mx-auto text-gray-100 mb-4" />
             <p className="text-gray-400 font-bold uppercase tracking-widest">Utilisez le menu pour gérer les données.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
