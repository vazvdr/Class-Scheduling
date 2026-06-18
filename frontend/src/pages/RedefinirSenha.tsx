import { ArrowLeft } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Logo from "../assets/logo.webp";
import CanvasLines from "../components/CanvasLines";
import { RedefinirSenhaCard } from "../components/redefinir-senha/RedefinirSenhaCard";
import { useRedefinirSenha } from "../data/hooks/useRedefinirSenha";

export default function RedefinirSenha() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const token = params.get("token");
  const {
    form,
    alerta,
    loading,
    handleRedefinirSenha,
  } = useRedefinirSenha(token);

  return (
    <div
      className="bg-black/70 relative h-screen w-screen
      flex flex-col items-center px-4 overflow-hidden"
    >
      <CanvasLines />

      <div className="mt-12 z-10">
        <img
          src={Logo}
          alt="Logo"
          className="h-32"
        />
      </div>

      <button
        onClick={() => navigate("/entrar")}
        className="absolute top-2 left-2 z-20
        flex items-center gap-1 text-black
        bg-white/70 border border-black
        rounded-md px-3 py-1 hover:bg-white
        hover:scale-105 transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">
          Voltar
        </span>
      </button>

      <RedefinirSenhaCard
        form={form}
        alerta={alerta}
        loading={loading}
        token={token}
        onSubmit={handleRedefinirSenha}
      />
    </div>
  );
}