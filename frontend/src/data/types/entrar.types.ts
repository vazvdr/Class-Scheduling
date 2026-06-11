export interface EntrarFormData {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

export interface AlertaState {
  visivel: boolean;
  tipo: "default" | "destructive";
  titulo: string;
  descricao: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface CadastroPayload extends EntrarFormData {
  onSuccess?: () => void;
}