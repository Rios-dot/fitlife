import { supabase, User, Assessment, Workout, MealPlan, ProgressTracking } from './supabase';

// Serviços de Usuário
export const userService = {
  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert([userData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getUserByEmail(email: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async startFreeTrial(userId: string) {
    const trialStartDate = new Date();
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    return this.updateUser(userId, {
      trial_start_date: trialStartDate.toISOString(),
      trial_end_date: trialEndDate.toISOString(),
      is_trial_active: true,
      subscription_status: 'trial',
    });
  },

  async checkTrialExpiration(userId: string) {
    const user = await this.getUserById(userId);
    if (!user || !user.trial_end_date) return false;

    const now = new Date();
    const trialEnd = new Date(user.trial_end_date);
    
    if (now > trialEnd && user.is_trial_active) {
      await this.updateUser(userId, {
        is_trial_active: false,
        subscription_status: 'expired',
      });
      return true; // Trial expirado
    }

    return false;
  },

  async getUserById(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAllUsers() {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },
};

// Serviços de Avaliação
export const assessmentService = {
  async createAssessment(assessmentData: Partial<Assessment>) {
    const { data, error } = await supabase
      .from('assessments')
      .insert([assessmentData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getAssessmentsByUser(userId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getLatestAssessment(userId: string) {
    const { data, error } = await supabase
      .from('assessments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
};

// Serviços de Treino
export const workoutService = {
  async createWorkout(workoutData: Partial<Workout>) {
    const { data, error } = await supabase
      .from('workouts')
      .insert([workoutData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getWorkoutsByUser(userId: string) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .order('scheduled_date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async updateWorkout(workoutId: string, updates: Partial<Workout>) {
    const { data, error } = await supabase
      .from('workouts')
      .update(updates)
      .eq('id', workoutId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markWorkoutCompleted(workoutId: string) {
    return this.updateWorkout(workoutId, { completed: true });
  },

  async getWorkoutsByDate(userId: string, date: string) {
    const { data, error } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', userId)
      .eq('scheduled_date', date);
    
    if (error) throw error;
    return data;
  },
};

// Serviços de Plano Alimentar
export const mealPlanService = {
  async createMealPlan(mealData: Partial<MealPlan>) {
    const { data, error } = await supabase
      .from('meal_plans')
      .insert([mealData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getMealPlansByUser(userId: string) {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getMealPlansByDate(userId: string, date: string) {
    const { data, error } = await supabase
      .from('meal_plans')
      .select('*')
      .eq('user_id', userId)
      .eq('date', date)
      .order('meal_type', { ascending: true });
    
    if (error) throw error;
    return data;
  },

  async updateMealPlan(mealId: string, updates: Partial<MealPlan>) {
    const { data, error } = await supabase
      .from('meal_plans')
      .update(updates)
      .eq('id', mealId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async markMealCompleted(mealId: string) {
    return this.updateMealPlan(mealId, { completed: true });
  },
};

// Serviços de Progresso
export const progressService = {
  async createProgress(progressData: Partial<ProgressTracking>) {
    const { data, error } = await supabase
      .from('progress_tracking')
      .insert([progressData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProgressByUser(userId: string) {
    const { data, error } = await supabase
      .from('progress_tracking')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  async getLatestProgress(userId: string) {
    const { data, error } = await supabase
      .from('progress_tracking')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false })
      .limit(1)
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data;
  },
};
