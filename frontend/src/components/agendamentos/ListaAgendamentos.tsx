import { CalendarOff } from "lucide-react";

import { CardAgendamento } from "./CardAgendamento";

interface ListaAgendamentosProps {
  dataSelecionada: string;
  agendamentosAgrupados: Record<
    string,
    any[]
  >;
  onEditar: (
    id: number
  ) => void;
  onExcluir: (
    id: number
  ) => void;
}

export function ListaAgendamentos({
  dataSelecionada,
  agendamentosAgrupados,
  onEditar,
  onExcluir,
}: ListaAgendamentosProps) {
  const agendamentos =
    agendamentosAgrupados[
      dataSelecionada
    ] || [];

  return (
    <div className="w-[70%] sm:w-[50%] md:w-[70%] grid gap-4">
      {agendamentos.length >
      0 ? (
        agendamentos.map(
          (agendamento) => (
            <CardAgendamento
              key={
                agendamento.id
              }
              agendamento={
                agendamento
              }
              onEditar={
                onEditar
              }
              onExcluir={
                onExcluir
              }
            />
          )
        )
      ) : (
        <p className="text-white text-center text-lg flex flex-col items-center gap-2">
          <CalendarOff
            size={80}
            className="text-gray-500 mt-[8%]"
          />

          Nenhum agendamento para
          esta data.
        </p>
      )}
    </div>
  );
}