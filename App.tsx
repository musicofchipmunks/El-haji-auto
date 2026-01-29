
import React, { useState, useEffect } from 'react';
import { Page, Product, CartItem, Order, Appointment } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import AppointmentPage from './pages/Appointment';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminAppointments from './pages/AdminAppointments';
import { INITIAL_PRODUCTS } from './constants';
import { elhautoDb, elhautoAuth, onAuthStateChanged, collection, onSnapshot, query, orderBy, addDoc, updateDoc, doc } from './firebase';

const AUTHORIZED_ADMIN_EMAIL = "elhajiauto@gmail.com";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('elhajiauto_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const elhautoProductsRef = collection(elhautoDb, "elhauto_products");
  const elhautoOrdersRef = collection(elhautoDb, "elhauto_orders");
  const elhautoAppointmentsRef = collection(elhautoDb, "elhauto_appointments");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(elhautoAuth, (user) => {
      setIsAdmin(!!user && user.email === AUTHORIZED_ADMIN_EMAIL);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(elhautoProductsRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dbProducts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      if (dbProducts.length === 0 && !isAdmin) {
        setProducts(INITIAL_PRODUCTS.map(p => ({ ...p, isActive: true, createdAt: new Date().toISOString() })));
      } else {
        setProducts(dbProducts);
      }
    });
    return () => unsubscribe();
  }, [isAdmin]);

  useEffect(() => {
    if (!isAdmin) return;
    const qO = query(elhautoOrdersRef, orderBy("createdAt", "desc"));
    const unsubO = onSnapshot(qO, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
    });
    const qA = query(elhautoAppointmentsRef, orderBy("createdAt", "desc"));
    const unsubA = onSnapshot(qA, (snapshot) => {
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment)));
    });
    return () => { unsubO(); unsubA(); };
  }, [isAdmin]);

  useEffect(() => localStorage.setItem('elhajiauto_cart', JSON.stringify(cart)), [cart]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: Math.min(item.quantity + quantity, item.stock) } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    setCurrentPage('cart');
  };

  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.id !== productId));
  const updateCartQuantity = (productId: string, quantity: number) => {
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, item.stock)) } : item));
  };

  const placeOrder = async (clientData: any) => {
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    try {
      await addDoc(elhautoOrdersRef, {
        createdAt: new Date().toISOString(),
        clientName: clientData.name,
        phone: clientData.phone,
        address: clientData.address,
        items: cart,
        totalPrice: subtotal + 50,
        status: 'new'
      });
      setCart([]);
      setCurrentPage('home');
      alert('Commande enregistrée !');
    } catch (e) { console.error(e); }
  };

  const renderPage = () => {
    const product = products.find(p => p.id === selectedProductId);
    switch (currentPage) {
      case 'home': return <Home setCurrentPage={setCurrentPage} viewProduct={(id) => { setSelectedProductId(id); setCurrentPage('product-detail'); }} />;
      case 'services': return <Services setCurrentPage={setCurrentPage} />;
      case 'products': return <Products products={products.filter(p => p.isActive !== false)} viewProduct={(id) => { setSelectedProductId(id); setCurrentPage('product-detail'); }} />;
      case 'product-detail': return product ? <ProductDetail product={product} addToCart={addToCart} setCurrentPage={setCurrentPage} /> : <Home setCurrentPage={setCurrentPage} viewProduct={() => {}} />;
      case 'cart': return <Cart cart={cart} removeFromCart={removeFromCart} updateCartQuantity={updateCartQuantity} setCurrentPage={setCurrentPage} />;
      case 'checkout': return <Checkout cart={cart} placeOrder={placeOrder} setCurrentPage={setCurrentPage} />;
      case 'about': return <About />;
      case 'contact': return <Contact />;
      case 'appointment': return <AppointmentPage />;
      case 'admin-login': return <AdminLogin setCurrentPage={setCurrentPage} />;
      case 'admin-dashboard': return isAdmin ? <AdminDashboard orders={orders} products={products} setCurrentPage={setCurrentPage} /> : <AdminLogin setCurrentPage={setCurrentPage} />;
      case 'admin-products': return isAdmin ? <AdminProducts products={products} setCurrentPage={setCurrentPage} /> : <AdminLogin setCurrentPage={setCurrentPage} />;
      case 'admin-orders': return isAdmin ? <AdminOrders orders={orders} setCurrentPage={setCurrentPage} /> : <AdminLogin setCurrentPage={setCurrentPage} />;
      case 'admin-appointments': return isAdmin ? <AdminAppointments appointments={appointments} setCurrentPage={setCurrentPage} /> : <AdminLogin setCurrentPage={setCurrentPage} />;
      default: return <Home setCurrentPage={setCurrentPage} viewProduct={() => {}} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} cart={cart} />
      <main className="flex-grow">{renderPage()}</main>
      {!currentPage.startsWith('admin') && <Footer setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;
