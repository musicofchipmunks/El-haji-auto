import { Service, Product, Category } from './types';
import { 
  Wrench, Settings, Disc, Thermometer, Battery, Droplet, Search, 
  Cpu, ShieldCheck, Clock, Award, Filter, Car, ShoppingCart, 
  Trash2, Package, Plus, Edit, LayoutDashboard, LogOut, ChevronRight, Calendar
} from 'lucide-react';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Huile Moteur 5W30 Synthétique',
    categoryId: 'huiles',
    brand: 'Castrol',
    description: 'Huile haute performance pour moteurs essence et diesel récents. Offre une protection maximale contre l\'usure.',
    imageUrl: 'https://images.unsplash.com/photo-1635816895665-bb9885939c16?auto=format&fit=crop&q=80&w=800',
    price: 450,
    stock: 24
  },
  {
    id: 'p2',
    name: 'Filtre à Huile Haute Efficacité',
    categoryId: 'filtres',
    brand: 'Mann-Filter',
    description: 'Protection optimale du moteur contre les impuretés.',
    imageUrl: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=800',
    price: 120,
    stock: 50
  },
  {
    id: 'p3',
    name: 'Liquide de Refroidissement -35°C',
    categoryId: 'refroidissement',
    brand: 'Motul',
    description: 'Protection contre le gel et la corrosion du système.',
    imageUrl: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=800',
    price: 85,
    stock: 15
  }
];

export const CATEGORIES: Category[] = [
  { id: 'huiles', name: 'Huiles & Lubrifiants', icon: 'Droplet' },
  { id: 'filtres', name: 'Filtres', icon: 'Filter' },
  { id: 'refroidissement', name: 'Refroidissement', icon: 'Thermometer' },
  { id: 'freinage', name: 'Freinage', icon: 'Disc' },
  { id: 'batteries', name: 'Batteries', icon: 'Battery' },
  { id: 'accessoires', name: 'Accessoires', icon: 'Car' }
];

export const SERVICES: Service[] = [
  {
    id: 'vidange',
    title: 'Vidange & Entretien',
    description: 'Une vidange régulière est essentielle pour la longévité de votre moteur. Nous utilisons des huiles adaptées.',
    benefits: ['Longévité moteur accrue', 'Performance optimale', 'Économie de carburant'],
    icon: 'Droplet',
    image: 'https://images.unsplash.com/photo-1599256621730-535171e28e50?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic Électronique',
    description: 'Repérez précisément les pannes grâce à nos outils de diagnostic de pointe. Lecture des codes d\'erreur.',
    benefits: ['Précision absolue', 'Gain de temps', 'Prévention des pannes'],
    icon: 'Cpu',
    image: 'https://images.unsplash.com/photo-1504222490345-c075b6008014?auto=format&fit=crop&q=80&w=1200'
  }
];

export const ICON_MAP: Record<string, any> = {
  Wrench, Settings, Disc, Thermometer, Battery, Droplet, Search, 
  Cpu, ShieldCheck, Clock, Award, Filter, Car, ShoppingCart, 
  Trash2, Package, Plus, Edit, LayoutDashboard, LogOut, ChevronRight, Calendar
};