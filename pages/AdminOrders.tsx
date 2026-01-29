import React, { useState } from 'react';
import { Order, Page } from '../types';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Trash2, Calendar, AlertTriangle } from 'lucide-react';
import { elhautoDb, updateDoc, deleteDoc, doc, elhautoAuth, signOut } from '../firebase';

interface AdminOrdersProps {
  orders: Order[];
  setCurrentPage: (p: Page) => void;
}

const AdminOrders: React.FC<AdminOrdersProps> = ({ orders, setCurrentPage }) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id: string, status: Order['status']) => {
    try { await updateDoc(doc(elhautoDb, "elhauto_orders", id), { status }); } catch (e) { alert("Erreur permission."); }
  };

  const performDelete = async () => {
    if (!deleteConfirmId) return;
    setLoading(true);
    try {
      await deleteDoc(doc(elhautoDb, "elhauto_orders", deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (e) { alert("Erreur lors de la suppression."); } finally { setLoading(false); }
  };

  const handleLogout = async () => { await signOut(elhautoAuth); setCurrentPage('home'); };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-900">
      <aside className="lg:w-72 bg-gray-900 text-white p-8 space-y-10 shrink-0">
        <div className="font-bold font-oswald text-2xl tracking-tighter uppercase">EL HAJI <span className="text-accent">Admin</span></div>
        <nav className="space-y-2">
          <button onClick={() => setCurrentPage('admin-dashboard')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><LayoutDashboard size={20} /> <span>Dashboard</span></button>
          <button onClick={() => setCurrentPage('admin-products')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><Package size={20} /> <span>Produits</span></button>
          <button onClick={() => setCurrentPage('admin-orders')} className="w-full flex items-center space-x-3 p-4 rounded-xl bg-accent text-white font-bold uppercase text-xs tracking-widest transition-colors"><ShoppingBag size={20} /> <span>Commandes</span></button>
          <button onClick={() => setCurrentPage('admin-appointments')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><Calendar size={20} /> <span>Rendez-vous</span></button>
        </nav>
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 text-red-400 font-bold uppercase text-xs tracking-widest hover:text-red-300"><LogOut size={20} /> <span>Déconnexion</span></button>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold font-oswald uppercase tracking-tighter mb-10">Gestion <span className="text-accent">Commandes</span></h1>
        
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="bg-white p-20 rounded-[2rem] text-center border border-gray-100 shadow-sm text-gray-400">Aucune commande.</div>
          ) : (
            orders.map(o => (
              <div key={o.id} className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex justify-between items-center group">
                <div className="flex items-center space-x-6">
                  <div className={`w-3 h-3 rounded-full ${o.status === 'new' ? 'bg-blue-500' : o.status === 'processing' ? 'bg-orange-500' : 'bg-green-500'}`}></div>
                  <div><p className="font-bold text-lg">{o.clientName}</p><p className="text-xs text-gray-400">{o.phone} • {o.address}</p></div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right"><p className="text-sm font-bold text-accent">{o.totalPrice} MAD</p><p className="text-[10px] uppercase text-gray-400">{o.status}</p></div>
                  <div className="flex space-x-1">
                    <button onClick={() => updateStatus(o.id, 'new')} className="p-2 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold">Nouveau</button>
                    <button onClick={() => updateStatus(o.id, 'completed')} className="p-2 bg-green-50 text-green-600 rounded-lg text-[10px] font-bold">Terminé</button>
                  </div>
                  <button onClick={() => setDeleteConfirmId(o.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                </div>
              </div>
            ))
          )}
        </div>

        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <div className="bg-white rounded-[2rem] w-full max-w-sm p-10 text-center shadow-2xl">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-6" />
                <h3 className="text-2xl font-bold font-oswald uppercase mb-4">Supprimer Commande ?</h3>
                <div className="flex flex-col gap-3">
                   <button onClick={performDelete} disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest">Confirmer</button>
                   <button onClick={() => setDeleteConfirmId(null)} className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold uppercase tracking-widest">Annuler</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminOrders;