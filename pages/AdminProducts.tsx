import React, { useState } from 'react';
import { Product, Page } from '../types';
import { Plus, Edit, Trash2, Package, LayoutDashboard, ShoppingBag, LogOut, X, Upload, AlertTriangle, Calendar } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { elhautoDb, collection, addDoc, updateDoc, deleteDoc, doc, elhautoAuth, signOut, elhautoStorage, ref, uploadBytes, getDownloadURL } from '../firebase';

interface AdminProductsProps {
  products: Product[];
  setCurrentPage: (p: Page) => void;
}

const AdminProducts: React.FC<AdminProductsProps> = ({ products, setCurrentPage }) => {
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '', brand: '', price: 0, stock: 0, categoryId: 'huiles', description: '', imageUrl: '', isActive: true
  });

  const handleLogout = async () => { await signOut(elhautoAuth); setCurrentPage('home'); };

  const performDelete = async () => {
    if (!deleteConfirmId) return;
    setLoading(true);
    try {
      await deleteDoc(doc(elhautoDb, "elhauto_products", deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (err) { alert("Erreur de permission ou réseau."); } finally { setLoading(false); }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateDoc(doc(elhautoDb, "elhauto_products", editingId), formData);
      } else {
        await addDoc(collection(elhautoDb, "elhauto_products"), { ...formData, createdAt: new Date().toISOString() });
      }
      setShowModal(false);
      setEditingId(null);
    } catch (err) { alert("Erreur d'enregistrement."); } finally { setLoading(false); }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-900">
      <aside className="lg:w-72 bg-gray-900 text-white p-8 space-y-10 shrink-0">
        <div className="font-bold font-oswald text-2xl tracking-tighter uppercase">EL HAJI <span className="text-accent">Admin</span></div>
        <nav className="space-y-2">
          <button onClick={() => setCurrentPage('admin-dashboard')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><LayoutDashboard size={20} /> <span>Dashboard</span></button>
          <button onClick={() => setCurrentPage('admin-products')} className="w-full flex items-center space-x-3 p-4 rounded-xl bg-accent text-white font-bold uppercase text-xs tracking-widest transition-colors"><Package size={20} /> <span>Produits</span></button>
          <button onClick={() => setCurrentPage('admin-orders')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><ShoppingBag size={20} /> <span>Commandes</span></button>
          <button onClick={() => setCurrentPage('admin-appointments')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><Calendar size={20} /> <span>Rendez-vous</span></button>
        </nav>
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 text-red-400 font-bold uppercase text-xs tracking-widest hover:text-red-300"><LogOut size={20} /> <span>Déconnexion</span></button>
      </aside>

      <main className="flex-1 p-10">
        <div className="flex justify-between items-center mb-10">
           <h1 className="text-4xl font-bold font-oswald uppercase tracking-tighter">Gestion <span className="text-accent">Produits</span></h1>
           <button onClick={() => setShowModal(true)} className="bg-accent text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center"><Plus size={20} className="mr-2" /> Nouveau</button>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
           <table className="w-full text-left">
              <thead><tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-500"><th className="px-8 py-4">Produit</th><th className="px-8 py-4">Stock</th><th className="px-8 py-4 text-right">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-8 py-4 flex items-center space-x-4">
                       <img src={p.imageUrl} className="w-12 h-12 rounded-xl object-cover bg-gray-100" />
                       <div><p className="font-bold">{p.name}</p><p className="text-xs text-gray-400">{p.price} MAD</p></div>
                    </td>
                    <td className="px-8 py-4 font-bold">{p.stock}</td>
                    <td className="px-8 py-4 text-right space-x-2">
                       <button onClick={() => { setFormData(p); setEditingId(p.id); setShowModal(true); }} className="p-2 text-gray-400 hover:text-accent"><Edit size={18} /></button>
                       <button onClick={() => setDeleteConfirmId(p.id)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
           </table>
        </div>

        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <div className="bg-white rounded-[2rem] w-full max-w-sm p-10 text-center shadow-2xl">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-6" />
                <h3 className="text-2xl font-bold font-oswald uppercase mb-4">Supprimer ?</h3>
                <div className="flex flex-col gap-3">
                   <button onClick={performDelete} disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700">Oui, Supprimer</button>
                   <button onClick={() => setDeleteConfirmId(null)} className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold uppercase tracking-widest">Annuler</button>
                </div>
             </div>
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-lg p-10 relative">
               <button onClick={() => setShowModal(false)} className="absolute top-6 right-6"><X /></button>
               <h2 className="text-2xl font-bold font-oswald uppercase mb-6">{editingId ? 'Modifier' : 'Ajouter'} Produit</h2>
               <form onSubmit={handleSubmit} className="space-y-4">
                  <input required placeholder="Nom" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
                  <div className="grid grid-cols-2 gap-4">
                    <input required type="number" placeholder="Prix" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-xl" />
                    <input required type="number" placeholder="Stock" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full p-4 bg-gray-50 rounded-xl" />
                  </div>
                  <input placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full p-4 bg-gray-50 rounded-xl" />
                  <button type="submit" disabled={loading} className="w-full bg-accent text-white py-4 rounded-xl font-bold uppercase tracking-widest">Enregistrer</button>
               </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminProducts;