import { useContext, useState } from "react";
import styled from "styled-components";
import Logo from "../img/logo.png";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../contexts/UserContext";
import { ThreeDots } from "react-loader-spinner";

export default function Cadastro() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  function createAccount(e) {
    e.preventDefault();
    setLoading(true);
  
    const URL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up";
    const body = { email, name, image, password };
  
    axios
      .post(URL, body)
      .then((res) => {
        const userData = { name, email, image };
        setUser(userData); 
        navigate("/"); 
      })
      .catch((err) => {
        const statusCode = err.response?.status;
        if (statusCode === 409) {
          alert("O e-mail já está cadastrado. Tente usar outro e-mail.");
        } else if (statusCode === 400) {
          alert("Erro ao cadastrar. Verifique os dados e tente novamente.");
        } else {
          alert("Erro inesperado. Tente novamente mais tarde.");
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
        <form onSubmit={createAccount}>
          <Input
            type="email"
            placeholder="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading} 
          />

          <Input
            type="text" 
            placeholder="nome"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          <Input
            type="url"
            placeholder="foto"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
            disabled={loading}
          />

          <Input
            type="password"
            placeholder="senha"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <Button type="submit" disabled={loading}>
            {loading ? (
              <ThreeDots
                visible={true}
                height="45"
                width="45"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
              />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </form>
      </FormContent>
      <StyledLink to="/">Já tem uma conta? Faça login!</StyledLink>
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
`;

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

  &:disabled {
    background-color: #f2f2f2;
    color: #a8a8a8;
  }
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

  &:disabled {
    background-color: #b3d9ff;
    cursor: not-allowed;
  }
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
