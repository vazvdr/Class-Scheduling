interface RecuperarSenhaLinkProps {
  onClick: () => void;
}

export function RecuperarSenhaLink({
  onClick,
}: RecuperarSenhaLinkProps) {
  return (
    <div
      className="text-right text-sm text-white
      hover:underline cursor-pointer"
      onClick={onClick}
    >
      Esqueceu sua senha?
    </div>
  );
}