import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  visivel: boolean;
  titulo: string;
  descricao: string;
  tipo?: string;
};

export function EditarAgendamentoAlert({
  visivel,
  titulo,
  descricao,
  tipo = "default",
}: Props) {
  if (!visivel) return null;

  const alertVariant =
    tipo === "destructive"
      ? "destructive"
      : tipo === "success"
      ? "success"
      : "default";

  return (
    <div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-[400px]">
      <Alert
        variant={alertVariant}
        className="shadow-lg bg-black text-white border border-zinc-300"
      >
        <AlertTitle>{titulo}</AlertTitle>
        <AlertDescription>{descricao}</AlertDescription>
      </Alert>
    </div>
  );
}