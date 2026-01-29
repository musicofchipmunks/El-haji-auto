import React, { useState } from 'react';
import { Appointment, Page } from '../types';
import { LayoutDashboard, Package, ShoppingBag, LogOut, Calendar, Trash2, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { elhautoDb, deleteDoc, doc, elhautoAuth, signOut, updateDoc } from '../firebase';

interface AdminAppointmentsProps {
  appointments: Appointment[];
  setCurrentPage: (p: Page) => void;
}

const AdminAppointments: React.FC<AdminAppointmentsProps> = ({ appointments, setCurrentPage }) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const updateStatus = async (id: string, status: Appointment['status']) => {
    try { await updateDoc(doc(elhautoDb, "elhauto_appointments", id), { status }); } catch (e) { alert("Erreur permission."); }
  };

  const performDelete = async () => {
    if (!deleteConfirmId) return;
    setLoading(true);
    try {
      await deleteDoc(doc(elhautoDb, "elhauto_appointments", deleteConfirmId));
      setDeleteConfirmId(null);
    } catch (e) { alert("Erreur de suppression."); } finally { setLoading(false); }
  };

  const handleLogout = async () => { await signOut(elhautoAuth); setCurrentPage('home'); };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 text-gray-900">
      <aside className="lg:w-72 bg-gray-900 text-white p-8 space-y-10 shrink-0">
        <div className="font-bold font-oswald text-2xl tracking-tighter uppercase">EL HAJI <span className="text-accent">Admin</span></div>
        <nav className="space-y-2">
          <button onClick={() => setCurrentPage('admin-dashboard')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><LayoutDashboard size={20} /> <span>Dashboard</span></button>
          <button onClick={() => setCurrentPage('admin-products')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><Package size={20} /> <span>Produits</span></button>
          <button onClick={() => setCurrentPage('admin-orders')} className="w-full flex items-center space-x-3 p-4 rounded-xl hover:bg-white/5 text-gray-400 font-bold uppercase text-xs tracking-widest transition-colors"><ShoppingBag size={20} /> <span>Commandes</span></button>
          <button onClick={() => setCurrentPage('admin-appointments')} className="w-full flex items-center space-x-3 p-4 rounded-xl bg-accent text-white font-bold uppercase text-xs tracking-widest transition-colors"><Calendar size={20} /> <span>Rendez-vous</span></button>
        </nav>
        <button onClick={handleLogout} className="w-full flex items-center space-x-3 p-4 text-red-400 font-bold uppercase text-xs tracking-widest hover:text-red-300"><LogOut size={20} /> <span>Déconnexion</span></button>
      </aside>

      <main className="flex-1 p-10">
        <h1 className="text-4xl font-bold font-oswald uppercase tracking-tighter mb-10">Gestion <span className="text-accent">Rendez-vous</span></h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {appointments.length === 0 ? (
             <div className="col-span-2 bg-white p-20 rounded-[2rem] text-center text-gray-400 border border-gray-100 shadow-sm">Aucun RDV.</div>
           ) : (
             appointments.map(apt => (
               <div key={apt.id} className="bg-white rounded-[2rem] shadow-sm border border-gray-100 flex flex-col overflow-hidden">
                  <div className="p-8 border-b border-gray-50 flex justify-between">
                     <div>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest">{apt.date} à {apt.time}</p>
                        <h4 className="text-xl font-bold font-oswald uppercase mt-1">{apt.clientName}</h4>
                        <p className="text-xs text-gray-400">{apt.phone}</p>
                     </div>
                     <button onClick={() => setDeleteConfirmId(apt.id)} className="text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                  <div className="p-8 space-y-4">
                     <div><p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Véhicule</p><p className="font-bold text-sm">{apt.brand} {apt.model}</p></div>
                     <div><p className="text-[10px] font-bold uppercase text-gray-400 tracking-widest mb-1">Service</p><p className="text-accent text-xs font-bold uppercase">{apt.service}</p></div>
                  </div>
                  <div className="p-6 bg-gray-50 flex gap-2">
                     <button onClick={() => updateStatus(apt.id, 'confirmed')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest ${apt.status === 'confirmed' ? 'bg-green-600 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}>Confirmer</button>
                     <button onClick={() => updateStatus(apt.id, 'cancelled')} className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest ${apt.status === 'cancelled' ? 'bg-red-600 text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-100'}`}>Annuler</button>
                  </div>
               </div>
             ))
           )}
        </div>

        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
             <div className="bg-white rounded-[2rem] w-full max-w-sm p-10 text-center shadow-2xl">
                <AlertTriangle size={48} className="mx-auto text-red-500 mb-6" />
                <h3 className="text-2xl font-bold font-oswald uppercase mb-4">Supprimer RDV ?</h3>
                <div className="flex flex-col gap-3">
                   <button onClick={performDelete} disabled={loading} className="w-full bg-red-600 text-white py-4 rounded-xl font-bold uppercase tracking-widest">Oui, Supprimer</button>
                   <button onClick={() => setDeleteConfirmId(null)} className="w-full bg-gray-100 text-gray-600 py-4 rounded-xl font-bold uppercase tracking-widest">Annuler</button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminAppointments;