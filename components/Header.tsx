
import React, { useState } from 'react';
import { Menu, X, Car, ShoppingCart, User } from 'lucide-react';
import { Page, CartItem } from '../types';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  cart: CartItem[];
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage, cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { label: 'Accueil', id: 'home' as Page },
    { label: 'Services', id: 'services' as Page },
    { label: 'Boutique', id: 'products' as Page },
    { label: 'Contact', id: 'contact' as Page },
  ];

  const isAdminPage = currentPage.startsWith('admin');

  if (isAdminPage && currentPage !== 'admin-login') {
    return null; // Admin has its own sidebar/header
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <button 
              onClick={() => setCurrentPage('home')}
              className="flex items-center space-x-2 group"
            >
              <div className="bg-accent p-2 rounded-lg group-hover:bg-red-700 transition-colors">
                <Car className="h-6 w-6 text-white" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-2xl font-bold font-oswald tracking-tighter text-gray-900 leading-none">EL HAJI <span className="text-accent">AUTO</span></span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500 font-bold">Garage & E-Shop</span>
              </div>
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-accent ${
                  currentPage === item.id ? 'text-accent' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            
            <div className="flex items-center space-x-4 border-l pl-8 border-gray-100">
                <button 
                  onClick={() => setCurrentPage('cart')}
                  className="relative p-2 text-gray-600 hover:text-accent transition-colors"
                >
                  <ShoppingCart size={24} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button 
                  onClick={() => setCurrentPage('admin-login')}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <User size={20} />
                </button>
                <button 
                  onClick={() => setCurrentPage('appointment')}
                  className="bg-accent text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/10"
                >
                  Rendez-vous
                </button>
            </div>
          </nav>

          <div className="md:hidden flex items-center space-x-4">
             <button onClick={() => setCurrentPage('cart')} className="relative p-2 text-gray-600">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-gray-500"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-6 pt-2">
          <div className="px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setIsOpen(false); }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-bold uppercase tracking-widest ${
                  currentPage === item.id ? 'text-accent bg-red-50' : 'text-gray-600'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setCurrentPage('appointment'); setIsOpen(false); }}
              className="block w-full text-center mt-4 bg-accent text-white px-6 py-4 rounded-xl font-bold uppercase tracking-widest"
            >
              Rendez-vous
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
