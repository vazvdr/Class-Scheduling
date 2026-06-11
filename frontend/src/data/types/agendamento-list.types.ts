export interface AgendamentoUsuario {
  id: number;
  data: string;
  horario: string;
  nomeProfessor: string;
  nomeAssunto: string;
}

export interface AgendamentosAgrupados {
  [data: string]: AgendamentoUsuario[];
}