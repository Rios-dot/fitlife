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
    return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Back Button */}
        <Link href={isTrial ? "/dashboard" : "/"}>
          <Button variant="ghost" className="mb-6 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          {/* ... conteúdo do header (isTrial, Oferta Especial, h1, p) ... */}
        </div>

        {/* Step 1: Formulário de Dados Pessoais */}
        {step === 1 && (
          // ... todo o código do Formulário (Dados Pessoais) ...
        )}

        {/* Step 2: Seleção de Plano e Pagamento */}
        {step === 2 && (
          // ... todo o código da Seleção de Planos e Resumo do Pedido ...
        )}

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {/* ... badges de confiança ... */}
        </div>
      </div>
    </div>
  );
}
