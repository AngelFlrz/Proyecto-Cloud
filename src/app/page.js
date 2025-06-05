// pages/login.js
'use client'

import { useRouter } from 'next/navigation';




export default function Entrar() {
  
  const router = useRouter();

 const handleSubmit = async (e) => {
     e.preventDefault();
     
       
       router.push('/login');
    
   };
 
      
   

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Bienvenido</h1>
        <form onSubmit={handleSubmit} className="space-y-4">

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
