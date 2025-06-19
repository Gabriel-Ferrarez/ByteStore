import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

export function AdminRoute({ children }: { children: ReactNode }) {
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  if (usuario.tipo !== 'administrador') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}