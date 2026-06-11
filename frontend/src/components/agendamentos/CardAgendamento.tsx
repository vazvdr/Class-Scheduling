import {
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";

interface CardAgendamentoProps {
  agendamento: any;
  onEditar: (
    id: number
  ) => void;
  onExcluir: (
    id: number
  ) => void;
}

export function CardAgendamento({
  agendamento,
  onEditar,
  onExcluir,
}: CardAgendamentoProps) {
  return (
    <div
      className="
        bg-zinc-800
        border border-white
        p-4
        rounded-lg
        shadow-md
        text-white
        flex flex-col
        md:flex-row
        justify-between
        items-center
      "
    >
      <div className="flex flex-col items-center justify-center w-full md:w-1/4 text-center mb-4 md:mb-0">
        <Calendar
          size={32}
          className="text-blue-400 mb-2"
        />

        <p className="text-lg font-semibold">
          {agendamento.nomeProfessor ||
            "Professor não informado"}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/4 text-center mb-4 md:mb-0">
        <p className="text-xl font-bold text-gray-300">
          Assunto:
        </p>

        <p className="text-md font-semibold">
          {agendamento.nomeAssunto ||
            "Assunto não informado"}
        </p>
      </div>

      <div className="flex flex-col items-center justify-center w-full md:w-1/4 text-center mb-4 md:mb-0">
        <p className="text-xl font-bold text-gray-300">
          Horário:
        </p>

        <p className="text-md font-semibold">
          {agendamento.horario ||
            "Horário não informado"}
        </p>
      </div>

      <div className="flex gap-2 justify-center w-full md:w-1/4">
        <button
          onClick={() =>
            onEditar(
              agendamento.id
            )
          }
          className="
            bg-yellow-400
            text-white
            hover:text-black
            transition
            p-2
            rounded-md
            cursor-pointer
          "
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={() =>
            onExcluir(
              agendamento.id
            )
          }
          className="
            bg-red-600
            text-white
            hover:text-black
            transition
            p-2
            rounded-md
            cursor-pointer
          "
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}