'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Navbar } from '@/components/custom/navbar';
import {
  Dumbbell,
  Clock,
  Flame,
  CheckCircle,
  Play,
  ArrowLeft,
  Trophy,
  Target,
  TrendingUp,
} from 'lucide-react';
import { workoutService, userService } from '@/lib/supabase-service';

export default function TreinosPage() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
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
        const userWorkouts = await workoutService.getWorkoutsByUser(user.id);
        
        // Se não tiver treinos, criar treinos de exemplo
        if (!userWorkouts || userWorkouts.length === 0) {
          await createSampleWorkouts(user.id);
          const newWorkouts = await workoutService.getWorkoutsByUser(user.id);
          setWorkouts(newWorkouts || []);
        } else {
          setWorkouts(userWorkouts);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar treinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const createSampleWorkouts = async (userId: string) => {
    const sampleWorkouts = [
      {
        user_id: userId,
        name: 'Treino de Peito e Tríceps',
        description: 'Foco em desenvolvimento do peitoral e tríceps',
        difficulty_level: 'intermediário',
        duration_minutes: 60,
        calories_burned: 350,
        scheduled_date: new Date().toISOString().split('T')[0],
        exercises: [
          { name: 'Supino Reto', sets: 4, reps: 12 },
          { name: 'Supino Inclinado', sets: 3, reps: 12 },
          { name: 'Crucifixo', sets: 3, reps: 15 },
          { name: 'Tríceps Pulley', sets: 4, reps: 12 },
          { name: 'Tríceps Testa', sets: 3, reps: 12 },
        ],
        completed: false,
      },
      {
        user_id: userId,
        name: 'Treino de Costas e Bíceps',
        description: 'Desenvolvimento completo das costas e bíceps',
        difficulty_level: 'intermediário',
        duration_minutes: 65,
        calories_burned: 380,
        scheduled_date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
        exercises: [
          { name: 'Barra Fixa', sets: 4, reps: 10 },
          { name: 'Remada Curvada', sets: 4, reps: 12 },
          { name: 'Pulldown', sets: 3, reps: 12 },
          { name: 'Rosca Direta', sets: 4, reps: 12 },
          { name: 'Rosca Martelo', sets: 3, reps: 12 },
        ],
        completed: false,
      },
      {
        user_id: userId,
        name: 'Treino de Pernas',
        description: 'Treino completo de membros inferiores',
        difficulty_level: 'avançado',
        duration_minutes: 70,
        calories_burned: 420,
        scheduled_date: new Date(Date.now() + 172800000).toISOString().split('T')[0],
        exercises: [
          { name: 'Agachamento Livre', sets: 4, reps: 12 },
          { name: 'Leg Press', sets: 4, reps: 15 },
          { name: 'Cadeira Extensora', sets: 3, reps: 15 },
          { name: 'Mesa Flexora', sets: 3, reps: 15 },
          { name: 'Panturrilha em Pé', sets: 4, reps: 20 },
        ],
        completed: false,
      },
      {
        user_id: userId,
        name: 'Treino de Ombros e Abdômen',
        description: 'Desenvolvimento de ombros e core',
        difficulty_level: 'intermediário',
        duration_minutes: 55,
        calories_burned: 320,
        scheduled_date: new Date(Date.now() + 259200000).toISOString().split('T')[0],
        exercises: [
          { name: 'Desenvolvimento com Barra', sets: 4, reps: 12 },
          { name: 'Elevação Lateral', sets: 4, reps: 15 },
          { name: 'Elevação Frontal', sets: 3, reps: 12 },
          { name: 'Abdominal Supra', sets: 4, reps: 20 },
          { name: 'Prancha', sets: 3, reps: '60s' },
        ],
        completed: false,
      },
    ];

    for (const workout of sampleWorkouts) {
      await workoutService.createWorkout(workout);
    }
  };

  const handleCompleteWorkout = async (workoutId: string) => {
    try {
      await workoutService.markWorkoutCompleted(workoutId);
      setWorkouts(workouts.map(w => 
        w.id === workoutId ? { ...w, completed: true } : w
      ));
    } catch (error) {
      console.error('Erro ao completar treino:', error);
    }
  };

  const getDifficultyColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'iniciante':
        return 'from-green-500 to-teal-600';
      case 'intermediário':
        return 'from-orange-500 to-pink-600';
      case 'avançado':
        return 'from-red-500 to-purple-600';
      default:
        return 'from-blue-500 to-purple-600';
    }
  };

  const completedWorkouts = workouts.filter(w => w.completed).length;
  const totalWorkouts = workouts.length;
  const progressPercentage = totalWorkouts > 0 ? (completedWorkouts / totalWorkouts) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Carregando treinos...</p>
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
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Dumbbell className="h-6 w-6 text-white" />
            </div>
            Meus Treinos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Treinos personalizados para seus objetivos
          </p>
        </div>

        {/* Progress Overview */}
        <Card className="p-6 mb-8 border-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Target className="h-5 w-5 text-orange-600" />
                <span className="font-bold">Progresso Semanal</span>
              </div>
              <Progress value={progressPercentage} className="h-3 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {completedWorkouts} de {totalWorkouts} treinos completados
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
                <Flame className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {workouts.reduce((sum, w) => sum + (w.completed ? w.calories_burned : 0), 0)}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Calorias queimadas
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold">{completedWorkouts}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Treinos concluídos
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Workouts List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workouts.map((workout) => (
            <Card 
              key={workout.id} 
              className={`p-6 border-2 transition-all duration-300 hover:shadow-xl ${
                workout.completed ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${getDifficultyColor(workout.difficulty_level)} flex items-center justify-center`}>
                      <Dumbbell className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{workout.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                        {workout.difficulty_level}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">
                    {workout.description}
                  </p>
                </div>
                {workout.completed && (
                  <div className="flex-shrink-0 ml-4">
                    <div className="h-10 w-10 rounded-full bg-green-500 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  <span className="text-sm">{workout.duration_minutes} min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-600" />
                  <span className="text-sm">{workout.calories_burned} kcal</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-sm">{workout.exercises?.length || 0} exercícios</span>
                </div>
              </div>

              {/* Exercises List */}
              <div className="mb-4 space-y-2">
                {workout.exercises?.slice(0, 3).map((exercise: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between text-sm bg-white dark:bg-gray-800 p-2 rounded">
                    <span className="font-medium">{exercise.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">
                      {exercise.sets}x{exercise.reps}
                    </span>
                  </div>
                ))}
                {workout.exercises?.length > 3 && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    +{workout.exercises.length - 3} exercícios
                  </p>
                )}
              </div>

              <Button
                onClick={() => handleCompleteWorkout(workout.id)}
                disabled={workout.completed}
                className={`w-full ${
                  workout.completed
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700'
                } text-white`}
              >
                {workout.completed ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Treino Concluído
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-5 w-5" />
                    Iniciar Treino
                  </>
                )}
              </Button>
            </Card>
          ))}
        </div>

        {workouts.length === 0 && (
          <Card className="p-12 text-center border-2">
            <Dumbbell className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Nenhum treino disponível</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Complete sua avaliação para receber treinos personalizados
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
