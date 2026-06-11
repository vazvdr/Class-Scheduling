import { Alert, AlertDescription, AlertTitle } from "../../ui/alert";

import type {
  EditarUsuarioAlert as AlertType,
} from "../../../data/types/editar-usuario.types";

interface Props {
  alerta: AlertType;
}

export function EditarUsuarioAlert({
  alerta,
}: Props) {
  if (!alerta.visivel) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Alert
        className="bg-black text-white rounded-lg
        p-6 shadow-lg w-[90%] max-w-md text-center"
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