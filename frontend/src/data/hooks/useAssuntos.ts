import { useEffect, useState } from "react";
import { buscarAssuntos } from "../services/agendamentoService";
import { Assunto } from "../types/agendamento.types";

export function useAssuntos() {
  const [assuntos, setAssuntos] =
    useState<Assunto[]>([]);

  const [loadingAssuntos,
    setLoadingAssuntos] =
    useState(false);

  useEffect(() => {
    const carregarAssuntos =
      async () => {
        try {
          setLoadingAssuntos(true);

          const dados =
            await buscarAssuntos();

          setAssuntos(dados);
        } catch (erro) {
          console.error(
            "Erro ao carregar assuntos:",
            erro
          );
        } finally {
          setLoadingAssuntos(false);
        }
      };

    carregarAssuntos();
  }, []);

  return {
    assuntos,
    loadingAssuntos,
  };
}