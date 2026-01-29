
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES, ICON_MAP } from '../constants';
import { Page } from '../types';

interface ServicesProps {
  setCurrentPage: (page: Page) => void;
}

const Services: React.FC<ServicesProps> = ({ setCurrentPage }) => {
  return (
    <div className="bg-gray-50 pb-24">
      {/* Page Header */}
      <div className="bg-automotive py-24 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover opacity-20"
            alt="Garage"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white font-oswald uppercase tracking-tighter mb-6">NOS SERVICES <span className="text-accent">GARAGE</span></h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Expertise mécanique certifiée pour toutes marques de véhicules. Nous utilisons les dernières technologies pour garantir votre sécurité.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">
        {SERVICES.map((service, index) => {
          const Icon = ICON_MAP[service.icon];
          const isEven = index % 2 === 0;

          return (
            <div key={service.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}>
              <div className="flex-1 w-full">
                <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20">
                    <Icon size={40} className="text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <h2 className="text-accent font-bold uppercase tracking-widest text-sm">Expertise / {service.title}</h2>
                <h3 className="text-4xl font-bold font-oswald uppercase text-gray-900 leading-tight">{service.title}</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  {service.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                      <CheckCircle2 className="text-green-500 shrink-0" size={20} />
                      <span className="font-semibold text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-8">
                  <button 
                    onClick={() => setCurrentPage('appointment')}
                    className="bg-accent text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-500/20 flex items-center group"
                  >
                    Réserver ce service
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Services Banner */}
      <section className="mt-24 bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h4 className="text-accent font-bold uppercase mb-8">Mais aussi...</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="p-6">
               <div className="text-3xl font-bold font-oswald mb-2">Climatisation</div>
               <p className="text-gray-500">Recharge et nettoyage circuit</p>
            </div>
            <div className="p-6">
               <div className="text-3xl font-bold font-oswald mb-2">Pneumatiques</div>
               <p className="text-gray-500">Montage, équilibrage & parallélisme</p>
            </div>
            <div className="p-6">
               <div className="text-3xl font-bold font-oswald mb-2">Éclairage</div>
               <p className="text-gray-500">Remplacement optiques & réglages</p>
            </div>
            <div className="p-6">
               <div className="text-3xl font-bold font-oswald mb-2">Batteries</div>
               <p className="text-gray-500">Test de charge et remplacement</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
