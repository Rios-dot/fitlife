// Tipos do aplicativo de emagrecimento e treinos

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: 'masculino' | 'feminino' | 'outro';
  height: number; // em cm
  weight: number; // em kg
  targetWeight: number; // em kg
  activityLevel: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muito-intenso';
  goal: 'perder-peso' | 'ganhar-massa' | 'manter-peso' | 'definir';
  trainingLocation: 'casa' | 'academia' | 'ambos';
  dietaryRestrictions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Assessment {
  userId: string;
  date: Date;
  weight: number;
  bodyFat?: number;
  measurements?: {
    chest?: number;
    waist?: number;
    hips?: number;
    arms?: number;
    thighs?: number;
  };
  photos?: string[];
  notes?: string;
}

export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  type: 'casa' | 'academia';
  duration: number; // em semanas
  daysPerWeek: number;
  exercises: Exercise[];
  createdAt: Date;
}

export interface Exercise {
  id: string;
  name: string;
  category: 'cardio' | 'forca' | 'flexibilidade' | 'funcional';
  sets?: number;
  reps?: string;
  duration?: number; // em minutos
  rest?: number; // em segundos
  instructions: string;
  videoUrl?: string;
  equipment?: string[];
}

export interface MealPlan {
  id: string;
  userId: string;
  date: Date;
  totalCalories: number;
  meals: Meal[];
}

export interface Meal {
  id: string;
  type: 'cafe-da-manha' | 'lanche-manha' | 'almoco' | 'lanche-tarde' | 'jantar' | 'ceia';
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foods: Food[];
  photoUrl?: string;
}

export interface Food {
  name: string;
  quantity: number;
  unit: string;
  calories: number;
}

export interface WeeklyGoal {
  id: string;
  userId: string;
  week: number;
  year: number;
  goals: Goal[];
  completed: boolean;
  completedAt?: Date;
}

export interface Goal {
  id: string;
  description: string;
  type: 'treino' | 'alimentacao' | 'peso' | 'habito';
  target: number;
  current: number;
  unit: string;
  completed: boolean;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  unlockedAt?: Date;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  period: 'mensal' | 'semestral' | 'anual';
  features: string[];
  discount?: number;
}

export interface UserProgress {
  userId: string;
  date: Date;
  weight: number;
  workoutsCompleted: number;
  caloriesConsumed: number;
  waterIntake: number; // em ml
  sleepHours: number;
  mood: 'otimo' | 'bom' | 'regular' | 'ruim';
}
