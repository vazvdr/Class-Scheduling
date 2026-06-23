export interface Usuario {
  token?: string;
  id: number;
  nome?: string;
  email?: string;
}

export interface JwtPayload {
  id: number
  nome: string;
  sub: string;
}

export interface AuthContextData {
  usuario: Usuario | null;
  token: string | null;
  carregando: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}