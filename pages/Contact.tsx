
import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <section className="bg-automotive py-24 text-center px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white font-oswald mb-6 uppercase">CONTACTEZ-<span className="text-accent">NOUS</span></h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Une question sur nos services ? Un besoin urgent ? Notre équipe est à votre écoute.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Contact Info Cards */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-8 relative z-10">
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                  <MapPin size={28} />
                </div>
                <div>
                  <h4 className="font-bold font-oswald uppercase text-lg mb-1">Localisation</h4>
                  <p className="text-gray-500 text-sm">123 Avenue Mohamed V, Casablanca, Maroc</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                  <Phone size={28} />
                </div>
                <div>
                  <h4 className="font-bold font-oswald uppercase text-lg mb-1">Téléphone</h4>
                  <p className="text-gray-500 text-sm">+212 5 22 00 00 00</p>
                  <p className="text-gray-500 text-sm">+212 6 00 00 00 00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                  <Mail size={28} />
                </div>
                <div>
                  <h4 className="font-bold font-oswald uppercase text-lg mb-1">Email</h4>
                  <p className="text-gray-500 text-sm">contact@elhajiauto.ma</p>
                  <p className="text-gray-500 text-sm">support@elhajiauto.ma</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0">
                  <Clock size={28} />
                </div>
                <div>
                  <h4 className="font-bold font-oswald uppercase text-lg mb-1">Horaires d'ouverture</h4>
                  <p className="text-gray-500 text-sm">Lundi - Samedi : 08:30 - 18:30</p>
                  <p className="text-accent text-sm font-bold mt-1">Dimanche : Fermé</p>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/212600000000"
              className="bg-green-600 text-white w-full p-6 rounded-3xl shadow-xl hover:bg-green-700 transition-all flex items-center justify-center space-x-3 group"
            >
              <MessageCircle size={32} className="group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <div className="text-xs font-bold uppercase tracking-widest opacity-80">Support Direct</div>
                <div className="text-xl font-bold font-oswald uppercase">Chat WhatsApp</div>
              </div>
            </a>
          </div>

          {/* Form & Map */}
          <div className="flex-1 space-y-12">
            <div className="bg-gray-50 p-10 rounded-[3rem] shadow-sm">
              <h3 className="text-3xl font-bold font-oswald mb-8 uppercase text-gray-900">Envoyez un Message</h3>
              <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-4">Nom Complet</label>
                  <input type="text" placeholder="Ex: Karim Benani" className="w-full px-6 py-4 rounded-2xl bg-white border-none outline-none focus:ring-2 focus:ring-accent shadow-sm" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-4">Email</label>
                  <input type="email" placeholder="Ex: karim@email.com" className="w-full px-6 py-4 rounded-2xl bg-white border-none outline-none focus:ring-2 focus:ring-accent shadow-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-4">Sujet</label>
                  <input type="text" placeholder="Comment pouvons-nous vous aider ?" className="w-full px-6 py-4 rounded-2xl bg-white border-none outline-none focus:ring-2 focus:ring-accent shadow-sm" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold uppercase text-gray-500 tracking-widest ml-4">Message</label>
                  <textarea rows={5} placeholder="Décrivez votre besoin..." className="w-full px-6 py-4 rounded-2xl bg-white border-none outline-none focus:ring-2 focus:ring-accent shadow-sm resize-none"></textarea>
                </div>
                <div className="md:col-span-2 pt-4">
                  <button className="bg-accent text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center space-x-2 w-full md:w-auto shadow-lg shadow-red-500/20">
                    <Send size={20} />
                    <span>Envoyer le Message</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Google Maps Placeholder */}
            <div className="h-96 w-full rounded-[3rem] overflow-hidden bg-gray-200 relative">
               <div className="absolute inset-0 flex items-center justify-center flex-col p-8 text-center">
                  <MapPin size={48} className="text-accent mb-4" />
                  <h4 className="text-2xl font-bold font-oswald uppercase">Retrouvez-nous au Garage</h4>
                  <p className="text-gray-500 mt-2 max-w-sm">Intégration Google Maps ici (Localisation EL HAJI AUTO Casablanca)</p>
                  <button className="mt-6 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold shadow-sm border border-gray-100 uppercase text-xs tracking-widest hover:bg-gray-50">Ouvrir dans Google Maps</button>
               </div>
               <img 
                 src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
                 className="w-full h-full object-cover opacity-20 grayscale" 
                 alt="Map background"
               />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
