
import React from 'react';
import { ShieldCheck, Clock, Award, ArrowRight, CheckCircle2, Eye } from 'lucide-react';
import { Page, Product } from '../types';
import { SERVICES, CATEGORIES, ICON_MAP } from '../constants';

interface HomeProps {
  setCurrentPage: (page: Page) => void;
  viewProduct: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ setCurrentPage, viewProduct }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-[0.3] scale-105"
            alt="Garage Automobile"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <h2 className="text-accent font-bold uppercase tracking-[0.4em] mb-6 flex items-center text-xs">
              <span className="w-12 h-[2px] bg-accent mr-4"></span>
              Expertise & E-Commerce au Maroc
            </h2>
            <h1 className="text-5xl md:text-8xl font-bold text-white font-oswald leading-[0.9] mb-10 tracking-tighter">
              EL HAJI <span className="text-accent">AUTO</span>:<br />
              VOTRE EXPERT TOTAL
            </h1>
            <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-xl font-medium">
              Maintenance mécanique de haute précision et boutique en ligne de pièces détachées d'origine certifiée.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => setCurrentPage('appointment')}
                className="bg-accent text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center group shadow-2xl shadow-red-500/20"
              >
                Rendez-vous
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={() => setCurrentPage('products')}
                className="bg-white/5 backdrop-blur-xl text-white border border-white/10 px-10 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-white hover:text-gray-900 transition-all shadow-xl"
              >
                Boutique en ligne
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
           <div className="flex flex-wrap justify-center gap-10 md:gap-20">
              {CATEGORIES.slice(0, 4).map(cat => {
                const Icon = ICON_MAP[cat.icon];
                return (
                  <button key={cat.id} onClick={() => setCurrentPage('products')} className="flex items-center space-x-3 group">
                     <div className="text-accent group-hover:scale-110 transition-transform"><Icon size={24} /></div>
                     <span className="font-bold font-oswald uppercase tracking-widest text-sm text-gray-400 group-hover:text-gray-900 transition-colors">{cat.name}</span>
                  </button>
                )
              })}
           </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className="text-accent font-bold uppercase tracking-[0.3em] mb-4 text-xs">Expertise Atelier</h2>
            <h3 className="text-4xl md:text-6xl font-bold font-oswald uppercase tracking-tighter">ENTRETIEN MÉCANIQUE</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {SERVICES.map((service) => {
              const Icon = ICON_MAP[service.icon];
              return (
                <div key={service.id} className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group border border-gray-100 flex flex-col md:flex-row">
                  <div className="md:w-1/2 h-72 md:h-auto overflow-hidden">
                    <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-10 md:w-1/2 flex flex-col justify-center">
                    <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-6">
                      <Icon size={24} />
                    </div>
                    <h4 className="text-2xl font-bold font-oswald mb-4 uppercase">{service.title}</h4>
                    <p className="text-gray-500 mb-8 text-sm leading-relaxed">{service.description}</p>
                    <button onClick={() => setCurrentPage('services')} className="text-accent font-bold uppercase text-[10px] tracking-widest flex items-center hover:underline">Détails <ArrowRight size={14} className="ml-2" /></button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/5 -skew-x-12 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-left">
           <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
              <div className="max-w-2xl">
                 <h2 className="text-white text-4xl md:text-6xl font-bold font-oswald mb-8 uppercase leading-[0.9] tracking-tighter">
                   COMMANDER VOS PIÈCES <span className="text-accent">EN 3 CLICS</span>
                 </h2>
                 <p className="text-gray-400 text-lg mb-10 font-medium">
                   Bénéficiez de la livraison express à Casablanca et du paiement sécurisé à la livraison. Toutes nos pièces sont garanties.
                 </p>
                 <div className="flex flex-wrap gap-10 justify-center lg:justify-start">
                    <div className="text-center">
                       <p className="text-3xl font-bold font-oswald text-white mb-1">5000+</p>
                       <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Articles</p>
                    </div>
                    <div className="text-center">
                       <p className="text-3xl font-bold font-oswald text-white mb-1">24H</p>
                       <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Livraison</p>
                    </div>
                    <div className="text-center">
                       <p className="text-3xl font-bold font-oswald text-white mb-1">100%</p>
                       <p className="text-[10px] font-bold text-accent uppercase tracking-widest">Origine</p>
                    </div>
                 </div>
              </div>
              <div className="bg-white p-12 rounded-[3rem] shadow-2xl max-w-md w-full">
                 <h3 className="text-2xl font-bold font-oswald mb-8 uppercase text-gray-900 tracking-widest">Boutique Pro</h3>
                 <p className="text-gray-500 mb-8 text-sm">Accédez à notre catalogue complet de pièces détachées et produits d'entretien.</p>
                 <button 
                  onClick={() => setCurrentPage('products')}
                  className="w-full bg-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center group"
                >
                  Accéder au shop
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
