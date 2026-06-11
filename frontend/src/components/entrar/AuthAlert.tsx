import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../ui/alert";

import { AlertaState } from "../../data/types/auth.types";

interface Props {
  alerta: AlertaState;
}

export function AuthAlert({ alerta }: Props) {
  if (!alerta.visivel) {
    return null;
  }

  return (
    <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-md">
      <Alert
        variant={alerta.tipo}
        className="bg-black text-white"
      >
        <AlertTitle>{alerta.titulo}</AlertTitle>

        <AlertDescription>
          {alerta.descricao}
        </AlertDescription>
      </Alert>
    </div>
  );
}