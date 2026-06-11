interface EntrarFooterProps {
  isLogin: boolean;
  toggleForm: () => void;
}

export function EntrarFooter({
  isLogin,
  toggleForm,
}: EntrarFooterProps) {
  return (
    <div className="text-center mt-6 text-sm text-white">
      {isLogin
        ? "Não tem uma conta?"
        : "Já tem uma conta?"}{" "}
      <span
        onClick={toggleForm}
        className="font-semibold cursor-pointer hover:underline"
      >
        {isLogin ? "Cadastre-se" : "Entrar"}
      </span>
    </div>
  );
}