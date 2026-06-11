import {
  useEffect,
  useState,
} from "react";

import {
  buscarProfessoresPorAssunto,
} from "../services/agendamentoService";

import {
  Professor,
} from "../types/agendamento.types";

export function useProfessores(
  nomeAssunto?: string
) {
  const [professores,
    setProfessores] =
    useState<Professor[]>([]);

  const [loadingProfessores,
    setLoadingProfessores] =
    useState(false);

  useEffect(() => {
    const carregarProfessores =
      async () => {
        if (!nomeAssunto) return;

        try {
          setLoadingProfessores(true);

          const dados =
            await buscarProfessoresPorAssunto(
              nomeAssunto
            );

          setProfessores(dados);
        } finally {
          setLoadingProfessores(false);
        }
      };

    carregarProfessores();
  }, [nomeAssunto]);

  return {
    professores,
    loadingProfessores,
  };
}