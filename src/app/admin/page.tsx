'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings, 
  DollarSign, 
  CreditCard, 
  Package, 
  Lock, 
  Users, 
  Dumbbell, 
  Apple,
  TrendingUp,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'trial' | 'inactive';
  plan: 'mensal' | 'anual';
  joinDate: string;
  lastAccess: string;
  weight: string;
  goal: string;
  progress: number;
}

interface Workout {
  id: string;
  userId: string;
  userName: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
  completed: boolean;
}

interface Diet {
  id: string;
  userId: string;
  userName: string;
  mealType: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  date: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'trial' | 'inactive'>('all');

  // Senha padrão (você pode mudar depois)
  const ADMIN_PASSWORD = 'admin123';

  // Dados mockados de usuários
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Maria Silva',
      email: 'maria@email.com',
      status: 'active',
      plan: 'anual',
      joinDate: '2024-01-15',
      lastAccess: '2024-11-18',
      weight: '68kg',
      goal: 'Perder Peso',
      progress: 75,
    },
    {
      id: '2',
      name: 'João Santos',
      email: 'joao@email.com',
      status: 'trial',
      plan: 'mensal',
      joinDate: '2024-11-12',
      lastAccess: '2024-11-18',
      weight: '85kg',
      goal: 'Ganhar Massa',
      progress: 30,
    },
    {
      id: '3',
      name: 'Ana Costa',
      email: 'ana@email.com',
      status: 'active',
      plan: 'anual',
      joinDate: '2024-02-20',
      lastAccess: '2024-11-17',
      weight: '62kg',
      goal: 'Definir',
      progress: 90,
    },
    {
      id: '4',
      name: 'Pedro Oliveira',
      email: 'pedro@email.com',
      status: 'inactive',
      plan: 'mensal',
      joinDate: '2024-10-01',
      lastAccess: '2024-10-30',
      weight: '78kg',
      goal: 'Manter Peso',
      progress: 45,
    },
  ]);

  // Dados mockados de treinos
  const [workouts] = useState<Workout[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Maria Silva',
      type: 'Treino de Pernas',
      duration: 45,
      calories: 320,
      date: '2024-11-18',
      completed: true,
    },
    {
      id: '2',
      userId: '2',
      userName: 'João Santos',
      type: 'Treino de Peito',
      duration: 60,
      calories: 450,
      date: '2024-11-18',
      completed: true,
    },
    {
      id: '3',
      userId: '3',
      userName: 'Ana Costa',
      type: 'Treino HIIT',
      duration: 30,
      calories: 280,
      date: '2024-11-17',
      completed: true,
    },
  ]);

  // Dados mockados de dietas
  const [diets] = useState<Diet[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Maria Silva',
      mealType: 'Café da Manhã',
      calories: 350,
      protein: 25,
      carbs: 45,
      fat: 12,
      date: '2024-11-18',
    },
    {
      id: '2',
      userId: '2',
      userName: 'João Santos',
      mealType: 'Almoço',
      calories: 650,
      protein: 45,
      carbs: 70,
      fat: 20,
      date: '2024-11-18',
    },
    {
      id: '3',
      userId: '3',
      userName: 'Ana Costa',
      mealType: 'Jantar',
      calories: 480,
      protein: 35,
      carbs: 50,
      fat: 15,
      date: '2024-11-18',
    },
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta!');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { label: string; className: string }> = {
      active: { label: 'Ativo', className: 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' },
      trial: { label: 'Teste', className: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' },
      inactive: { label: 'Inativo', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
    };
    const variant = variants[status] || variants.inactive;
    return <Badge className={variant.className}>{variant.label}</Badge>;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    {
      label: 'Total de Usuários',
      value: users.length,
      icon: Users,
      gradient: 'from-blue-500 to-purple-600',
      change: '+12% este mês',
    },
    {
      label: 'Usuários Ativos',
      value: users.filter(u => u.status === 'active').length,
      icon: CheckCircle,
      gradient: 'from-green-500 to-teal-600',
      change: '+8% este mês',
    },
    {
      label: 'Em Teste Gratuito',
      value: users.filter(u => u.status === 'trial').length,
      icon: Clock,
      gradient: 'from-yellow-500 to-orange-600',
      change: '5 novos hoje',
    },
    {
      label: 'Receita Mensal',
      value: 'R$ 2.847',
      icon: DollarSign,
      gradient: 'from-orange-500 to-pink-600',
      change: '+25% este mês',
    },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Painel Administrativo</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="password">Senha de Administrador</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite a senha"
                className="mt-2"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-pink-600">
              Entrar
            </Button>
            <p className="text-sm text-gray-500 text-center mt-4">
              Senha padrão: admin123
            </p>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Painel Administrativo</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Gerencie usuários, treinos e dietas em um só lugar
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 border-2">
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

        <Tabs defaultValue="usuarios" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-auto">
            <TabsTrigger value="usuarios" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
            <TabsTrigger value="treinos" className="flex items-center gap-2">
              <Dumbbell className="h-4 w-4" />
              <span className="hidden sm:inline">Treinos</span>
            </TabsTrigger>
            <TabsTrigger value="dietas" className="flex items-center gap-2">
              <Apple className="h-4 w-4" />
              <span className="hidden sm:inline">Dietas</span>
            </TabsTrigger>
            <TabsTrigger value="planos" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Planos</span>
            </TabsTrigger>
            <TabsTrigger value="configuracoes" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Config</span>
            </TabsTrigger>
          </TabsList>

          {/* Gerenciamento de Usuários */}
          <TabsContent value="usuarios" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Gerenciar Usuários</h2>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>

              {/* Filtros */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Buscar por nome ou email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant={filterStatus === 'all' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('all')}
                    size="sm"
                  >
                    Todos
                  </Button>
                  <Button
                    variant={filterStatus === 'active' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('active')}
                    size="sm"
                  >
                    Ativos
                  </Button>
                  <Button
                    variant={filterStatus === 'trial' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('trial')}
                    size="sm"
                  >
                    Teste
                  </Button>
                  <Button
                    variant={filterStatus === 'inactive' ? 'default' : 'outline'}
                    onClick={() => setFilterStatus('inactive')}
                    size="sm"
                  >
                    Inativos
                  </Button>
                </div>
              </div>

              {/* Tabela de Usuários */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Usuário</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                      <th className="text-left p-4 font-semibold">Plano</th>
                      <th className="text-left p-4 font-semibold">Objetivo</th>
                      <th className="text-left p-4 font-semibold">Progresso</th>
                      <th className="text-left p-4 font-semibold">Último Acesso</th>
                      <th className="text-left p-4 font-semibold">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-4">
                          <div>
                            <div className="font-semibold">{user.name}</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">{user.email}</div>
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(user.status)}</td>
                        <td className="p-4">
                          <Badge variant="outline">{user.plan === 'anual' ? 'Anual' : 'Mensal'}</Badge>
                        </td>
                        <td className="p-4">
                          <div className="text-sm">{user.goal}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">{user.weight}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-orange-500 to-pink-600"
                                style={{ width: `${user.progress}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium">{user.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{new Date(user.lastAccess).toLocaleDateString('pt-BR')}</td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Treinos */}
          <TabsContent value="treinos" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Treinos Realizados</h2>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Usuário</th>
                      <th className="text-left p-4 font-semibold">Tipo de Treino</th>
                      <th className="text-left p-4 font-semibold">Duração</th>
                      <th className="text-left p-4 font-semibold">Calorias</th>
                      <th className="text-left p-4 font-semibold">Data</th>
                      <th className="text-left p-4 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workouts.map((workout) => (
                      <tr key={workout.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-4 font-semibold">{workout.userName}</td>
                        <td className="p-4">{workout.type}</td>
                        <td className="p-4">{workout.duration} min</td>
                        <td className="p-4">{workout.calories} kcal</td>
                        <td className="p-4">{new Date(workout.date).toLocaleDateString('pt-BR')}</td>
                        <td className="p-4">
                          {workout.completed ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Concluído
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300">
                              <Clock className="h-3 w-3 mr-1" />
                              Pendente
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Dietas */}
          <TabsContent value="dietas" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Refeições Registradas</h2>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4 font-semibold">Usuário</th>
                      <th className="text-left p-4 font-semibold">Tipo de Refeição</th>
                      <th className="text-left p-4 font-semibold">Calorias</th>
                      <th className="text-left p-4 font-semibold">Proteína</th>
                      <th className="text-left p-4 font-semibold">Carboidratos</th>
                      <th className="text-left p-4 font-semibold">Gordura</th>
                      <th className="text-left p-4 font-semibold">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diets.map((diet) => (
                      <tr key={diet.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                        <td className="p-4 font-semibold">{diet.userName}</td>
                        <td className="p-4">{diet.mealType}</td>
                        <td className="p-4">{diet.calories} kcal</td>
                        <td className="p-4">{diet.protein}g</td>
                        <td className="p-4">{diet.carbs}g</td>
                        <td className="p-4">{diet.fat}g</td>
                        <td className="p-4">{new Date(diet.date).toLocaleDateString('pt-BR')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          {/* Gerenciamento de Planos */}
          <TabsContent value="planos" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Gerenciar Planos</h2>
              
              <div className="space-y-6">
                {/* Plano Mensal */}
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-bold">Plano Mensal</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mensal-preco">Preço (R$)</Label>
                      <Input id="mensal-preco" type="number" defaultValue="19.90" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="mensal-desconto">Desconto (%)</Label>
                      <Input id="mensal-desconto" type="number" defaultValue="0" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="mensal-link">Link de Pagamento</Label>
                    <Input 
                      id="mensal-link" 
                      type="text" 
                      defaultValue="https://pag.ae/81e2k3414"
                      className="mt-2"
                    />
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </div>

                {/* Plano Anual */}
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-bold">Plano Anual</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="anual-preco">Preço (R$)</Label>
                      <Input id="anual-preco" type="number" defaultValue="14.90" className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="anual-desconto">Desconto (%)</Label>
                      <Input id="anual-desconto" type="number" defaultValue="25" className="mt-2" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="anual-link">Link de Pagamento</Label>
                    <Input 
                      id="anual-link" 
                      type="text" 
                      defaultValue="https://pag.ae/81e2ubMYQ"
                      className="mt-2"
                    />
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Configurações Gerais */}
          <TabsContent value="configuracoes" className="space-y-6">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Configurações Gerais</h2>
              
              <div className="space-y-6">
                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-bold">Informações do App</h3>
                  
                  <div>
                    <Label htmlFor="app-nome">Nome do Aplicativo</Label>
                    <Input id="app-nome" type="text" defaultValue="FitLife" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="app-email">Email de Contato</Label>
                    <Input id="app-email" type="email" placeholder="contato@fitlife.com" className="mt-2" />
                  </div>

                  <Button className="w-full">Salvar Informações</Button>
                </div>

                <div className="border rounded-lg p-6 space-y-4">
                  <h3 className="text-xl font-bold">Segurança</h3>
                  
                  <div>
                    <Label htmlFor="nova-senha">Nova Senha de Admin</Label>
                    <Input id="nova-senha" type="password" placeholder="Digite a nova senha" className="mt-2" />
                  </div>

                  <div>
                    <Label htmlFor="confirmar-senha">Confirmar Senha</Label>
                    <Input id="confirmar-senha" type="password" placeholder="Confirme a senha" className="mt-2" />
                  </div>

                  <Button className="w-full bg-red-600 hover:bg-red-700">
                    Alterar Senha
                  </Button>
                </div>

                <div className="border rounded-lg p-6">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setIsAuthenticated(false)}
                  >
                    Sair do Painel
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
