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

  const obtenerProductos = async () => {
    const querySnapshot = await getDocs(collection(db, 'productos'));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProductos(data);
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!nombre || !cantidad) return;
    if (editId) {
      const productoRef = doc(db, 'productos', editId);
      await updateDoc(productoRef, { nombre, cantidad: parseInt(cantidad) });
    } else {
      await addDoc(collection(db, 'productos'), { nombre, cantidad: parseInt(cantidad) });
    }
    await verificarYEnviarAlerta(nombre, parseInt(cantidad));

    setNombre('');
    setCantidad('');
    setEditId(null);
    obtenerProductos();
  };

  const eliminarProducto = async (id) => {
    await deleteDoc(doc(db, 'productos', id));
    obtenerProductos();
  };

  const editarProducto = (producto) => {
    setNombre(producto.nombre);
    setCantidad(producto.cantidad);
    setEditId(producto.id);
  };

  const cerrarSesion = async () => {
    await signOut(auth);
    router.push('/login');
  };

  const verificarYEnviarAlerta = async (nombre, cantidad) => {
  const umbral = 10; // puedes ajustar este valor

  if (cantidad < umbral) {
    await fetch('../lib/send-alert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: nombre, quantity: cantidad })
    });
  }
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

        <form onSubmit={manejarEnvio} className="space-y-4 mb-6">
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre del producto"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <input
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Cantidad"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            {editId ? 'Actualizar producto' : 'Agregar producto'}
          </button>
        </form>

        <div className="grid grid-cols-3 font-semibold text-gray-600 mb-2 px-4">
          <div>Nombre</div>
          <div>Cantidad</div>
          <div>Acciones</div>
        </div>

        <ul className="space-y-2">
          {productos.map((producto) => (
            <li key={producto.id} className="grid grid-cols-3 items-center bg-gray-100 px-4 py-3 rounded-lg">
              <span className="text-gray-700">{producto.nombre}</span>
              <span className="text-gray-700">{producto.cantidad}</span>
              <div className="space-x-2">
                <button
                  onClick={() => editarProducto(producto)}
                  className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                >Editar</button>
                <button
                  onClick={() => eliminarProducto(producto.id)}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                >Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
