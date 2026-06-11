import {
  listarAgendamentos,
  deletarAgendamentoDoUsuario,
  Agendamento,
} from "../services/agendamentoService";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { AgendamentoAlert } from "../types/agendamento.types";

export function useMeusAgendamentos() {
  const [agendamentos, setAgendamentos] =
    useState<Agendamento[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [dataSelecionada, setDataSelecionada] =
    useState("");

  const [
    agendamentoParaExcluir,
    setAgendamentoParaExcluir,
  ] = useState<number | null>(null);

  const [alerta, setAlerta] =
    useState<AgendamentoAlert>({
      tipo: "success",
      titulo: "",
      descricao: "",
      visivel: false,
    });

  const gerarProximosDiasUteis = () => {
    const diasUteis: string[] = [];

    const dataAtual = new Date();

    dataAtual.setHours(
      0,
      0,
      0,
      0
    );

    while (
      diasUteis.length < 6
    ) {
      const diaSemana =
        dataAtual.getDay();

      if (
        diaSemana !== 0 &&
        diaSemana !== 6
      ) {
        diasUteis.push(
          dataAtual
            .toISOString()
            .slice(0, 10)
        );
      }

      dataAtual.setDate(
        dataAtual.getDate() + 1
      );
    }

    return diasUteis;
  };

  const datasFuturas =
    useMemo(
      () =>
        gerarProximosDiasUteis(),
      []
    );

  const carregarAgendamentosDoUsuario =
    async () => {
      try {
        setLoading(true);

        const dados =
          await listarAgendamentos();

        setAgendamentos(dados);
      } catch (error) {
        console.error(error);

        setAgendamentos([]);
      } finally {
        setLoading(false);
      }
    };

  const deletarAgendamento =
    async (id: number) => {
      await deletarAgendamentoDoUsuario(
        id
      );

      setAgendamentos(
        (prev) =>
          prev.filter(
            (a) =>
              a.id !== id
          )
      );
    };

  const confirmarExclusao =
    async () => {
      if (
        agendamentoParaExcluir ===
        null
      ) {
        return;
      }

      await deletarAgendamento(
        agendamentoParaExcluir
      );

      setAgendamentoParaExcluir(
        null
      );

      setAlerta({
        tipo: "success",
        titulo:
          "Agendamento excluído com sucesso!",
        descricao:
          "O agendamento foi removido da sua lista.",
        visivel: true,
      });

      setTimeout(() => {
        setAlerta((prev) => ({
          ...prev,
          visivel: false,
        }));
      }, 3000);
    };

  useEffect(() => {
    if (
      datasFuturas.length > 0
    ) {
      setDataSelecionada(
        datasFuturas[0]
      );
    }
  }, [datasFuturas]);

  useEffect(() => {
    carregarAgendamentosDoUsuario();
  }, []);

  const agendamentosAgrupados =
    useMemo(() => {
      const agrupados: Record<
        string,
        Agendamento[]
      > = {};

      agendamentos.forEach(
        (agendamento) => {
          const data =
            agendamento.data;

          if (
            !agrupados[data]
          ) {
            agrupados[data] =
              [];
          }

          agrupados[data].push(
            agendamento
          );
        }
      );

      return agrupados;
    }, [agendamentos]);

  return {
    agendamentosAgrupados,

    datasFuturas,

    dataSelecionada,
    setDataSelecionada,

    loading,

    alerta,
    setAlerta,

    agendamentoParaExcluir,
    setAgendamentoParaExcluir,

    carregarAgendamentosDoUsuario,

    deletarAgendamento,
    confirmarExclusao,
  };
}