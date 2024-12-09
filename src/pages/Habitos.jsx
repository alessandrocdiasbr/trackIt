import { useState } from "react";
import styled from "styled-components";
import AddIcon from "@mui/icons-material/Add";
import CardHabitos from "../components/CardHabitos";
import Topo from "../components/Topo";
import Menu from "../components/Menu";
import HabitsList from "../components/HabitsList";

export default function Habitos() {
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);


  function refreshHabits() {
    setShowForm(false); 
  }

  return (
    <Container>

      <Topo />

        <Content>
          <Top>
            <h1>Meus Hábitos</h1>
            <button onClick={() => setShowForm(!showForm)}>
              <AddIcon sx={{ fontSize: 30 }} />
            </button>
          </Top>

          {showForm && (
            <CardHabitos setHabits={setHabits} habits={habits} refreshHabits={refreshHabits} />
          )}

          <HabitsList habits={habits} setHabits={setHabits} />
        </Content>

      <Menu />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; 
  padding-bottom: 90px; 
  box-sizing: border-box; 
  position: relative;
  overflow: auto;
`;


const Content = styled.div`
  width: 100%; 
  max-width: 375px; 
  margin-top: 70px; 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 18px;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; 
  width: 100%; 
  margin-top: 20px;
  margin-bottom: 20px;

  h1 {
    font-size: 23px;
    color: #126ba5;
    font-family: "Lexend Deca", sans-serif;
    font-weight: 400;
    margin: 0; 
  }

  button {
    width: 40px;
    height: 35px;
    background-color: #52b6ff;
    border: none;
    border-radius: 5px;
    font-size: 27px;
    color: #fff;
    margin: 0; 
    cursor: pointer;
  }
`;