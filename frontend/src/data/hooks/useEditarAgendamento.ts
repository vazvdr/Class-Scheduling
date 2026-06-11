import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  buscarAssuntos,
  buscarProfessoresPorAssunto,
  buscarDisponibilidadeParaEdicao,
  editarAgendamentoDoUsuario,
} from "../services/agendamentoService";

import {
   Assunto,
  Professor,
  AgendamentoSelecionado,
  HorariosDisponiveis,
  AgendamentoAlert,
} from "../types/agendamento.types";

export function useEditarAgendamento() {
  const { id } = useParams();

  const { id: agendamentoId } =
    useParams();

  const navigate =
    useNavigate();

  const [
    assuntos,
    setAssuntos,
  ] = useState<Assunto[]>([]);

  const [
    loadingAssuntos,
    setLoadingAssuntos,
  ] = useState(false);

  const [
    professores,
    setProfessores,
  ] = useState<Professor[]>([]);

  const [
    loadingProfessores,
    setLoadingProfessores,
  ] = useState(false);

  const [
    horarios,
    setHorarios,
  ] = useState<HorariosDisponiveis>(
    {}
  );

  const [
    loadingHorarios,
    setLoadingHorarios,
  ] = useState(false);

  const [datas, setDatas] =
    useState<string[]>([]);

  const [etapa, setEtapa] =
    useState(1);

  const [
    loadingAgendamento,
    setLoadingAgendamento,
  ] = useState(false);

  const [
    selecionado,
    setSelecionado,
  ] =
    useState<AgendamentoSelecionado>({
      assunto: null,
      duracao: null,
      professor: null,
      data: "",
      horario: "",
      horariosSelecionados:
        [],
    });

  const [alerta, setAlerta] =
    useState<AgendamentoAlert>({
      tipo: "default",
      titulo: "",
      descricao: "",
      visivel: false,
    });

  const token =
    localStorage.getItem(
      "token"
    );

  const excedeuPeriodo = (
    horario: string,
    periodo:
      | "manha"
      | "tarde"
      | "noite",
    duracao: number
  ) => {
    const [hora, minuto] =
      horario
        .split(":")
        .map(Number);

    const inicio =
      new Date();

    inicio.setHours(
      hora,
      minuto,
      0,
      0
    );

    const fim =
      new Date(
        inicio.getTime() +
          duracao * 60000
      );

    const limites = {
      manha: [8, 12],
      tarde: [14, 18],
      noite: [19, 22],
    };

    const [
      ,
      fimPeriodo,
    ] = limites[periodo];

    const dataFim =
      new Date();

    dataFim.setHours(
      fimPeriodo,
      0,
      0,
      0
    );

    return fim > dataFim;
  };

  useEffect(() => {
    const carregarAssuntos =
      async () => {
        setLoadingAssuntos(
          true
        );

        const dados =
          await buscarAssuntos();

        setAssuntos(dados);

        setLoadingAssuntos(
          false
        );
      };

    carregarAssuntos();
  }, []);

  useEffect(() => {
    const carregarProfessores =
      async () => {
        if (
          selecionado.assunto
            ?.nome
        ) {
          setLoadingProfessores(
            true
          );

          const professoresEncontrados =
            await buscarProfessoresPorAssunto(
              selecionado
                .assunto.nome
            );

          setProfessores(
            professoresEncontrados
          );

          setLoadingProfessores(
            false
          );
        }
      };

    carregarProfessores();
  }, [selecionado.assunto]);

  useEffect(() => {
    const carregarDisponibilidade =
      async () => {
        if (
          etapa === 3 &&
          selecionado
            .assunto?.id &&
          selecionado
            .professor?.id
        ) {
          setLoadingHorarios(
            true
          );

          try {
            const resposta =
              await buscarDisponibilidadeParaEdicao(
                selecionado
                  .assunto.id,
                selecionado
                  .professor.id,
                Number(
                  agendamentoId
                )
              );

            const datasDisponiveis =
              Object.keys(
                resposta
              ).sort();

            setHorarios(
              resposta
            );

            setDatas(
              datasDisponiveis
            );
          } catch (
            erro
          ) {
            console.error(
              erro
            );
          } finally {
            setLoadingHorarios(
              false
            );
          }
        }
      };

    carregarDisponibilidade();
  }, [
    etapa,
    selecionado,
    agendamentoId,
    token,
  ]);

  const handleAtualizar =
    async () => {
      setLoadingAgendamento(
        true
      );

      const payload = {
        assuntoId:
          selecionado
            .assunto?.id,
        professorId:
          selecionado
            .professor?.id,
        data:
          selecionado.data,
        horario:
          selecionado.horario,
      };

      try {
        await editarAgendamentoDoUsuario(
          Number(id),
          payload
        );

        setAlerta({
          tipo: "success",
          titulo:
            "✅ Agendamento atualizado com sucesso!",
          descricao:
            "Você será redirecionado em instantes...",
          visivel: true,
        });

        setTimeout(() => {
          setAlerta(
            (
              prev
            ) => ({
              ...prev,
              visivel:
                false,
            })
          );

          navigate("/");
        }, 4000);
      } catch (
        error: any
      ) {
        const mensagemErro =
          error.response
            ?.data
            ?.message ||
          error.response
            ?.data
            ?.error ||
          "Erro desconhecido";

        if (
          mensagemErro.includes(
            "horário já está ocupado"
          )
        ) {
          setAlerta({
            tipo:
              "destructive",
            titulo:
              "⚠️ Horário Indisponível",
            descricao:
              "Este horário já foi agendado por outro aluno. Escolha outro horário.",
            visivel: true,
          });
        } else {
          setAlerta({
            tipo:
              "destructive",
            titulo:
              "Erro ao atualizar",
            descricao:
              mensagemErro,
            visivel: true,
          });
        }

        setTimeout(() => {
          setAlerta(
            (
              prev
            ) => ({
              ...prev,
              visivel:
                false,
            })
          );
        }, 4000);
      } finally {
        setLoadingAgendamento(
          false
        );
      }
    };

  return {
    assuntos,
    professores,
    horarios,
    datas,

    etapa,
    setEtapa,

    selecionado,
    setSelecionado,

    alerta,

    loadingAssuntos,
    loadingProfessores,
    loadingHorarios,
    loadingAgendamento,

    excedeuPeriodo,
    handleAtualizar,
  };
}