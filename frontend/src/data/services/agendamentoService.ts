import axios from "axios";

import {
  Assunto,
  Professor,
} from "../types/agendamento.types";

const API = "http://localhost:8080";

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

const getAuthHeaders = () => {
  const token =
    localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

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
      await axios.get<Assunto[]>(
        `${API}/assuntos`,
        {
          headers:
            getAuthHeaders(),
        }
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
      await axios.get<DisponibilidadeResponse>(
        `${API}/disponibilidade`,
        {
          params: {
            assuntoId,
            professorId,
          },
          headers:
            getAuthHeaders(),
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
      await axios.get<DisponibilidadeResponse>(
        `${API}/disponibilidade/editar`,
        {
          params: {
            assuntoId,
            professorId,
            agendamentoId,
          },
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
  };

export const criarAgendamento =
  async (
    payload: CriarAgendamentoPayload
  ) => {
    return axios.post(
      `${API}/agendamentos`,
      payload,
      {
        headers:
          getAuthHeaders(),
      }
    );
  };

export const listarAgendamentos =
  async (): Promise<
    Agendamento[]
  > => {
    const token =
      localStorage.getItem(
        "token"
      );

    const usuarioId =
      extrairIdDoToken(token);

    if (!usuarioId) {
      throw new Error(
        "ID do usuário não encontrado no token"
      );
    }

    const response =
      await axios.get<
        Agendamento[]
      >(
        `${API}/agendamentos/${usuarioId}`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
  };

export const buscarAgendamentoPorId =
  async (
    id: number
  ): Promise<Agendamento> => {
    const response =
      await axios.get<Agendamento>(
        `${API}/agendamentos/${id}`,
        {
          headers:
            getAuthHeaders(),
        }
      );

    return response.data;
  };

export const editarAgendamentoDoUsuario =
  async (
    id: number,
    payload: Partial<CriarAgendamentoPayload>
  ) => {
    const response =
      await axios.put(
        `${API}/agendamentos/${id}`,
        payload,
        {
          headers: {
            ...getAuthHeaders(),
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
    await axios.delete(
      `${API}/agendamentos/${id}`,
      {
        headers:
          getAuthHeaders(),
      }
    );
  };