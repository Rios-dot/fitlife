import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos para o banco de dados
export interface User {
  id: string;
  email: string;
  full_name: string;
  birth_date?: string;
  cpf?: string;
  phone?: string;
  trial_start_date?: string;
  trial_end_date?: string;
  is_trial_active: boolean;
  subscription_status: 'inactive' | 'trial' | 'active' | 'expired';
  created_at: string;
  updated_at: string;
}

export interface Assessment {
  id: string;
  user_id: string;
  weight: number;
  height: number;
  target_weight: number;
  age: number;
  gender: string;
  activity_level: string;
  goal: string;
  dietary_restrictions: string[];
  health_conditions: string[];
  created_at: string;
}

export interface Workout {
  id: string;
  user_id: string;
  name: string;
  description: string;
  difficulty_level: string;
  duration_minutes: number;
  calories_burned: number;
  exercises: any;
  scheduled_date: string;
  completed: boolean;
  created_at: string;
}

export interface MealPlan {
  id: string;
  user_id: string;
  date: string;
  meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  name: string;
  description: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  ingredients: any;
  instructions: string;
  completed: boolean;
  created_at: string;
}

export interface ProgressTracking {
  id: string;
  user_id: string;
  date: string;
  weight: number;
  body_fat_percentage?: number;
  muscle_mass?: number;
  measurements: any;
  photos: string[];
  notes: string;
  created_at: string;
}
