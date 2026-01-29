
import React from 'react';
import { Target, Eye, ShieldCheck, Users, Trophy, Award } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-automotive py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1530046339160-ce3e5b0c7a2f?auto=format&fit=crop&q=80&w=2000')] bg-cover"></div>
        <div className="relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white font-oswald uppercase mb-6 tracking-tighter">L'HISTOIRE D'UNE <span className="text-accent">PASSION</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg italic">
            "Notre métier n'est pas seulement de réparer des voitures, c'est de garantir la mobilité et la sécurité de nos clients au quotidien."
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1529939440214-362bc6293841?auto=format&fit=crop&q=80&w=800" 
                className="rounded-[3rem] shadow-2xl relative z-10" 
                alt="Equipe"
              />
              <div className="absolute -bottom-10 -right-10 bg-accent p-12 rounded-full hidden md:block">
                <div className="text-white text-center">
                  <div className="text-5xl font-bold font-oswald">15+</div>
                  <div className="text-xs uppercase font-bold tracking-widest mt-1">Ans d'expérience</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h2 className="text-accent font-bold uppercase tracking-widest text-sm">Qui sommes-nous ?</h2>
            <h3 className="text-4xl font-bold font-oswald uppercase text-gray-900 leading-tight">EL HAJI AUTO : VOTRE EXPERT DE RÉFÉRENCE AU MAROC</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Fondé sur des valeurs d'intégrité et de savoir-faire technique, EL HAJI AUTO s'est imposé comme un acteur incontournable de la maintenance automobile à Casablanca. 
            </p>
            <p className="text-gray-600">
              Notre équipe est composée de techniciens passionnés, formés aux dernières technologies de diagnostic et de réparation. Nous combinons un service de garage traditionnel de haute précision avec un magasin de pièces détachées premium, offrant ainsi une solution complète à nos clients.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6">
              <div className="flex items-start space-x-3">
                 <ShieldCheck className="text-accent shrink-0" />
                 <div>
                    <h4 className="font-bold font-oswald uppercase">Sérieux</h4>
                    <p className="text-sm text-gray-500">Engagés sur le résultat.</p>
                 </div>
              </div>
              <div className="flex items-start space-x-3">
                 <Users className="text-accent shrink-0" />
                 <div>
                    <h4 className="font-bold font-oswald uppercase">Proximité</h4>
                    <p className="text-sm text-gray-500">À l'écoute de vos besoins.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <Target size={32} />
              </div>
              <h4 className="text-3xl font-bold font-oswald mb-6 uppercase">NOTRE MISSION</h4>
              <p className="text-gray-600 leading-relaxed flex-1">
                Fournir une expertise mécanique irréprochable et des pièces de qualité supérieure pour assurer la longévité des véhicules circulant sur les routes marocaines, tout en offrant un service client transparent et honnête.
              </p>
            </div>
            <div className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-8">
                <Eye size={32} />
              </div>
              <h4 className="text-3xl font-bold font-oswald mb-6 uppercase">NOTRE VISION</h4>
              <p className="text-gray-600 leading-relaxed flex-1">
                Devenir le partenaire automobile numéro un au Maroc, reconnu pour son innovation technique, sa fiabilité et sa contribution à une conduite plus sûre et plus durable pour tous les automobilistes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values/Stats */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
               <div>
                  <div className="text-5xl font-bold font-oswald text-accent mb-2">5000+</div>
                  <div className="text-sm uppercase font-bold text-gray-500 tracking-widest">Clients Satisfaits</div>
               </div>
               <div>
                  <div className="text-5xl font-bold font-oswald text-accent mb-2">15000+</div>
                  <div className="text-sm uppercase font-bold text-gray-500 tracking-widest">Interventions</div>
               </div>
               <div>
                  <div className="text-5xl font-bold font-oswald text-accent mb-2">200+</div>
                  <div className="text-sm uppercase font-bold text-gray-500 tracking-widest">Produits en stock</div>
               </div>
               <div>
                  <div className="text-5xl font-bold font-oswald text-accent mb-2">100%</div>
                  <div className="text-sm uppercase font-bold text-gray-500 tracking-widest">Transparence</div>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
};

export default About;
