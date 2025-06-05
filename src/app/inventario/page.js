// pages/inventario.js
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { app } from '../lib/firebase';

const auth = getAuth(app);
const db = getFirestore(app);

export default function Inventario() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push('/login');
      } else {
        setLoading(false);
        obtenerProductos();
      }
    });
    return () => unsubscribe();
  }, [router]);

  

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="text-gray-600 text-lg">Cargando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestor de Inventario</h1>
          <button
            onClick={cerrarSesion}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg"
          >
            Cerrar sesión
          </button>
        </div>

        
      </div>
    </div>
  );
}
