import AssuntoStep from "./AssuntoStep";
import ProfessorStep from "./ProfessorStep";
import HorarioStep from "./HorarioStep";
import { ExcedeuPeriodoFn } from "@/data/types/agendamento.types";

interface Props {
  etapa: number;

  assuntos: any[];
  loadingAssuntos: boolean;

  professores: any[];
  loadingProfessores: boolean;

  horarios: any;
  loadingHorarios: boolean;

  selecionado: any;
  setSelecionado: React.Dispatch<React.SetStateAction<any>>;
  setEtapa: React.Dispatch<React.SetStateAction<number>>;

  excedeuPeriodo: ExcedeuPeriodoFn
}

export default function EtapaAtualAgendamento({
  etapa,
  assuntos,
  loadingAssuntos,
  professores,
  loadingProfessores,
  horarios,
  loadingHorarios,
  selecionado,
  setSelecionado,
  setEtapa,
  excedeuPeriodo,
}: Props) {
  switch (etapa) {
    case 1:
      return (
        <AssuntoStep
          assuntos={assuntos}
          loadingAssuntos={loadingAssuntos}
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          setEtapa={setEtapa}
        />
      );

    case 2:
      return (
        <ProfessorStep
          professores={professores}
          loadingProfessores={loadingProfessores}
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          setEtapa={setEtapa}
        />
      );

    case 3:
      return (
        <HorarioStep
          horarios={horarios}
          loadingHorarios={loadingHorarios}
          selecionado={selecionado}
          setSelecionado={setSelecionado}
          setEtapa={setEtapa}
          excedeuPeriodo={excedeuPeriodo}
        />
      );

    default:
      return null;
  }
}