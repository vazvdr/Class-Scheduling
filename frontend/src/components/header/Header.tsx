import { useNavigate, Link } from "react-router-dom";

import Logo from "../../assets/logo.png";
import Avatar from "../../assets/avatar.png";

import { useAuth } from "../../data/contexts/AuthContext";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

export default function Header() {
  const navigate = useNavigate();

  const { usuario, logout } = useAuth();

  const sair = (): void => {
    logout();
    navigate("/");
  };

  const alterarDados = (): void => {
    navigate("/editarUsuario");
  };

  const meusAgendamentos = (): void => {
    navigate("/agendamentos");
  };

  return (
    <header
      className="fixed top-0 left-0 w-full border-b border-purple-900 z-50
      h-[70px] backdrop-blur-xl flex justify-between items-center
      bg-transparent px-2"
    >
      <Link to="/">
        <img src={Logo} alt="Logo" className="h-36" />
      </Link>

      {usuario ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="border border-white text-white px-2 py-1 cursor-pointer
              rounded-md hover:scale-105 transition flex items-center"
            >
              <div className="flex flex-col text-right px-2">
                <span className="font-semibold">
                  {usuario.nome}
                </span>

                <span
                  className="text-xs truncate max-w-[90px] md:max-w-none"
                  title={usuario.email}
                >
                  {usuario.email}
                </span>
              </div>

              <div className="ml-0 bg-white/90 rounded-full">
                <img
                  src={Avatar}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 mr-1 bg-black text-white">
            <DropdownMenuLabel>
              Menu Usuário
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={meusAgendamentos}
              className="cursor-pointer font-semibold"
            >
              Minhas aulas
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={alterarDados}
              className="cursor-pointer font-semibold"
            >
              Editar Perfil
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={sair}
              className="cursor-pointer text-red-600 focus:bg-red-100 font-semibold"
            >
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button
          onClick={() => navigate("/entrar")}
          className="bg-black border border-white text-white px-4 py-1 mr-10 rounded-md
          hover:bg-white hover:text-black hover:scale-105 transition cursor-pointer"
        >
          Entrar
        </button>
      )}
    </header>
  );
}