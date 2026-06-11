import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface ConfirmarExclusaoDialogProps {
  aberto: boolean;
  onClose: () => void;
  onConfirmar: () => void;
}

export function ConfirmarExclusaoDialog({
  aberto,
  onClose,
  onConfirmar,
}: ConfirmarExclusaoDialogProps) {
  return (
    <AlertDialog
      open={aberto}
      onOpenChange={(open) =>
        !open && onClose()
      }
    >
      <AlertDialogContent className="bg-black text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Deseja realmente excluir?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Essa ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel
            className="text-black cursor-pointer"
            onClick={onClose}
          >
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            className="cursor-pointer"
            onClick={onConfirmar}
          >
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}