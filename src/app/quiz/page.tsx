'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, CheckCircle, Sparkles, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/custom/navbar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Question {
  id: number;
  question: string;
  type: 'choice' | 'input';
  options?: string[];
  inputType?: 'text' | 'number';
  placeholder?: string;
  unit?: string;
}

const questions: Question[] = [
  // Perguntas de avaliação física
  {
    id: 1,
    question: 'Qual é o seu peso atual?',
    type: 'input',
    inputType: 'number',
    placeholder: '70',
    unit: 'kg',
  },
  {
    id: 2,
    question: 'Qual é a sua altura?',
    type: 'input',
    inputType: 'number',
    placeholder: '170',
    unit: 'cm',
  },
  {
    id: 3,
    question: 'Qual é a sua idade?',
    type: 'input',
    inputType: 'number',
    placeholder: '30',
    unit: 'anos',
  },
  {
    id: 4,
    question: 'Qual é o seu sexo?',
    type: 'choice',
    options: ['Masculino', 'Feminino', 'Prefiro não informar'],
  },
  // Perguntas do quiz original
  {
    id: 5,
    question: 'Qual é o seu principal objetivo com o emagrecimento?',
    type: 'choice',
    options: [
      'Perder peso rapidamente',
      'Aumentar a energia e disposição',
      'Melhorar a saúde geral',
      'Aprender a se alimentar melhor',
    ],
  },
  {
    id: 6,
    question: 'Já tentou emagrecer antes?',
    type: 'choice',
    options: [
      'Sim, várias vezes',
      'Sim, mas sem sucesso',
      'Não, esta é a primeira vez',
    ],
  },
  {
    id: 7,
    question: 'Qual é a sua maior dificuldade ao tentar emagrecer?',
    type: 'choice',
    options: [
      'Resistir a tentações alimentares',
      'Fazer exercícios regularmente',
      'Manter a motivação',
      'Planejar refeições saudáveis',
    ],
  },
  {
    id: 8,
    question: 'O que você prefere para se exercitar?',
    type: 'choice',
    options: [
      'Academia',
      'Exercícios ao ar livre',
      'Home workouts',
      'Aulas em grupo',
    ],
  },
  {
    id: 9,
    question: 'Quantas refeições você faz por dia?',
    type: 'choice',
    options: ['1-2', '3', '4-5', 'Mais de 5'],
  },
  {
    id: 10,
    question: 'Como você avaliaria sua alimentação atualmente?',
    type: 'choice',
    options: [
      'Muito saudável',
      'Moderadamente saudável',
      'Preciso melhorar',
      'Não me importo',
    ],
  },
  {
    id: 11,
    question: 'Você tem alguma restrição alimentar?',
    type: 'choice',
    options: [
      'Sim, sou vegetariano(a)',
      'Sim, tenho alergias',
      'Não, posso comer de tudo',
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: answer });
  };

  const handleInputChange = (value: string) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: value });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Calcular IMC
  const calculateIMC = () => {
    const weight = parseFloat(answers[1] || '0');
    const heightCm = parseFloat(answers[2] || '0');
    const heightM = heightCm / 100;
    if (weight > 0 && heightM > 0) {
      return (weight / (heightM * heightM)).toFixed(1);
    }
    return null;
  };

  if (showResults) {
    const imc = calculateIMC();
    
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 md:p-12 border-2 shadow-2xl">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 mb-6">
                  <Sparkles className="h-10 w-10 text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  🎉 Parabéns! Você completou a avaliação! 🎉
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Com base nas suas respostas, aqui está sua recomendação personalizada com o FITLIFE
                </p>
              </div>

              {/* Dados Físicos */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-xl p-6 border-2 border-blue-100 dark:border-blue-900 mb-6">
                <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  Seus Dados
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Peso</p>
                    <p className="font-bold text-lg">{answers[1]} kg</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Altura</p>
                    <p className="font-bold text-lg">{answers[2]} cm</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">Idade</p>
                    <p className="font-bold text-lg">{answers[3]} anos</p>
                  </div>
                  {imc && (
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">IMC</p>
                      <p className="font-bold text-lg">{imc}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-6 mb-8">
                <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-xl p-6 border-2 border-orange-100 dark:border-orange-900">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    Meta
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {answers[5] || 'Seu objetivo principal'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-xl p-6 border-2 border-orange-100 dark:border-orange-900">
                  <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    Dificuldades
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {answers[7] || 'Suas principais dificuldades'}
                  </p>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-xl p-6 border-2 border-orange-100 dark:border-orange-900">
                  <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-orange-600" />
                    Plano de Ação
                  </h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Sugestões de refeições e receitas saudáveis personalizadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Rotinas de exercícios adaptadas ao seu gosto ({answers[8] || 'seu estilo preferido'})</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-600 font-bold">•</span>
                      <span>Dicas de motivação e acompanhamento contínuo</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-pink-600 rounded-2xl p-6 text-center text-white mb-8">
                <p className="text-lg font-semibold mb-2">
                  🔗 Baixe o FITLIFE e comece sua jornada de emagrecimento hoje!
                </p>
                <p className="text-sm opacity-90">
                  Agora, para facilitar ainda mais sua jornada, aproveite um desconto exclusivo na assinatura do FITLIFE!
                </p>
              </div>

              {/* Planos de Assinatura */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-center mb-6">
                  Escolha seu plano
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  {/* Plano Mensal */}
                  <Link href="/checkout">
                    <Card className="p-6 border-2 hover:border-orange-500 transition-all duration-300 hover:shadow-xl cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                            <h4 className="text-xl font-bold">Plano Mensal</h4>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            Renovação automática mensal
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-orange-600">R$ 19,90</span>
                            <span className="text-gray-500 dark:text-gray-400">/mês</span>
                          </div>
                        </div>
                        <ArrowRight className="h-6 w-6 text-orange-600" />
                      </div>
                    </Card>
                  </Link>

                  {/* Plano Anual */}
                  <Link href="/checkout">
                    <Card className="p-6 border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden">
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-pink-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                        MELHOR OFERTA
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-5 w-5 text-orange-600" />
                            <h4 className="text-xl font-bold">Plano Anual</h4>
                          </div>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                            Economize 25% no plano anual
                          </p>
                          <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-bold text-orange-600">12x R$ 14,90</span>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            ou R$ 178,80 à vista
                          </p>
                        </div>
                        <ArrowRight className="h-6 w-6 text-orange-600" />
                      </div>
                    </Card>
                  </Link>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-lg border-2"
                  >
                    Voltar ao Início
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-950 dark:to-pink-950 border border-orange-200 dark:border-orange-800 mb-6">
              <Sparkles className="h-4 w-4 text-orange-600" />
              <span className="text-sm font-medium text-orange-700 dark:text-orange-300">
                Avaliação Personalizada
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Descubra seu Caminho para a Saúde com o{' '}
              <span className="bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
                FITLIFE
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Responda algumas perguntas e receba um plano personalizado
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-medium text-orange-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question Card */}
          <Card className="p-8 md:p-12 border-2 shadow-2xl mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              {currentQ.question}
            </h2>

            {currentQ.type === 'choice' ? (
              <div className="space-y-4">
                {currentQ.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 hover:scale-[1.02] ${
                      answers[currentQ.id] === option
                        ? 'border-orange-500 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 shadow-lg'
                        : 'border-gray-200 dark:border-gray-800 hover:border-orange-300 dark:hover:border-orange-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[currentQ.id] === option
                            ? 'border-orange-500 bg-orange-500'
                            : 'border-gray-300 dark:border-gray-700'
                        }`}
                      >
                        {answers[currentQ.id] === option && (
                          <CheckCircle className="h-4 w-4 text-white" />
                        )}
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <Label htmlFor="input-answer" className="text-lg">
                  Digite sua resposta:
                </Label>
                <div className="flex gap-3 items-center">
                  <Input
                    id="input-answer"
                    type={currentQ.inputType}
                    placeholder={currentQ.placeholder}
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="text-lg h-14 border-2"
                  />
                  {currentQ.unit && (
                    <span className="text-lg font-medium text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {currentQ.unit}
                    </span>
                  )}
                </div>
              </div>
            )}
          </Card>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            {currentQuestion > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="lg"
                className="flex-1 border-2"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Anterior
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!answers[currentQ.id]}
              size="lg"
              className={`flex-1 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white shadow-xl ${
                currentQuestion === 0 ? 'w-full' : ''
              }`}
            >
              {currentQuestion === questions.length - 1 ? 'Ver Resultado' : 'Próxima'}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
