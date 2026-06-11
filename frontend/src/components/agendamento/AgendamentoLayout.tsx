import { ReactNode } from "react";

import AgendamentoSteps from "./AgendamentoSteps";

interface Props {
  etapa: number;
  children: ReactNode;
  resumo: ReactNode;
}

export default function AgendamentoLayout({
  etapa,
  children,
  resumo,
}: Props) {
  return (
    <div className="bg-black/90 w-screen min-h-screen pt-10 px-4">
      <AgendamentoSteps etapa={etapa} />

      <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-start">
        <div className="w-full lg:w-[60%] lg:ml-[10%] flex flex-col items-center md:items-center lg:items-start">
          {children}
        </div>

        {resumo}
      </div>
    </div>
  );
}