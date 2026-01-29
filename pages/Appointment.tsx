
import React, { useState } from 'react';
import { Calendar, Clock, Car, Wrench, CheckCircle } from 'lucide-react';
import { elhautoDb, collection, addDoc } from '../firebase';

const Appointment: React.FC = () => {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    registration: '',
    service: 'Vidange & Entretien',
    date: '',
    time: '09:00',
    clientName: '',
    phone: ''
  });

  const nextStep = () => setStep(prev => prev + 1);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await addDoc(collection(elhautoDb, "elhauto_appointments"), {
        ...formData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'envoi de la demande. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white py-32 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-gray-50 p-12 rounded-[3rem] border border-gray-100 shadow-xl">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-bold font-oswald uppercase mb-4">DEMANDE REÇUE !</h2>
          <p className="text-gray-500 mb-8">
            Merci de votre confiance. Notre chef d'atelier vous contactera au {formData.phone} pour confirmer votre rendez-vous.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-accent text-white px-8 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all w-full"
          >
            Retour
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-oswald uppercase mb-4 tracking-tight">PRENDRE <span className="text-accent">RENDEZ-VOUS</span></h1>
          <p className="text-gray-500 text-lg">Planifiez votre visite en quelques clics pour un service prioritaire.</p>
        </div>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          <div className="md:w-1/3 bg-automotive p-10 text-white flex flex-col justify-between">
            <div className="space-y-10">
              <div className={`flex items-center space-x-4 ${step >= 1 ? 'text-accent' : 'text-gray-500'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 1 ? 'border-accent bg-accent text-white' : 'border-gray-700'}`}>1</div>
                <span className="font-bold uppercase tracking-widest text-sm">Véhicule</span>
              </div>
              <div className={`flex items-center space-x-4 ${step >= 2 ? 'text-accent' : 'text-gray-500'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 2 ? 'border-accent bg-accent text-white' : 'border-gray-700'}`}>2</div>
                <span className="font-bold uppercase tracking-widest text-sm">Service</span>
              </div>
              <div className={`flex items-center space-x-4 ${step >= 3 ? 'text-accent' : 'text-gray-500'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold border-2 ${step >= 3 ? 'border-accent bg-accent text-white' : 'border-gray-700'}`}>3</div>
                <span className="font-bold uppercase tracking-widest text-sm">Date & Heure</span>
              </div>
            </div>
          </div>

          <div className="flex-1 p-12">
            <form onSubmit={handleSubmit} className="h-full flex flex-col justify-between">
              {step === 1 && (
                <div className="space-y-8 animate-fadeIn">
                  <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center">
                    <Car className="mr-3 text-accent" /> Informations Véhicule
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-4">Marque</label>
                      <input type="text" value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} placeholder="Ex: Mercedes, Toyota..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-4">Modèle</label>
                      <input type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} placeholder="Ex: Class C, Land Cruiser..." className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" required />
                    </div>
                  </div>
                  <button type="button" onClick={nextStep} className="w-full bg-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all mt-8">Suivant</button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-fadeIn">
                  <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center">
                    <Wrench className="mr-3 text-accent" /> Type de Service
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    {['Vidange & Entretien', 'Diagnostic Électronique', 'Système de Freinage', 'Moteur / Embrayage', 'Autre réparation'].map(service => (
                      <label key={service} className="flex items-center p-6 bg-gray-50 rounded-2xl cursor-pointer hover:bg-gray-100 transition-colors border-2 border-transparent has-[:checked]:border-accent has-[:checked]:bg-red-50">
                        <input type="radio" name="service" checked={formData.service === service} onChange={() => setFormData({...formData, service})} className="hidden" />
                        <span className="font-bold text-gray-700 uppercase tracking-wider">{service}</span>
                      </label>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Retour</button>
                    <button type="button" onClick={nextStep} className="flex-1 bg-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all">Suivant</button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-8 animate-fadeIn">
                  <h3 className="text-2xl font-bold font-oswald uppercase mb-6 flex items-center">
                    <Calendar className="mr-3 text-accent" /> Date & Heure
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-4">Choisir une Date</label>
                      <input type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-4">Choisir l'heure</label>
                      <select value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" required>
                        <option>09:00</option><option>10:30</option><option>14:00</option><option>16:00</option>
                      </select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-xs font-bold uppercase text-gray-400 ml-4">Vos Coordonnées</label>
                      <div className="flex gap-4">
                        <input type="text" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} placeholder="Nom" className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" required />
                        <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} placeholder="Tél" className="flex-1 px-6 py-4 rounded-2xl bg-gray-50 border-none outline-none focus:ring-2 focus:ring-accent" required />
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setStep(2)} className="flex-1 bg-gray-100 text-gray-600 py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">Retour</button>
                    <button type="submit" disabled={loading} className="flex-1 bg-accent text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-red-700 transition-all disabled:opacity-50">
                      {loading ? 'Envoi...' : 'Confirmer'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
