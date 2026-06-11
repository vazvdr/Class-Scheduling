import {
  useEffect,
  useState,
} from "react";

import {
  buscarDisponibilidade,
  criarAgendamento,
} from "../services/agendamentoService";

export function useAgendamento(
  etapa: number,
  assuntoId?: number,
  professorId?: number
) {
  const [horarios,
    setHorarios] =
    useState<Record<string, any>>(
      {}
    );

  const [datas,
    setDatas] =
    useState<string[]>([]);

  const [loadingHorarios,
    setLoadingHorarios] =
    useState(false);

  const [loadingAgendamento,
    setLoadingAgendamento] =
    useState(false);

  useEffect(() => {
    const carregarDisponibilidade =
      async () => {
        if (
          etapa !== 3 ||
          !assuntoId ||
          !professorId
        ) {
          return;
        }

        try {
          setLoadingHorarios(true);

          const resposta =
            await buscarDisponibilidade(
              assuntoId,
              professorId
            );

          setHorarios(resposta);

          setDatas(
            Object.keys(
              resposta
            ).sort()
          );
        } catch (erro) {
          console.error(
            "Erro ao buscar horários:",
            erro
          );
        } finally {
          setLoadingHorarios(false);
        }
      };

    carregarDisponibilidade();
  }, [
    etapa,
    assuntoId,
    professorId,
  ]);

  const agendar =
    async (payload: {
      assuntoId: number;
      professorId: number;
      data: string;
      horario: string;
    }) => {
      try {
        setLoadingAgendamento(
          true
        );

        await criarAgendamento(
          payload
        );

        return {
          sucesso: true,
        };
      } catch (error: any) {
        return {
          sucesso: false,
          mensagem:
            error.response?.data
              ?.message ||
            error.response?.data
              ?.error ||
            "Erro desconhecido",
        };
      } finally {
        setLoadingAgendamento(
          false
        );
      }
    };

  return {
    horarios,
    datas,
    loadingHorarios,
    loadingAgendamento,
    agendar,
  };
}