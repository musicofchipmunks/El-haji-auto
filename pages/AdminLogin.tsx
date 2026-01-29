
import React, { useState } from 'react';
import { Page } from '../types';
import { Lock, Car, LogIn } from 'lucide-react';
// Fix: Use elhautoAuth from firebase
import { elhautoAuth as auth, signInWithEmailAndPassword } from '../firebase';

interface AdminLoginProps {
  setCurrentPage: (p: Page) => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ setCurrentPage }) => {
  const [email, setEmail] = useState('elhajiauto@gmail.com'); // Updated to match firestore.rules
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentPage('admin-dashboard');
    } catch (err: any) {
      setError('Identifiants incorrects ou erreur de connexion.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-automotive flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="bg-accent p-4 rounded-2xl inline-block mb-6">
            <Car size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold font-oswald text-white uppercase tracking-widest">Administration Firebase</h1>
          <p className="text-gray-500 mt-2">Connectez-vous pour gérer EL HAJI AUTO</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-4">Email Admin</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" 
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase text-gray-400 tracking-widest ml-4">Mot de Passe</label>
              <div className="relative">
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" 
                  className="w-full px-14 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" 
                  required
                />
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              {error && <p className="text-red-500 text-xs font-bold mt-2 ml-4 italic">{error}</p>}
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-accent text-white py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center shadow-xl shadow-red-500/20 disabled:opacity-50"
            >
              {loading ? 'Connexion...' : 'Connexion'} <LogIn className="ml-2" size={20} />
            </button>
            <button 
                type="button"
                onClick={() => setCurrentPage('home')}
                className="w-full text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-gray-900 transition-colors"
            >
                Retour au site public
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
