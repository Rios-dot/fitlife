// src/app/checkout/CheckoutClientContent.tsx
'use client'; 

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
// ... Mantenha todas as outras importações de UI, ícones, etc.

import { useSearchParams } from 'next/navigation'; // O hook está aqui agora!

// Defina a interface para as props (se necessário)
interface CheckoutClientContentProps {
  initialSearchParams?: { [key: string]: string | string[] | undefined };
}

// Renomeie a função export default para o novo nome do arquivo
export default function CheckoutClientContent({ initialSearchParams }: CheckoutClientContentProps) {
  
  // Use o hook useSearchParams() para ter certeza que você está no ambiente cliente
  const searchParams = useSearchParams(); 
  
  // Acesso ao parâmetro (usa o hook de cliente)
  const isTrial = searchParams?.get('trial') === 'true';
  
  // TODO: O estado inicial deve ser baseado no isTrial
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('anual');
  const [step, setStep] = useState(isTrial ? 1 : 2); // Mantém sua lógica
  // ... Mantenha todo o seu código de estado e lógica (handlePlanClick, formatCPF, etc.)

  const plans = [
    // ... Mantenha todo o seu array 'plans'
  ];

  const features = [
    // ... Mantenha todo o seu array 'features'
  ];

  const testimonials = [
    // ... Mantenha todo o seu array 'testimonials'
  ];

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)!;
  
  // ... Mantenha o restante das suas funções e o return JSX.

  return (
    // ... Seu JSX COMPLETO (o mesmo que você me enviou)
  );
}
