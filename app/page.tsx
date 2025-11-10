/**
 * CONCEPTO: Server Components y redirect
 *
 * Este es un Server Component (sin 'use client')
 * Podemos usar la función redirect() de Next.js para redirigir
 * del lado del servidor antes de que se renderice nada
 */
import { redirect } from 'next/navigation';

export default function Home() {
  // Redirige automáticamente al login
  redirect('/login');
}
