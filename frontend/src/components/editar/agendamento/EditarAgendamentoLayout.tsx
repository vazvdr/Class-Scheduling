import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function EditarAgendamentoLayout({
  children,
}: Props) {
  return (
    <div className="bg-zinc-800 w-screen min-h-screen pt-10 px-4">
      {children}
    </div>
  );
}