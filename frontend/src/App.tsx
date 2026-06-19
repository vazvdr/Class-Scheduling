import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Agendamento from '../src/pages/Agendamento';
import Agendamentos from '../src/pages/Agendamentos';
import Entrar from './pages/Entrar';
import RecuperarSenha from '../src/pages/RecuperarSenha';
import RedefinirSenha from '../src/pages/RedefinirSenha';
import EditarUsuario from '../src/pages/EditarUsuario';
import EditarAgendamento from '../src/pages/EditarAgendamento';
import PrivateRoute from './components/PrivateRoute';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entrar" element={<Entrar />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/redefinir-senha" element={<RedefinirSenha />} />

        

        {/* Rotas protegidas */}
        <Route
          path="/agendamento"
          element={
            <PrivateRoute>
              <Agendamento />
            </PrivateRoute>
          }
        />
        <Route
          path="/agendamentos"
          element={
            <PrivateRoute>
              <Agendamentos />
            </PrivateRoute>
          }
        />
        <Route
          path="/agendamento/:id/editar"
          element={
            <PrivateRoute>
              <EditarAgendamento />
            </PrivateRoute>
          }
        />
        <Route
          path="/editarUsuario"
          element={
            <PrivateRoute>
              <EditarUsuario />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
