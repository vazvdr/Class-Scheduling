import Header from '../components/header/Header';
import { useEditarAgendamento } from '@/data/hooks/useEditarAgendamento';
import { BannerEditarAgendamento } from '@/components/editar/agendamento/BannerEditarAgendamento';
import { EditarAgendamentoAlert } from '@/components/editar/agendamento/EditarAgendamentoAlert';
import { EtapasEditarAgendamento } from '@/components/editar/agendamento/EtapasEditarAgendamento';
import { EtapaAtual } from '@/components/editar/agendamento/EtapaAtual';
import { EditarAgendamentoLayout } from '@/components/editar/agendamento/EditarAgendamentoLayout';
import { ResumoEdicaoAgendamento } from '@/components/editar/agendamento/ResumoEdicaoAgendamento';

export default function EditarAgendamento() {
  const {
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
  } = useEditarAgendamento();

  return (
    <>
      <Header />
      <EditarAgendamentoAlert
        visivel={alerta.visivel}
        titulo={alerta.titulo}
        descricao={alerta.descricao}
        tipo={alerta.tipo} />
      <BannerEditarAgendamento />
      <EditarAgendamentoLayout>
        <EtapasEditarAgendamento etapa={etapa} />

        <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
          <div className="w-full lg:w-[60%] lg:ml-[10%] flex flex-col items-center md:items-center lg:items-start">
            <EtapaAtual
              etapa={etapa}
              assuntos={assuntos}
              professores={professores}
              horarios={horarios}
              loadingAssuntos={loadingAssuntos}
              loadingProfessores={loadingProfessores}
              loadingHorarios={loadingHorarios}
              selecionado={selecionado}
              setSelecionado={setSelecionado}
              setEtapa={setEtapa}
              excedeuPeriodo={excedeuPeriodo}
            />
          </div>

          <ResumoEdicaoAgendamento
            selecionado={selecionado}
            etapa={etapa}
            loadingAgendamento={loadingAgendamento}
            handleAtualizar={handleAtualizar}
          />
        </div>
      </EditarAgendamentoLayout>
    </>
  );
}