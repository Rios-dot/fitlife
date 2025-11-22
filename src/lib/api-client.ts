// Cliente para fazer requisições às API Routes

type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
};

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      const data = await response.json();
      return data;
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao fazer requisição',
      };
    }
  }

  // Usuários
  async getUser(userId: string) {
    return this.request(`/api/users?userId=${userId}`);
  }

  async createUser(userData: any) {
    return this.request('/api/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId: string, userData: any) {
    return this.request('/api/users', {
      method: 'PUT',
      body: JSON.stringify({ id: userId, ...userData }),
    });
  }

  // Treinos
  async getTreinos(userId?: string) {
    const query = userId ? `?userId=${userId}` : '';
    return this.request(`/api/treinos${query}`);
  }

  async getTreino(treinoId: string) {
    return this.request(`/api/treinos?treinoId=${treinoId}`);
  }

  async createTreino(treinoData: any) {
    return this.request('/api/treinos', {
      method: 'POST',
      body: JSON.stringify(treinoData),
    });
  }

  async updateTreino(treinoId: string, treinoData: any) {
    return this.request('/api/treinos', {
      method: 'PUT',
      body: JSON.stringify({ id: treinoId, ...treinoData }),
    });
  }

  async deleteTreino(treinoId: string) {
    return this.request(`/api/treinos?id=${treinoId}`, {
      method: 'DELETE',
    });
  }

  // Alimentação
  async getPlanosAlimentares(userId?: string) {
    const query = userId ? `?userId=${userId}` : '';
    return this.request(`/api/alimentacao${query}`);
  }

  async getPlanoAlimentar(planoId: string) {
    return this.request(`/api/alimentacao?planoId=${planoId}`);
  }

  async createPlanoAlimentar(planoData: any) {
    return this.request('/api/alimentacao', {
      method: 'POST',
      body: JSON.stringify(planoData),
    });
  }

  async updatePlanoAlimentar(planoId: string, planoData: any) {
    return this.request('/api/alimentacao', {
      method: 'PUT',
      body: JSON.stringify({ id: planoId, ...planoData }),
    });
  }

  async deletePlanoAlimentar(planoId: string) {
    return this.request(`/api/alimentacao?id=${planoId}`, {
      method: 'DELETE',
    });
  }

  // Avaliações
  async createAvaliacao(avaliacaoData: any) {
    return this.request('/api/avaliacoes', {
      method: 'POST',
      body: JSON.stringify(avaliacaoData),
    });
  }

  async getAvaliacoes(userId: string) {
    return this.request(`/api/avaliacoes?userId=${userId}`);
  }

  // Progresso
  async createProgresso(progressoData: any) {
    return this.request('/api/progresso', {
      method: 'POST',
      body: JSON.stringify(progressoData),
    });
  }

  async getProgresso(userId: string) {
    return this.request(`/api/progresso?userId=${userId}`);
  }

  // Trial
  async checkTrial(userId: string) {
    return this.request(`/api/trial/check?userId=${userId}`);
  }

  async activateTrial(userId: string) {
    return this.request('/api/trial/activate', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    });
  }

  // Checkout
  async completeCheckout(userId: string, paymentMethod: string, amount?: number) {
    return this.request('/api/checkout/complete', {
      method: 'POST',
      body: JSON.stringify({ userId, paymentMethod, amount }),
    });
  }
}

export const apiClient = new ApiClient();
