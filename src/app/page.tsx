'use client';

import Link from 'next/link';
import { ArrowRight, Dumbbell, Apple, TrendingUp, Trophy, Zap, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/custom/navbar';

export default function Home() {
  const features = [
    {
      icon: Dumbbell,
      title: 'Treinos Personalizados',
      description: 'Planos de treino adaptados ao seu objetivo, seja em casa ou na academia',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: Apple,
      title: 'Orientação Alimentar',
      description: 'Dietas personalizadas e calculadora de calorias com análise de fotos',
      gradient: 'from-green-500 to-teal-600',
    },
    {
      icon: TrendingUp,
      title: 'Acompanhamento',
      description: 'Monitore seu progresso com gráficos detalhados e métricas precisas',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Trophy,
      title: 'Gamificação',
      description: 'Conquiste medalhas, desbloqueie conquistas e mantenha-se motivado',
      gradient: 'from-yellow-500 to-orange-600',
    },
  ];

  const benefits = [
    'Avaliação inicial completa e gratuita',
    'Treinos para casa ou academia',
    'Planos alimentares personalizados',
    'Calculadora de calorias com IA',
    'Metas semanais inteligentes',
    'Notificações motivacionais',
    'Acompanhamento de progresso',
    'Sistema de conquistas e recompensas',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col items-center text-center gap-8 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-950 dark:to-pink-950 border border-orange-200 dark:border-orange-800">
            <Zap className="h-4 w-4 text-orange-600" />
            <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
              Transforme seu corpo e sua vida
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Seu app completo de{' '}
            <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              emagrecimento
            </span>{' '}
            e treinos
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            Treinos personalizados, orientação alimentar inteligente e acompanhamento completo 
            para você alcançar seus objetivos de forma saudável e sustentável.
          </p>

          <div className="mt-4">
            <Link href="/quiz">
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6">
                Começar Avaliação Gratuita
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center gap-6 mt-8">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white font-bold"
                >
                  {i}
                </div>
              ))}
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Mais de 10.000 usuários satisfeitos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Tudo que você precisa em um só lugar
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Funcionalidades completas para sua jornada fitness
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-gradient-to-br from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-3xl p-8 md:p-12 border-2 border-orange-100 dark:border-orange-900">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center">
              Por que escolher o FitLife?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center mt-0.5">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 mb-16">
        <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-3xl p-8 md:p-16 text-center text-white shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Pronto para transformar sua vida?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Comece sua jornada hoje com nosso quiz personalizado e descubra 
            o melhor plano para alcançar seus objetivos.
          </p>
          <Link href="/quiz">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 shadow-xl text-lg px-8 py-6">
              Começar Avaliação Gratuita
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
