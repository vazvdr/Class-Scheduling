export interface RedefinirSenhaFormData {
  novaSenha: string;
  confirmarSenha: string;
}

export interface RedefinirSenhaAlertData {
  visivel: boolean;
  tipo: "default" | "destructive";
  titulo: string;
  descricao: string;
}