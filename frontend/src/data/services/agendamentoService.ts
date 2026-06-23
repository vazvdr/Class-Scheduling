import { api } from "../services/api";

import {
  Assunto,
  Professor,
} from "../types/agendamento.types";

interface AssuntoComProfessores
  extends Assunto {
  professores: Professor[];
}

export interface CriarAgendamentoPayload {
  assuntoId: number;
  professorId: number;
  data: string;
  horario: string;
}

export interface Agendamento {
  id: number;
  data: string;
  horario: string;
  nomeProfessor: string;
  nomeAssunto: string;
}

export type DisponibilidadeResponse =
  Record<
    string,
    {
      manha: string[];
      tarde: string[];
      noite: string[];
    }
  >;

const extrairIdDoToken = (
  token: string | null
): number | null => {
  if (!token) {
    return null;
  }

  try {
    const payloadBase64 =
      token.split(".")[1];

    const payload = JSON.parse(
      atob(payloadBase64)
    );

    return payload.id;
  } catch {
    return null;
  }
};

export const buscarAssuntos =
  async (): Promise<Assunto[]> => {
    const response =
      await api.get<Assunto[]>(
        "/assuntos"
      );

    return response.data;
  };

export const buscarProfessoresPorAssunto =
  async (
    nomeAssunto: string
  ): Promise<Professor[]> => {
    const assuntos =
      (await buscarAssuntos()) as AssuntoComProfessores[];

    return (
      assuntos.find(
        (a) =>
          a.nome === nomeAssunto
      )?.professores || []
    );
  };

export const buscarDisponibilidade =
  async (
    assuntoId: number,
    professorId: number
  ): Promise<DisponibilidadeResponse> => {
    const response =
      await api.get<DisponibilidadeResponse>(
        "/disponibilidade",
        {
          params: {
            assuntoId,
            professorId,
          },
        }
      );

    return response.data;
  };

export const buscarDisponibilidadeParaEdicao =
  async (
    assuntoId: number,
    professorId: number,
    agendamentoId: number
  ): Promise<DisponibilidadeResponse> => {
    const response =
      await api.get<DisponibilidadeResponse>(
        "/disponibilidade/editar",
        {
          params: {
            assuntoId,
            professorId,
            agendamentoId,
          },
        }
      );

    return response.data;
  };

export const criarAgendamento =
  async (
    payload: CriarAgendamentoPayload
  ) => {
    return api.post(
      "/agendamentos",
      payload
    );
  };
export const listarAgendamentos =
  async (
    usuarioId: number
  ): Promise<Agendamento[]> => {

    const response =
      await api.get<Agendamento[]>(
        `/agendamentos/${usuarioId}`
      );

    return response.data;
  };

export const buscarAgendamentoPorId =
  async (
    id: number
  ): Promise<Agendamento> => {
    const response =
      await api.get<Agendamento>(
        `/agendamentos/${id}`
      );

    return response.data;
  };

export const editarAgendamentoDoUsuario =
  async (
    id: number,
    payload: Partial<CriarAgendamentoPayload>
  ) => {
    const response =
      await api.put(
        `/agendamentos/${id}`,
        payload,
        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }
      );

    return response.data;
  };

export const deletarAgendamentoDoUsuario =
  async (
    id: number
  ): Promise<void> => {
    await api.delete(
      `/agendamentos/${id}`
    );
  };