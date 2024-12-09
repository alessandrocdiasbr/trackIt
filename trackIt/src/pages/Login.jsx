import { useContext, useState, useEffect } from "react";
import Logo from "../img/Logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth({ token });
      navigate("/hoje");
    }
  }, [navigate, setAuth]);

  function sendLogin(e) {
    e.preventDefault();
    setLoading(true);
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login";
    const body = { email, password };

    axios.post(URL, body)
      .then(res => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        setAuth({ token });
        navigate("/hoje");
      })
      .catch(err => {
        const statusCode = err.response?.status;
        if (statusCode === 401) {
          alert("Credenciais inválidas. Verifique seu e-mail e senha.");
        } else {
          alert("Erro ao realizar login. Tente novamente mais tarde.");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Container>
      <LogoImg>
        <img src={Logo} alt="Logo" />
      </LogoImg>

      <FormContent>
        <form onSubmit={sendLogin}>

          <Input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="senha"
            required
            value={password}
            onChange={e => setPassword(e.target.value)}
            disabled={loading}
          />

          <Button type="submit" disabled={loading}>{loading ? "Carregando.." : "Entrar"}</Button>

        </form>
      </FormContent>

      <StyledLink to="/cadastro">Não tem conta? Cadastre-se</StyledLink>
    </Container>
  );
}

const Container = styled.div`
background-color: #ffffff;
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`

const LogoImg = styled.div`
    margin-bottom: 32px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
        width: 180px;
        height: 178.38px;
    }
`;

const FormContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%; 
    }
`;

const Input = styled.input` 
height: 45px; 
max-width: 303px; 
width: 100%; 
border-radius: 5px; 
border: 1px solid #d4d4d4; 
margin-bottom: 12px; 
font-size: 20px; 
padding: 5px; 
font-family: "Lexend Deca", sans-serif; 

::placeholder { 
    color: #d4d4d4; 
    } 
color: #000; 
`;

const Button = styled.button`
   height: 45px;
    max-width: 303px;
    width: 100%;
    border-radius: 5px;
    border: none;
    background-color: #52b6ff;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    font-weight: 400;
    padding: 5px;
    font-family: "Lexend Deca", sans-serif;
    cursor: pointer;
`;

const StyledLink = styled(Link)` 
    color: #52b6ff;
    font-size: 14px;
    text-align: center;
    text-decoration: underline;
    margin-top: 20px;
    font-family: "Lexend Deca", sans-serif;
    cursor: pointer;
`;

