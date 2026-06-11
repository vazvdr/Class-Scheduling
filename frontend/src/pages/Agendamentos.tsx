import Header from '../components/header/Header';
import { useMeusAgendamentos } from '../data/hooks/useMeusAgendamentos';
import { useNavigate } from 'react-router-dom';
import { AgendamentosBanner } from '@/components/agendamentos/AgendamentosBanner';
import { DatasAgendamento } from '@/components/agendamentos/DatasAgendamento';
import { ListaAgendamentos } from '@/components/agendamentos/ListaAgendamentos';
import { AgendamentoAlert } from '@/components/agendamentos/AgendamentoAlert';
import { ConfirmarExclusaoDialog } from '@/components/agendamentos/ConfirmarExclusaoDialog';
import { AgendamentosLayout } from '@/components/agendamentos/AgendamentosLayout';

export default function Agendamentos() {
  const {
    agendamentosAgrupados,
    datasFuturas,
    dataSelecionada,
    setDataSelecionada,
    agendamentoParaExcluir,
    setAgendamentoParaExcluir,
    alerta,
    confirmarExclusao
  } = useMeusAgendamentos();
  const navigate = useNavigate();

  const handleEditar = (
    id: number
  ) => {
    navigate(
      `/agendamento/${id}/editar`
    );
  };

  return (
    <>
      <Header />

      <AgendamentoAlert
        visivel={alerta.visivel}
        titulo={alerta.titulo}
        descricao={alerta.descricao}
      />

      <ConfirmarExclusaoDialog
        aberto={!!agendamentoParaExcluir}
        onClose={() =>
          setAgendamentoParaExcluir(null)
        }
        onConfirmar={confirmarExclusao}
      />

      <AgendamentosBanner />

      <AgendamentosLayout>
        <DatasAgendamento
          datasFuturas={datasFuturas}
          dataSelecionada={dataSelecionada}
          setDataSelecionada={setDataSelecionada}
        />

        <ListaAgendamentos
          dataSelecionada={dataSelecionada}
          agendamentosAgrupados={agendamentosAgrupados}
          onEditar={handleEditar}
          onExcluir={setAgendamentoParaExcluir}
        />
      </AgendamentosLayout>
    </>
  );
}
