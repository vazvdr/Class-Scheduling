import { Calendar } from "lucide-react";
import { AgendamentoSelecionado } from "../../data/types/agendamento.types";

interface Props {
  selecionado: AgendamentoSelecionado;
  etapa: number;
  loadingAgendamento: boolean;
  handleAgendar: () => void;
}

export default function ResumoAgendamento({
  selecionado,
  etapa,
  loadingAgendamento,
  handleAgendar,
}: Props) {
  return (
    <div className="w-[80%] md:w-[60%] lg:w-[36%] lg:mr-[5%] mb-[10%] items-center self-center">
      <div className="bg-black text-white rounded-lg shadow-md p-6 lg:h-[380px] flex flex-col justify-between">
        {/* Título */}
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="text-white w-6 h-6" />

          <h3 className="text-xl font-semibold">
            Resumo do Agendamento
          </h3>

          <hr className="border-t border-zinc-600 mt-1" />
        </div>

        {/* Dados */}
        <div className="text-sm space-y-4">
          <div>
            <p className="font-bold">
              Assunto:
            </p>

            <p>
              {selecionado.assunto?.nome ||
                "Nenhum selecionado"}
            </p>

            <hr className="border-t border-zinc-600 mt-1" />
          </div>

          <div>
            <p className="font-bold">
              Duração:
            </p>

            <p>
              {selecionado.assunto?.duracao ||
                0}{" "}
              minutos
            </p>

            <hr className="border-t border-zinc-600 mt-1" />
          </div>

          <div>
            <p className="font-bold">
              Professor:
            </p>

            <p>
              {selecionado.professor?.nome ||
                "Não selecionado ainda"}
            </p>

            <hr className="border-t border-zinc-600 mt-1" />
          </div>

          <div>
            <p className="font-bold">
              Horário:
            </p>

            <p>
              {selecionado.horario ||
                "Não selecionado ainda"}
            </p>

            <hr className="border-t border-zinc-600 mt-1" />
          </div>
        </div>

        {/* Botão */}
        <div className="mt-6">
          <button
            onClick={handleAgendar}
            disabled={
              etapa !== 3 ||
              !selecionado.horario ||
              loadingAgendamento
            }
            className="
              w-full
              bg-blue-700
              border
              border-white
              text-white
              px-4
              py-2
              rounded
              disabled:opacity-50
              cursor-pointer
              hover:scale-105
              transition-all
              flex
              items-center
              justify-center
              gap-2
            "
          >
            {loadingAgendamento ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              "Finalizar Agendamento"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}