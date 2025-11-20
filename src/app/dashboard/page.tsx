'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/custom/navbar';
import {
  TrendingDown,
  Dumbbell,
  Apple,
  Trophy,
  Target,
  Calendar,
  Flame,
  Droplet,
  Moon,
  CheckCircle,
  ArrowRight,
  Award,
  Gift,
  Clock,
} from 'lucide-react';
import { userService, workoutService, mealPlanService } from '@/lib/supabase-service';

export default function DashboardPage() {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<any>(null);
  const [showTrialBanner, setShowTrialBanner] = useState(true);
  const [trialDaysLeft, setTrialDaysLeft] = useState(7);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [mealPlans, setMealPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
    checkTrialStatus();
  }, []);

  const loadUserData = async () => {
    try {
      // Carregar do localStorage primeiro
      const localProfile = localStorage.getItem('userProfile');
      if (localProfile) {
        const profile = JSON.parse(localProfile);
        setUserProfile(profile);

        // Se tiver email, buscar do Supabase
        if (profile.email) {
          const user = await userService.getUserByEmail(profile.email);
          if (user) {
            setUserProfile(user);
            
            // Carregar treinos e refeições
            const userWorkouts = await workoutService.getWorkoutsByUser(user.id);
            const userMeals = await mealPlanService.getMealPlansByUser(user.id);
            
            setWorkouts(userWorkouts || []);
            setMealPlans(userMeals || []);
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkTrialStatus = async () => {
    try {
      const localProfile = localStorage.getItem('userProfile');
      if (!localProfile) return;

      const profile = JSON.parse(localProfile);
      if (!profile.email) return;

      const user = await userService.getUserByEmail(profile.email);
      if (!user) return;

      // Verificar se trial expirou
      const isExpired = await userService.checkTrialExpiration(user.id);
      
      if (isExpired) {
        // Redirecionar para checkout
        router.push('/checkout?trial=expired');
        return;
      }

      // Calcular dias restantes
      if (user.trial_end_date) {
        const daysLeft = Math.ceil(
          (new Date(user.trial_end_date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
        );
        setTrialDaysLeft(daysLeft > 0 ? daysLeft : 0);
        setShowTrialBanner(daysLeft > 0 && user.is_trial_active);

        // Se acabou o trial, redirecionar
        if (daysLeft <= 0 && user.is_trial_active) {
          router.push('/checkout?trial=expired');
        }
      }
    } catch (error) {
      console.error('Erro ao verificar trial:', error);
    }
  };

  const startFreeTrial = async () => {
    try {
      const localProfile = localStorage.getItem('userProfile');
      if (!localProfile) {
        router.push('/avaliacao');
        return;
      }

      const profile = JSON.parse(localProfile);
      
      // Criar ou atualizar usuário no Supabase
      let user = await userService.getUserByEmail(profile.email);
      
      if (!user) {
        user = await userService.createUser({
          email: profile.email,
          full_name: profile.name || 'Usuário',
          is_trial_active: false,
          subscription_status: 'inactive',
        });
      }

      // Iniciar trial
      await userService.startFreeTrial(user.id);

      // Atualizar localStorage
      const trialEndDate = new Date();
      trialEndDate.setDate(trialEndDate.getDate() + 7);
      
      localStorage.setItem('freeTrial', JSON.stringify({
        startDate: new Date().toISOString(),
        endDate: trialEndDate.toISOString(),
        active: true,
      }));

      setTrialDaysLeft(7);
      setShowTrialBanner(true);
      
      // Redirecionar para formulário de dados pessoais
      router.push('/checkout?trial=true');
    } catch (error) {
      console.error('Erro ao iniciar trial:', error);
    }
  };

  const stats = [
    {
      icon: TrendingDown,
      label: 'Peso Atual',
      value: userProfile?.weight ? `${userProfile.weight} kg` : '-- kg',
      change: userProfile?.target_weight ? `Meta: ${userProfile.target_weight} kg` : '--',
      gradient: 'from-orange-500 to-red-600',
    },
    {
      icon: Dumbbell,
      label: 'Treinos',
      value: workouts.filter(w => w.completed).length.toString(),
      change: 'Completados',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: Flame,
      label: 'Calorias',
      value: mealPlans.reduce((sum, m) => sum + (m.calories || 0), 0).toString(),
      change: 'Total consumido',
      gradient: 'from-yellow-500 to-orange-600',
    },
    {
      icon: Trophy,
      label: 'Conquistas',
      value: '8',
      change: '+2 esta semana',
      gradient: 'from-green-500 to-teal-600',
    },
  ];

  const weeklyGoals = [
    { 
      id: 1, 
      title: 'Completar 5 treinos', 
      current: workouts.filter(w => w.completed).length, 
      target: 5, 
      icon: Dumbbell 
    },
    { id: 2, title: 'Beber 2L de água/dia', current: 6, target: 7, icon: Droplet },
    { 
      id: 3, 
      title: 'Seguir dieta 7 dias', 
      current: mealPlans.filter(m => m.completed).length, 
      target: 7, 
      icon: Apple 
    },
    { id: 4, title: 'Dormir 8h/noite', current: 4, target: 7, icon: Moon },
  ];

  const recentAchievements = [
    { id: 1, name: 'Primeira Avaliação', icon: Award, unlocked: true },
    { id: 2, name: 'Primeira Semana', icon: Calendar, unlocked: true },
    { id: 3, name: 'Guerreiro', icon: Trophy, unlocked: false },
    { id: 4, name: 'Disciplinado', icon: CheckCircle, unlocked: false },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Trial Banner */}
        {showTrialBanner && (
          <Card className="mb-8 p-6 bg-gradient-to-r from-orange-500 to-pink-600 text-white border-0">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Teste Gratuito Ativo!</h3>
                  <p className="text-white/90 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {trialDaysLeft} dias restantes
                  </p>
                </div>
              </div>
              <Button 
                onClick={() => router.push('/checkout')}
                className="bg-white text-orange-600 hover:bg-gray-100"
              >
                Assinar Agora
              </Button>
            </div>
          </Card>
        )}

        {/* Free Trial CTA (se não tiver teste ativo) */}
        {!showTrialBanner && (
          <Card className="mb-8 p-6 border-2 border-orange-500 bg-gradient-to-r from-orange-50 to-pink-50 dark:from-orange-950/20 dark:to-pink-950/20">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Experimente 7 Dias Grátis!</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Acesso completo a todos os recursos sem compromisso
                  </p>
                </div>
              </div>
              <Button 
                onClick={startFreeTrial}
                className="bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white"
              >
                Iniciar Teste Gratuito
              </Button>
            </div>
          </Card>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Olá, {userProfile?.full_name?.split(' ')[0] || userProfile?.name?.split(' ')[0] || 'Atleta'}! 👋
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Continue firme na sua jornada de transformação
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 border-2">
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">{stat.label}</div>
                <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                  {stat.change}
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Weekly Goals */}
          <Card className="lg:col-span-2 p-6 border-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold">Metas Semanais</h2>
              </div>
              <Button variant="ghost" size="sm" className="gap-2">
                Ver todas
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {weeklyGoals.map((goal) => {
                const Icon = goal.icon;
                const progress = (goal.current / goal.target) * 100;
                return (
                  <div key={goal.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                        <span className="font-medium">{goal.title}</span>
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {goal.current}/{goal.target}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Achievements */}
          <Card className="p-6 border-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Conquistas</h2>
            </div>

            <div className="space-y-3">
              {recentAchievements.map((achievement) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 border-yellow-200 dark:border-yellow-900'
                        : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 opacity-50'
                    }`}
                  >
                    <div
                      className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                        achievement.unlocked
                          ? 'bg-gradient-to-br from-yellow-500 to-orange-600'
                          : 'bg-gray-300 dark:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{achievement.name}</div>
                      {achievement.unlocked && (
                        <div className="text-xs text-green-600 dark:text-green-400">
                          Desbloqueado!
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card 
            onClick={() => router.push('/treinos')}
            className="p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Iniciar Treino</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Comece seu treino personalizado de hoje
            </p>
          </Card>

          <Card 
            onClick={() => router.push('/alimentacao')}
            className="p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Apple className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Plano Alimentar</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Veja suas refeições planejadas para hoje
            </p>
          </Card>

          <Card 
            onClick={() => router.push('/progresso')}
            className="p-6 border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <TrendingDown className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Registrar Progresso</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Atualize suas medidas e acompanhe evolução
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
