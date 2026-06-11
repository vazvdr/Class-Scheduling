export interface Professor {
  id: number;
  nome: string;
}

export interface Assunto {
  id: number;
  nome: string;
  duracao: number;
  professores?: Professor[];
}

export interface AgendamentoSelecionado {
  assunto: Assunto | null;
  duracao: number | null;
  professor: Professor | null;
  data: string;
  horario: string;
  horariosSelecionados: string[];
}

export type Periodo =
  | "manha"
  | "tarde"
  | "noite";

export type ExcedeuPeriodoFn = (
  horario: string,
  periodo: Periodo,
  duracao: number
) => boolean;

export interface HorariosPorPeriodo {
  manha: string[];
  tarde: string[];
  noite: string[];
}

export interface HorariosDisponiveis {
  [data: string]: HorariosPorPeriodo;
}

export type TipoAlerta =
  | "default"
  | "success"
  | "warning"
  | "destructive";

export interface AgendamentoAlert {
  tipo: TipoAlerta;
  titulo: string;
  descricao: string;
  visivel: boolean;
}

export interface PayloadAgendamento {
  assuntoId: number;
  professorId: number;
  data: string;
  horario: string;
}