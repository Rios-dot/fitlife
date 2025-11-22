// src/app/checkout/page.tsx (SERVER COMPONENT)

import { Suspense } from 'react';
import CheckoutClientContent from './CheckoutClientContent'; // Novo componente

// Tipagem para as props injetadas pelo Next.js (searchParams como prop)
interface CheckoutPageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function CheckoutPage({ searchParams }: CheckoutPageProps) {
  
  // OPTIONAL: Se você precisar de lógica de server-side aqui, use searchParams.trial.
  // Mas vamos focar em passar a prop para o componente cliente.

  return (
    // 1. O Suspense boundary é essencial para permitir useSearchParams()
    <Suspense fallback={<div>Carregando Checkout...</div>}>
      {/* 2. Passamos os searchParams como prop */}
      <CheckoutClientContent initialSearchParams={searchParams} />
    </Suspense>
  );
}

// Nota: Você pode passar 'searchParams' como prop, mas o componente cliente
// usará o hook useSearchParams() para ter acesso a ele no runtime.
// Vamos passar a prop para o componente cliente para manter o estado inicial
// limpo, embora o componente cliente use o hook.
