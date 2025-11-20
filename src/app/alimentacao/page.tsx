'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/custom/navbar';
import {
  Apple,
  Flame,
  CheckCircle,
  ArrowLeft,
  Utensils,
  Coffee,
  Sun,
  Moon as MoonIcon,
  Cookie,
} from 'lucide-react';
import { mealPlanService, userService } from '@/lib/supabase-service';

export default function AlimentacaoPage() {
  const router = useRouter();
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadMealPlans();
  }, []);

  const loadMealPlans = async () => {
    try {
      const localProfile = localStorage.getItem('userProfile');
      if (!localProfile) {
        router.push('/avaliacao');
        return;
      }

      const profile = JSON.parse(localProfile);
      const user = await userService.getUserByEmail(profile.email);
      
      if (user) {
        setUserId(user.id);
        const userMeals = await mealPlanService.getMealPlansByUser(user.id);
        
        // Se não tiver refeições, criar refeições de exemplo
        if (!userMeals || userMeals.length === 0) {
          await createSampleMealPlans(user.id);
          const newMeals = await mealPlanService.getMealPlansByUser(user.id);
          setMealPlans(newMeals || []);
        } else {
          setMealPlans(userMeals);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar planos alimentares:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleMealPlans = async (userId: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    const sampleMeals = [
      {
        user_id: userId,
        date: today,
        meal_type: 'breakfast',
        name: 'Café da Manhã Energético',
        description: 'Refeição balanceada para começar o dia',
        calories: 450,
        protein: 25,
        carbs: 55,
        fats: 12,
        ingredients: [
          '2 fatias de pão integral',
          '2 ovos mexidos',
          '1 banana',
          '200ml de leite desnatado',
          '1 colher de pasta de amendoim',
        ],
        instructions: 'Prepare os ovos mexidos. Torre o pão. Sirva com a banana e o leite.',
        completed: false,
      },
      {
        user_id: userId,
        date: today,
        meal_type: 'snack',
        name: 'Lanche da Manhã',
        description: 'Snack leve e nutritivo',
        calories: 180,
        protein: 15,
        carbs: 20,
        fats: 5,
        ingredients: [
          '1 iogurte grego natural',
          '1 colher de granola',
          '1 punhado de frutas vermelhas',
        ],
        instructions: 'Misture o iogurte com a granola e as frutas.',
        completed: false,
      },
      {
        user_id: userId,
        date: today,
        meal_type: 'lunch',
        name: 'Almoço Completo',
        description: 'Refeição principal do dia',
        calories: 650,
        protein: 45,
        carbs: 70,
        fats: 18,
        ingredients: [
          '150g de frango grelhado',
          '1 xícara de arroz integral',
          '1 concha de feijão',
          'Salada verde à vontade',
          '1 colher de azeite',
        ],
        instructions: 'Grelhe o frango temperado. Cozinhe o arroz e o feijão. Monte o prato com a salada.',
        completed: false,
      },
      {
        user_id: userId,
        date: today,
        meal_type: 'snack',
        name: 'Lanche da Tarde',
        description: 'Energia para o treino',
        calories: 220,
        protein: 12,
        carbs: 30,
        fats: 6,
        ingredients: [
          '1 batata doce média',
          '2 fatias de peito de peru',
          '1 maçã',
        ],
        instructions: 'Cozinhe a batata doce. Sirva com o peito de peru e a maçã.',
        completed: false,
      },
      {
        user_id: userId,
        date: today,
        meal_type: 'dinner',
        name: 'Jantar Leve',
        description: 'Refeição noturna balanceada',
        calories: 480,
        protein: 38,
        carbs: 45,
        fats: 14,
        ingredients: [
          '150g de peixe grelhado',
          '1 batata inglesa média',
          'Legumes no vapor',
          'Salada verde',
        ],
        instructions: 'Grelhe o peixe. Cozinhe a batata e os legumes no vapor. Sirva com salada.',
        completed: false,
      },
    ];

    for (const meal of sampleMeals) {
      await mealPlanService.createMealPlan(meal);
    }
  };

  const handleCompleteMeal = async (mealId: string) => {
    try {
      await mealPlanService.markMealCompleted(mealId);
      setMealPlans(mealPlans.map(m => 
        m.id === mealId ? { ...m, completed: true } : m
      ));
    } catch (error) {
      console.error('Erro ao completar refeição:', error);
    }
  };

  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return Coffee;
      case 'lunch':
        return Sun;
      case 'dinner':
        return MoonIcon;
      case 'snack':
        return Cookie;
      default:
        return Utensils;
    }
  };

  const getMealLabel = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'Café da Manhã';
      case 'lunch':
        return 'Almoço';
      case 'dinner':
        return 'Jantar';
      case 'snack':
        return 'Lanche';
      default:
        return 'Refeição';
    }
  };

  const getMealColor = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return 'from-yellow-500 to-orange-600';
      case 'lunch':
        return 'from-orange-500 to-red-600';
      case 'dinner':
        return 'from-purple-500 to-indigo-600';
      case 'snack':
        return 'from-green-500 to-teal-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const completedMeals = mealPlans.filter(m => m.completed).length;
  const totalMeals = mealPlans.length;
  const progressPercentage = totalMeals > 0 ? (completedMeals / totalMeals) * 100 : 0;
  const totalCalories = mealPlans.reduce((sum, m) => sum + (m.completed ? m.calories : 0), 0);
  const totalProtein = mealPlans.reduce((sum, m) => sum + (m.completed ? m.protein : 0), 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando plano alimentar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          onClick={() => router.push('/dashboard')}
          variant="ghost" 
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Dashboard
        </Button>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
              <Apple className="h-6 w-6 text-white" />
            </div>
            Plano Alimentar
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Refeições balanceadas para seus objetivos
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8 border-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="font-bold">Progresso do Dia</span>
              </div>
              <Progress value={progressPercentage} className="h-3 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completedMeals} de {totalMeals} refeições completadas
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalCalories}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Calorias consumidas
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Apple className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{totalProtein.toFixed(0)}g</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Proteína consumida
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Meals List */}
        <div className="space-y-6">
          {mealPlans.map((meal) => {
            const MealIcon = getMealIcon(meal.meal_type);
            return (
              <Card 
                key={meal.id} 
                className={`p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                  meal.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${getMealColor(meal.meal_type)} flex items-center justify-center flex-shrink-0`}>
                      <MealIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {getMealLabel(meal.meal_type)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{meal.name}</h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {meal.description}
                      </p>
                    </div>
                  </div>
                  {meal.completed && (
                    <div className="flex-shrink-0 ml-4">
                      <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Macros */}
                <div className="grid grid-cols-4 gap-4 mb-4">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-orange-600">{meal.calories}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Calorias</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{meal.protein}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Proteína</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{meal.carbs}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Carboidratos</div>
                  </div>
                  <div className="bg-white dark:bg-gray-800 p-3 rounded-lg text-center">
                    <div className="text-2xl font-bold text-yellow-600">{meal.fats}g</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Gorduras</div>
                  </div>
                </div>

                {/* Ingredients */}
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Ingredientes:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {meal.ingredients?.map((ingredient: string, idx: number) => (
                      <li key={idx}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div className="mb-4">
                  <h4 className="font-bold mb-2">Modo de Preparo:</h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {meal.instructions}
                  </p>
                </div>

                <Button
                  onClick={() => handleCompleteMeal(meal.id)}
                  disabled={meal.completed}
                  className={`w-full ${
                    meal.completed
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700'
                  } text-white`}
                >
                  {meal.completed ? (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Refeição Concluída
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-5 w-5" />
                      Marcar como Concluída
                    </>
                  )}
                </Button>
              </Card>
            );
          })}
        </div>

        {mealPlans.length === 0 && (
          <Card className="p-12 text-center border-2">
            <Apple className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Nenhum plano alimentar disponível</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete sua avaliação para receber um plano alimentar personalizado
            </p>
            <Button
              onClick={() => router.push('/avaliacao')}
              className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
            >
              Fazer Avaliação
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
