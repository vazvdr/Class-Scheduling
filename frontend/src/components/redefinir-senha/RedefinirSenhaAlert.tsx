import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";

interface RedefinirSenhaAlertProps {
  visivel: boolean;
  tipo: "default" | "destructive";
  titulo: string;
  descricao: string;
}

export function RedefinirSenhaAlert({
  visivel,
  tipo,
  titulo,
  descricao,
}: RedefinirSenhaAlertProps) {
  if (!visivel) {
    return null;
  }

  return (
    <div className="mb-4 bg-black text-white">
      <Alert
        variant={tipo}
        className="bg-black text-white"
      >
        <AlertTitle>{titulo}</AlertTitle>

        <AlertDescription>
          {descricao}
        </AlertDescription>
      </Alert>
    </div>
  );
}