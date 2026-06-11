import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.png";

export function AuthHeader() {
  const navigate = useNavigate();

  return (
    <>
      <button
        onClick={() => navigate("/")}
        className="absolute top-2 left-2 z-20 flex items-center gap-1
        text-black bg-white/70 border border-black rounded-md px-3 py-1
        hover:bg-white hover:scale-105 transition cursor-pointer"
      >
        <ArrowLeft size={18} />
        <span className="text-sm font-medium">
          Voltar
        </span>
      </button>

      <div className="flex items-center justify-start p-0 h-30 z-10">
        <Link to="/">
          <img
            src={Logo}
            alt="Logo"
            className="h-36"
          />
        </Link>
      </div>
    </>
  );
}