// src/app/checkout/page.tsx
import { Suspense } from 'react';
import CheckoutClientContent from './CheckoutClientContent';

/**
 * Componente de página principal (Server Component).
 * Ele apenas envolve o componente cliente com o limite de Suspense.
 */
export default function CheckoutPage() {
  return (
    // O fallback é mostrado enquanto o componente cliente é carregado/hidratado
    <Suspense fallback={<div>Carregando página de checkout...</div>}>
      <CheckoutClientContent />
    </Suspense>
  );
}
