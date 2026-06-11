export interface EditarUsuarioFormData {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
}

export interface EditarUsuarioAlert {
  visivel: boolean;
  titulo: string;
  descricao: string;
}