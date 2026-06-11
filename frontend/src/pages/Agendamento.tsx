import { useState } from 'react';
import Header from '../components/header/Header';
import { useAssuntos } from "../data/hooks/useAssuntos";
import { useProfessores } from "../data/hooks/useProfessores";
import { useAgendamento } from "../data/hooks/useAgendamento";
import { useNavigate } from 'react-router-dom';
import { excedeuPeriodo } from '@/utils/agendamentoUtils';
import { AgendamentoSelecionado, AgendamentoAlert } from "../data/types/agendamento.types"
import AgendamentoBanner from '@/components/agendamento/AgendamentoBanner';
import EtapaAtualAgendamento from '@/components/agendamento/EtapaAtualAgendamento';
import ResumoAgendamento from '@/components/agendamento/ResumoAgendamento';
import AlertaAgendamento from '@/components/agendamento/AlertaAgendamento';
import AgendamentoLayout from "@/components/agendamento/AgendamentoLayout";

export default function Agendamento() {
  const navigate = useNavigate();
  const [etapa, setEtapa] = useState(1);
  const [selecionado, setSelecionado] =
    useState<AgendamentoSelecionado>({
      assunto: null,
      duracao: null,
      professor: null,
      data: "",
      horario: "",
      horariosSelecionados: [],
    });

  const { assuntos, loadingAssuntos } = useAssuntos();
  const { professores, loadingProfessores } = useProfessores(selecionado.assunto?.nome);
  const { horarios, loadingHorarios, loadingAgendamento, agendar } = useAgendamento(
    etapa, selecionado.assunto?.id, selecionado.professor?.id);

  const [alerta, setAlerta] =
    useState<AgendamentoAlert>({
      tipo: "default",
      titulo: "",
      descricao: "",
      visivel: false,
    });

  const handleAgendar = async () => {
    const resultado =
      await agendar({
        assuntoId: selecionado.assunto!.id,
        professorId: selecionado.professor!.id,
        data: selecionado.data,
        horario: selecionado.horario,
      });

    if (resultado.sucesso) {
      setAlerta({
        tipo: "success",
        titulo: "Agendamento realizado com sucesso ✅",
        descricao:
          "Verifique seus agendamentos no menu superior!",
        visivel: true,
      });

      setTimeout(() => {
        navigate("/");
      }, 4000);

      return;
    }

    setAlerta({
      tipo: "destructive",
      titulo: "Erro ao agendar",
      descricao: resultado.mensagem,
      visivel: true,
    });
  };

  return (
    <>
      <Header />
      <AlertaAgendamento alerta={alerta} />
      <AgendamentoBanner />

      <AgendamentoLayout
        etapa={etapa}
        resumo={
          <ResumoAgendamento
            selecionado={selecionado}
            etapa={etapa}
            loadingAgendamento={loadingAgendamento}
            handleAgendar={handleAgendar}
          />
        }
      >
        <EtapaAtualAgendamento
          etapa={etapa}
          assuntos={assuntos}
          loadingAssuntos={loadingAssuntos}
          professores={professores}
          loadingProfessores={loadingProfessores}
          horarios={horarios}
          loadingHorarios={loadingHorarios}
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          setEtapa={setEtapa}
          excedeuPeriodo={excedeuPeriodo}
        />
      </AgendamentoLayout>
    </>
  );
}