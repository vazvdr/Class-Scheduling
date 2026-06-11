import { ReactNode } from "react";

interface AgendamentosLayoutProps {
  children: ReactNode;
}

export function AgendamentosLayout({
  children,
}: AgendamentosLayoutProps) {
  return (
    <div className="min-w-screen min-h-screen bg-zinc-900 px-4 py-10 flex flex-col items-center gap-10">
      {children}
    </div>
  );
}