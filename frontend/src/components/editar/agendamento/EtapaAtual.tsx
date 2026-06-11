import { SelecaoAssuntos } from "./SelecaoAssuntos";
import { SelecaoProfessores } from "./SelecaoProfessores";
import { SelecaoHorarios } from "./SelecaoHorarios";

type Props = {
  etapa: number;
  assuntos: any[];
  professores: any[];
  horarios: any;

  loadingAssuntos: boolean;
  loadingProfessores: boolean;
  loadingHorarios: boolean;

  selecionado: any;
  setSelecionado: React.Dispatch<React.SetStateAction<any>>;
  setEtapa: React.Dispatch<React.SetStateAction<number>>;

  excedeuPeriodo: (
    horario: string,
    periodo: string,
    duracao: number
  ) => boolean;
};

export function EtapaAtual({
  etapa,
  assuntos,
  professores,
  horarios,
  loadingAssuntos,
  loadingProfessores,
  loadingHorarios,
  selecionado,
  setSelecionado,
  setEtapa,
  excedeuPeriodo,
}: Props) {
  if (etapa === 1) {
    return (
      <SelecaoAssuntos
        assuntos={assuntos}
        loadingAssuntos={loadingAssuntos}
        selecionado={selecionado}
        setSelecionado={setSelecionado}
        onProximo={() => setEtapa(2)}
      />
    );
  }

  if (etapa === 2) {
    return (
      <SelecaoProfessores
        professores={professores}
        loadingProfessores={loadingProfessores}
        professorSelecionado={selecionado.professor}
        onSelecionarProfessor={(professor) =>
          setSelecionado({
            ...selecionado,
            professor,
            horario: "",
          })
        }
        onVoltar={() => setEtapa(1)}
        onProximo={() => setEtapa(3)}
      />
    );
  }

  if (etapa === 3) {
    return (
      <SelecaoHorarios
        horarios={horarios}
        selecionado={selecionado}
        setSelecionado={setSelecionado}
        loadingHorarios={loadingHorarios}
        setEtapa={setEtapa}
        excedeuPeriodo={excedeuPeriodo}
      />
    );
  }

  return null;
}