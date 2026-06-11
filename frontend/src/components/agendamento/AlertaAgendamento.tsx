import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { AgendamentoAlert } from "@/data/types/agendamento.types";

interface Props { alerta: AgendamentoAlert; }

export default function AlertaAgendamento({
  alerta,
}: Props) {
  if (!alerta.visivel) {
    return null;
  }

  return (
    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px]">
      <Alert
        variant={alerta.tipo}
        className="shadow-lg bg-black text-white border border-zinc-300"
      >
        <AlertTitle>
          {alerta.titulo}
        </AlertTitle>

        <AlertDescription>
          {alerta.descricao}
        </AlertDescription>
      </Alert>
    </div>
  );
}