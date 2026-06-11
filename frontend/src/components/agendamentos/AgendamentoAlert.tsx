import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";

interface AgendamentoAlertProps {
  visivel: boolean;
  titulo: string;
  descricao: string;
}

export function AgendamentoAlert({
  visivel,
  titulo,
  descricao,
}: AgendamentoAlertProps) {
  if (!visivel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="rounded-lg p-4 shadow-lg w-[80%] max-w-md text-center">
        <Alert className="bg-black text-white">
          <AlertTitle className="text-lg font-bold">
            {titulo}
          </AlertTitle>

          <AlertDescription className="text-sm justify-center">
            {descricao}
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}