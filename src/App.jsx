import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Cadastro from "./pages/Cadastro";
import Habitos from "./pages/Habitos";
import Hoje from "./pages/Hoje";
import { UserProvider } from "./contexts/UserContext";
import { AuthProvider } from "./contexts/AuthContext"; 

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/hoje" element={<Hoje />} /> 
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
