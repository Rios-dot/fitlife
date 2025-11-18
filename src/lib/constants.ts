// Constantes do aplicativo

export const ACTIVITY_LEVELS = [
  { value: 'sedentario', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
  { value: 'leve', label: 'Levemente ativo', description: '1-3 dias por semana' },
  { value: 'moderado', label: 'Moderadamente ativo', description: '3-5 dias por semana' },
  { value: 'intenso', label: 'Muito ativo', description: '6-7 dias por semana' },
  { value: 'muito-intenso', label: 'Extremamente ativo', description: 'Atleta ou trabalho físico intenso' },
] as const;

export const GOALS = [
  { value: 'perder-peso', label: 'Perder Peso', icon: 'TrendingDown', color: 'from-orange-500 to-red-500' },
  { value: 'ganhar-massa', label: 'Ganhar Massa Muscular', icon: 'Dumbbell', color: 'from-blue-500 to-purple-500' },
  { value: 'manter-peso', label: 'Manter Peso', icon: 'Target', color: 'from-green-500 to-teal-500' },
  { value: 'definir', label: 'Definição Muscular', icon: 'Zap', color: 'from-yellow-500 to-orange-500' },
] as const;

export const TRAINING_LOCATIONS = [
  { value: 'casa', label: 'Em Casa', icon: 'Home' },
  { value: 'academia', label: 'Academia', icon: 'Building' },
  { value: 'ambos', label: 'Ambos', icon: 'MapPin' },
] as const;

export const SUBSCRIPTION_PLANS = [
  {
    id: 'mensal',
    name: 'Plano Mensal',
    price: 49.90,
    period: 'mensal' as const,
    discount: 0,
    features: [
      'Treinos personalizados ilimitados',
      'Planos alimentares customizados',
      'Calculadora de calorias com IA',
      'Acompanhamento de progresso',
      'Metas semanais',
      'Suporte via chat',
    ],
  },
  {
    id: 'semestral',
    name: 'Plano Semestral',
    price: 239.90,
    period: 'semestral' as const,
    discount: 20,
    popular: true,
    features: [
      'Tudo do plano mensal',
      '20% de desconto',
      'Consultoria nutricional mensal',
      'Avaliação física trimestral',
      'Acesso a comunidade exclusiva',
      'Receitas premium',
    ],
  },
  {
    id: 'anual',
    name: 'Plano Anual',
    price: 399.90,
    period: 'anual' as const,
    discount: 33,
    features: [
      'Tudo do plano semestral',
      '33% de desconto',
      'Acompanhamento personalizado',
      'Plano de treino trimestral',
      'Acesso vitalício a conteúdos',
      'Prioridade no suporte',
    ],
  },
] as const;

export const MEAL_TYPES = [
  { value: 'cafe-da-manha', label: 'Café da Manhã', icon: 'Coffee' },
  { value: 'lanche-manha', label: 'Lanche da Manhã', icon: 'Apple' },
  { value: 'almoco', label: 'Almoço', icon: 'UtensilsCrossed' },
  { value: 'lanche-tarde', label: 'Lanche da Tarde', icon: 'Cookie' },
  { value: 'jantar', label: 'Jantar', icon: 'Soup' },
  { value: 'ceia', label: 'Ceia', icon: 'Moon' },
] as const;

export const ACHIEVEMENTS = [
  { id: '1', name: 'Primeira Avaliação', description: 'Complete sua primeira avaliação', icon: 'Award', points: 10 },
  { id: '2', name: 'Primeira Semana', description: 'Complete 7 dias consecutivos', icon: 'Calendar', points: 50 },
  { id: '3', name: 'Guerreiro', description: 'Complete 30 treinos', icon: 'Sword', points: 100 },
  { id: '4', name: 'Disciplinado', description: 'Siga o plano alimentar por 7 dias', icon: 'CheckCircle', points: 75 },
  { id: '5', name: 'Meta Alcançada', description: 'Atinja sua primeira meta de peso', icon: 'Trophy', points: 200 },
] as const;
