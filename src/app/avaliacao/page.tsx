'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, User, Activity, Target, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navbar } from '@/components/custom/navbar';
import { ACTIVITY_LEVELS, GOALS, TRAINING_LOCATIONS } from '@/lib/constants';

export default function AvaliacaoPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    targetWeight: '',
    activityLevel: '',
    goal: '',
    trainingLocation: '',
  });

  const totalSteps = 4;

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Salvar dados e redirecionar para dashboard
      localStorage.setItem('userProfile', JSON.stringify(formData));
      router.push('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.age && formData.gender;
      case 2:
        return formData.height && formData.weight && formData.targetWeight;
      case 3:
        return formData.activityLevel;
      case 4:
        return formData.goal && formData.trainingLocation;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Etapa {step} de {totalSteps}
              </span>
              <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {Math.round((step / totalSteps) * 100)}%
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-pink-600 transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          <Card className="p-6 md:p-8 border-2">
            {/* Step 1: Informações Pessoais */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Informações Pessoais</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Vamos começar conhecendo você
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nome Completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="age">Idade</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="25"
                        value={formData.age}
                        onChange={(e) => updateFormData('age', e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Gênero</Label>
                      <RadioGroup
                        value={formData.gender}
                        onValueChange={(value) => updateFormData('gender', value)}
                        className="mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="masculino" id="masculino" />
                          <Label htmlFor="masculino" className="cursor-pointer">Masculino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="feminino" id="feminino" />
                          <Label htmlFor="feminino" className="cursor-pointer">Feminino</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="outro" id="outro" />
                          <Label htmlFor="outro" className="cursor-pointer">Outro</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Medidas */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Suas Medidas</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Informe suas medidas atuais
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="height">Altura (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      placeholder="170"
                      value={formData.height}
                      onChange={(e) => updateFormData('height', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="weight">Peso Atual (kg)</Label>
                    <Input
                      id="weight"
                      type="number"
                      placeholder="75"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="targetWeight">Peso Desejado (kg)</Label>
                    <Input
                      id="targetWeight"
                      type="number"
                      placeholder="70"
                      value={formData.targetWeight}
                      onChange={(e) => updateFormData('targetWeight', e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {formData.weight && formData.targetWeight && (
                    <div className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20 rounded-lg border border-orange-200 dark:border-orange-900">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Meta: {Math.abs(Number(formData.weight) - Number(formData.targetWeight)).toFixed(1)} kg{' '}
                        {Number(formData.weight) > Number(formData.targetWeight) ? 'a perder' : 'a ganhar'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 3: Nível de Atividade */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                    <Activity className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Nível de Atividade</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Qual sua rotina de exercícios atual?
                    </p>
                  </div>
                </div>

                <RadioGroup
                  value={formData.activityLevel}
                  onValueChange={(value) => updateFormData('activityLevel', value)}
                  className="space-y-3"
                >
                  {ACTIVITY_LEVELS.map((level) => (
                    <div
                      key={level.value}
                      className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.activityLevel === level.value
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                          : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                      }`}
                    >
                      <RadioGroupItem value={level.value} id={level.value} className="mt-1" />
                      <Label htmlFor={level.value} className="cursor-pointer flex-1">
                        <div className="font-semibold">{level.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {level.description}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {/* Step 4: Objetivo e Local */}
            {step === 4 && (
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                    <Target className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Seu Objetivo</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      O que você deseja alcançar?
                    </p>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Objetivo Principal</Label>
                  <RadioGroup
                    value={formData.goal}
                    onValueChange={(value) => updateFormData('goal', value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-3"
                  >
                    {GOALS.map((goal) => (
                      <div
                        key={goal.value}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.goal === goal.value
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <RadioGroupItem value={goal.value} id={goal.value} />
                        <Label htmlFor={goal.value} className="cursor-pointer flex-1 font-semibold">
                          {goal.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="mb-3 block">Local de Treino</Label>
                  <RadioGroup
                    value={formData.trainingLocation}
                    onValueChange={(value) => updateFormData('trainingLocation', value)}
                    className="space-y-3"
                  >
                    {TRAINING_LOCATIONS.map((location) => (
                      <div
                        key={location.value}
                        className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          formData.trainingLocation === location.value
                            ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                            : 'border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700'
                        }`}
                      >
                        <RadioGroupItem value={location.value} id={location.value} />
                        <Label htmlFor={location.value} className="cursor-pointer flex-1 font-semibold">
                          {location.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={step === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Voltar
              </Button>

              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white gap-2"
              >
                {step === totalSteps ? 'Finalizar' : 'Próximo'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
