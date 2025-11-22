'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navbar } from '@/components/custom/navbar';
import {
  Check,
  CreditCard,
  Lock,
  Shield,
  Star,
  Zap,
  Trophy,
  Crown,
  ArrowLeft,
  User,
  Calendar as CalendarIcon,
  Phone,
  Mail,
  FileText,
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const isTrial = searchParams?.get('trial') === 'true';
  
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual'>('anual');
  const [step, setStep] = useState(isTrial ? 1 : 2); // Se for trial, começa no formulário
  const [personalData, setPersonalData] = useState({
    fullName: '',
    birthDate: '',
    cpf: '',
    phone: '',
    email: '',
  });

  const plans = [
    {
      id: 'mensal',
      name: 'Plano Mensal',
      price: 19.90,
      period: 'mês',
      discount: 0,
      badge: null,
      gradient: 'from-gray-500 to-gray-600',
      description: 'Renovação automática mensal',
      paymentLink: 'https://pag.ae/81e2k3414',
    },
    {
      id: 'anual',
      name: 'Plano Anual',
      price: 14.90,
      period: 'mês',
      discount: 25,
      badge: 'Mais Popular',
      gradient: 'from-orange-500 to-pink-600',
      total: 178.80,
      savings: 60.00,
      description: '12x de R$ 14,90',
      paymentLink: 'https://pag.ae/81e2ubMYQ',
    },
  ];

  const features = [
    'Treinos personalizados ilimitados',
    'Planos alimentares customizados',
    'Calculadora de calorias com IA',
    'Acompanhamento de progresso detalhado',
    'Sistema de conquistas e gamificação',
    'Suporte prioritário via chat',
    'Acesso a comunidade exclusiva',
    'Atualizações e novos treinos mensais',
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Perdeu 15kg em 3 meses',
      text: 'Melhor investimento que fiz na minha saúde! Os treinos são práticos e a alimentação é deliciosa.',
      rating: 5,
    },
    {
      name: 'João Santos',
      role: 'Ganhou 8kg de massa muscular',
      text: 'Aplicativo completo e fácil de usar. Consegui resultados que nunca imaginei alcançar!',
      rating: 5,
    },
    {
      name: 'Ana Costa',
      role: 'Definiu o corpo em 4 meses',
      text: 'A gamificação me mantém motivada todos os dias. Recomendo para todos!',
      rating: 5,
    },
  ];

  const selectedPlanData = plans.find((p) => p.id === selectedPlan)!;

  const handlePlanClick = (planId: string) => {
    setSelectedPlan(planId as any);
  };

  const isPersonalDataValid = () => {
    return (
      personalData.fullName &&
      personalData.birthDate &&
      personalData.cpf &&
      personalData.phone &&
      personalData.email
    );
  };

  const handleContinueToPayment = () => {
    if (isPersonalDataValid()) {
      // Salvar dados pessoais
      localStorage.setItem('personalData', JSON.stringify(personalData));
      setStep(2);
    }
  };

  const handleFinalizePayment = () => {
    // Abrir link de pagamento do plano selecionado
    window.open(selectedPlanData.paymentLink, '_blank');
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1');
  };

  const formatPhone = (value: string) => {
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1');
  };

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
          {isTrial && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-teal-100 dark:from-green-950 dark:to-teal-950 border border-green-200 dark:border-green-800 mb-4">
              <Zap className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-700 dark:text-green-300">
                Teste Gratuito de 7 Dias - Sem Compromisso
              </span>
            </div>
          )}
          {!isTrial && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-950 dark:to-pink-950 border border-orange-200 dark:border-orange-800 mb-4">
              <Zap className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Oferta Especial - Economize até 25%
              </span>
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {step === 1 ? 'Complete seus dados' : 'Escolha seu plano e comece'}{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              agora mesmo
            </span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {step === 1 
              ? 'Precisamos de algumas informações para personalizar sua experiência'
              : 'Acesso completo a todas as funcionalidades. Cancele quando quiser.'}
          </p>
        </div>

        {/* Step 1: Formulário de Dados Pessoais */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                  <User className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Dados Pessoais</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Preencha suas informações para continuar
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Nome Completo
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="Seu nome completo"
                    value={personalData.fullName}
                    onChange={(e) => setPersonalData({ ...personalData, fullName: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="birthDate" className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Data de Nascimento
                  </Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={personalData.birthDate}
                    onChange={(e) => setPersonalData({ ...personalData, birthDate: e.target.value })}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="cpf" className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    CPF
                  </Label>
                  <Input
                    id="cpf"
                    placeholder="000.000.000-00"
                    value={personalData.cpf}
                    onChange={(e) => setPersonalData({ ...personalData, cpf: formatCPF(e.target.value) })}
                    maxLength={14}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Telefone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="(00) 00000-0000"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({ ...personalData, phone: formatPhone(e.target.value) })}
                    maxLength={15}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={personalData.email}
                    onChange={(e) => setPersonalData({ ...personalData, email: e.target.value })}
                    className="mt-2"
                  />
                </div>
              </div>

              <Button
                onClick={handleContinueToPayment}
                disabled={!isPersonalDataValid()}
                className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white py-6 text-lg"
              >
                Continuar para Pagamento
                <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Seus dados estão seguros e protegidos
              </p>
            </Card>
          </div>
        )}

        {/* Step 2: Seleção de Plano e Pagamento */}
        {step === 2 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Plans Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => (
                  <Card
                    key={plan.id}
                    onClick={() => handlePlanClick(plan.id)}
                    className={`p-6 cursor-pointer transition-all duration-300 hover:shadow-xl relative overflow-hidden ${
                      selectedPlan === plan.id
                        ? 'border-4 border-orange-500 shadow-2xl scale-105'
                        : 'border-2 hover:border-orange-300'
                    }`}
                  >
                    {plan.badge && (
                      <div className={`absolute top-0 right-0 px-3 py-1 rounded-bl-lg bg-gradient-to-r ${plan.gradient} text-white text-xs font-bold`}>
                        {plan.badge}
                      </div>
                    )}

                    <div className="text-center mt-4">
                      <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-4`}>
                        {plan.id === 'mensal' && <Crown className="h-8 w-8 text-white" />}
                        {plan.id === 'anual' && <Trophy className="h-8 w-8 text-white" />}
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>

                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {plan.description}
                      </p>

                      {plan.discount > 0 && (
                        <div className="text-sm text-green-600 dark:text-green-400 font-bold mb-2">
                          Economize {plan.discount}%
                        </div>
                      )}

                      <div className="mb-4">
                        <div className="text-4xl font-bold">
                          R$ {plan.price.toFixed(2).replace('.', ',')}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          /{plan.period}
                        </div>
                      </div>

                      {plan.total && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          Total: R$ {plan.total.toFixed(2).replace('.', ',')}
                          <div className="text-xs text-green-600 dark:text-green-400">
                            Você economiza R$ {plan.savings?.toFixed(2).replace('.', ',')}
                          </div>
                        </div>
                      )}

                      {selectedPlan === plan.id && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-orange-600 font-bold">
                          <Check className="h-5 w-5" />
                          Selecionado
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {/* Features List */}
              <Card className="p-6 border-2">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-orange-600" />
                  O que está incluído
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 border-2 sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Resumo do Pedido</h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold">{selectedPlanData.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        R$ {selectedPlanData.price.toFixed(2).replace('.', ',')}/{selectedPlanData.period}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">
                        R$ {(selectedPlanData.total || selectedPlanData.price).toFixed(2).replace('.', ',')}
                      </div>
                    </div>
                  </div>

                  {selectedPlanData.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 font-bold">
                      <span>Desconto ({selectedPlanData.discount}%)</span>
                      <span>-R$ {selectedPlanData.savings?.toFixed(2).replace('.', ',')}</span>
                    </div>
                  )}

                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between items-center text-2xl font-bold">
                      <span>Total</span>
                      <span className="text-orange-600">
                        R$ {(selectedPlanData.total || selectedPlanData.price).toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleFinalizePayment}
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-xl text-lg py-6 mb-4"
                >
                  <Lock className="mr-2 h-5 w-5" />
                  Finalizar Compra
                </Button>

                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Shield className="h-4 w-4 text-green-600" />
                    Pagamento 100% seguro
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    {isTrial ? '7 dias grátis - Sem cobrança imediata' : 'Garantia de 7 dias - Cancele quando quiser'}
                  </div>
                </div>
              </Card>

              {/* Testimonials */}
              <div className="mt-6 space-y-4">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-4 border-2">
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                      "{testimonial.text}"
                    </p>
                    <div className="text-xs">
                      <div className="font-bold">{testimonial.name}</div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl mb-2">🔒</div>
            <div className="font-bold text-sm">Pagamento Seguro</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              SSL Certificado
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">✅</div>
            <div className="font-bold text-sm">Garantia 7 Dias</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Devolução total
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💳</div>
            <div className="font-bold text-sm">Parcelamento</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Em até 12x
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="font-bold text-sm">Suporte 24/7</div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Sempre disponível
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
