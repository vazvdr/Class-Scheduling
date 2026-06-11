export default function AgendamentoBanner() {
  return (
    <div
      className="relative w-full h-[150px] bg-cover bg-center flex flex-col items-center justify-center text-center"
      style={{ backgroundImage: "url('/Banner.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0 rounded-md" />

      <div className="z-10">
        <h1 className="text-3xl font-extrabold text-transparent mt-[20%] bg-clip-text bg-gradient-to-r from-green-500 to-blue-400">
          Agendamento de Aulas
        </h1>

        <p className="text-gray-300 mt-1 text-sm sm:text-base">
          Fique mais perto de ser excelente
        </p>
      </div>
    </div>
  );
}