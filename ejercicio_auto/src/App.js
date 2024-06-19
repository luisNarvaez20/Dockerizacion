//import logo from './logo.svg';
import './App.css';
import Sesion from './fragment/Sesion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Principal from './fragment/Principal';
import Inicio from './fragment/Inicio';
import RegistrarAuto from './fragment/RegistrarAuto';
import ListarAutos from './fragment/ListarAutos';
import { borrarSesion, estaSesion } from './utilidades/Sessionutil';

function App() {

  const Middeware = ({ children }) => {
    const autenticado = estaSesion();
    const location = useLocation();
    //borrarSesion();
    if (autenticado) {
      return children;
    } else {
      return <Navigate to='/sesion' state={location} />
    }
  }

  const MiddewareSession = ({ children }) => {
    const autenticado = estaSesion();
    if (autenticado) {
      return <Navigate to='/inicio' />;
    } else {
      return children;
    }
  }

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<MiddewareSession><Principal /></MiddewareSession>} />
        <Route path='/sesion' element={<MiddewareSession><Sesion /></MiddewareSession>} />
        <Route path='/inicio' element={<Middeware><Inicio /></Middeware>} />
        <Route path='/auto' element={<Middeware><ListarAutos /></Middeware>} />
        <Route path='/auto/registro' element={<Middeware><RegistrarAuto /></Middeware>} />
        
      </Routes>

    </div>
  );
}

export default App;
