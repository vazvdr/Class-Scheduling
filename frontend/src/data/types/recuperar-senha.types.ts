export interface RecuperarSenhaFormData {
  email: string;
}

export interface RecuperarSenhaAlertData {
  visivel: boolean;
  tipo: "default" | "destructive";
  titulo: string;
  descricao: string;
}