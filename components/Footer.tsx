
import React from 'react';
import { Car, Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';
import { Page } from '../types';

interface FooterProps {
  setCurrentPage: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ setCurrentPage }) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-accent" />
              <span className="text-3xl font-bold font-oswald tracking-tighter">EL HAJI <span className="text-accent">AUTO</span></span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Votre partenaire de confiance pour l'entretien mécanique et les pièces automobiles de qualité au Maroc. Expertise, rapidité et transparence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-accent transition-colors"><Facebook size={20} /></a>
              <a href="#" className="p-2 bg-gray-800 rounded-full hover:bg-accent transition-colors"><Instagram size={20} /></a>
              <a href="https://wa.me/212600000000" className="p-2 bg-gray-800 rounded-full hover:bg-green-600 transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold font-oswald mb-6 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => setCurrentPage('home')} className="hover:text-accent transition-colors">Accueil</button></li>
              <li><button onClick={() => setCurrentPage('services')} className="hover:text-accent transition-colors">Services Mécaniques</button></li>
              <li><button onClick={() => setCurrentPage('products')} className="hover:text-accent transition-colors">Pièces & Produits</button></li>
              <li><button onClick={() => setCurrentPage('about')} className="hover:text-accent transition-colors">À Propos</button></li>
              <li><button onClick={() => setCurrentPage('appointment')} className="hover:text-accent transition-colors">Prendre RDV</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold font-oswald mb-6 uppercase tracking-wider">Nos Services</h3>
            <ul className="space-y-4 text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">Vidange complète</li>
              <li className="hover:text-white transition-colors cursor-pointer">Diagnostic Valise</li>
              <li className="hover:text-white transition-colors cursor-pointer">Système de freinage</li>
              <li className="hover:text-white transition-colors cursor-pointer">Réparation Moteur</li>
              <li className="hover:text-white transition-colors cursor-pointer">Suspension & Amortisseurs</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold font-oswald mb-6 uppercase tracking-wider">Contact Direct</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-gray-400">
                <MapPin className="text-accent shrink-0" size={20} />
                <span>123 Avenue Mohamed V, Casablanca, Maroc</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="text-accent shrink-0" size={20} />
                <span>+212 5 22 00 00 00</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="text-accent shrink-0" size={20} />
                <span>contact@elhajiauto.ma</span>
              </div>
              <div className="pt-4">
                 <p className="text-sm font-bold uppercase text-gray-500 mb-2">Horaires</p>
                 <p className="text-gray-400">Lun - Sam: 08:30 - 18:30</p>
                 <p className="text-accent font-bold">Dimanche: Fermé</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2024 EL HAJI AUTO. Tous droits réservés.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
            <a href="#" className="hover:text-white transition-colors">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
