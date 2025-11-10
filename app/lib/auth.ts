/**
 * Utilidades de autenticación
 * En Next.js es común separar la lógica de negocio en carpetas como 'lib' o 'utils'
 */

// Tipos para la respuesta del API
export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  message: string;
}

/**
 * Función para hacer login contra el backend
 * Esta función corre en el CLIENTE (browser)
 */
export async function loginUser(username: string, password: string): Promise<LoginResponse> {
  const response = await fetch('http://localhost:8000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const error: ErrorResponse = await response.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  // Devuelve el token que enviará el backend
  return response.json();
}

