import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";

import type { AlertaState } from "../../data/types/entrar.types";

interface EntrarAlertProps {
  alerta: AlertaState;
}

export function EntrarAlert({
  alerta,
}: EntrarAlertProps) {
  if (!alerta.visivel) {
    return null;
  }

  return (
    <div
      className="fixed top-8 left-1/2
      transform -translate-x-1/2
      z-50 w-[90%] max-w-md"
    >
      <Alert
        variant={alerta.tipo}
        className="bg-black text-white"
      >
        <AlertTitle className="text-white">
          {alerta.titulo}
        </AlertTitle>

        <AlertDescription className="text-white">
          {alerta.descricao}
        </AlertDescription>
      </Alert>
    </div>
  );
}