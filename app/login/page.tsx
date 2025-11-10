/**
 * CONCEPTO CLAVE #1: 'use client'
 *
 * Por defecto, TODOS los componentes en Next.js App Router son SERVER COMPONENTS.
 * Esto significa que se renderizan en el servidor, no tienen acceso a hooks de React
 * como useState, useEffect, ni a APIs del browser.
 *
 * Cuando necesitas interactividad (formularios, estados, eventos), debes marcar
 * el componente como CLIENT COMPONENT con 'use client'.
 */
'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/app/lib/auth';
import { useAuthStore } from '../store/useAuthStore';

/**
 * CONCEPTO CLAVE #2: Rutas basadas en carpetas
 *
 * Este archivo está en app/login/page.tsx
 * Automáticamente crea la ruta: http://localhost:3000/login
 *
 * Estructura:
 * app/
 *   login/
 *     page.tsx  -> /login
 *   dashboard/
 *     page.tsx  -> /dashboard
 */
export default function LoginPage() {
  // Estado del formulario (esto solo funciona porque usamos 'use client')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { setToken } = useAuthStore();

  /**
   * CONCEPTO CLAVE #3: useRouter de next/navigation
   *
   * En Next.js 13+ usas 'next/navigation' (NO 'next/router' como en versiones viejas)
   * Esto te permite navegar programáticamente entre páginas
   */
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Llama al API
      const response = await loginUser(username, password);

      setToken(response.token); // Guarda el token en Zustand

      /**
       * CONCEPTO CLAVE #4: router.push()
       * Navega a otra ruta. Next.js hace prefetching automático
       * de las rutas para que la navegación sea instantánea
       */
      router.push('/dashboard'); // Navega al dashboard después del login
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de usuario */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Campo de contraseña */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
}
