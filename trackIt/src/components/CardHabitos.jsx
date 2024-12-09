import { useState, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { ThreeDots } from "react-loader-spinner";

export default function CardHabitos({ setHabits, habits, refreshHabits }) {
  const { auth } = useContext(AuthContext);
  const token = auth?.token;
  const [habitName, setHabitName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  function toggleDay(dayIndex) {
    if (selectedDays.includes(dayIndex)) {
      setSelectedDays(selectedDays.filter((day) => day !== dayIndex));
    } else {
      setSelectedDays([...selectedDays, dayIndex]);
    }
  }

  function saveHabit(event) {
    event.preventDefault();
    if (!habitName || selectedDays.length === 0) {
      alert("Por favor, insira um nome para o hábito e selecione ao menos um dia.");
      return;
    }
    if (!token) {
      alert("Token de autenticação não encontrado");
      setLoading(false);
      return;
    }
  
    const body = { name: habitName, days: selectedDays };
    const config = { headers: { Authorization: `Bearer ${token}` } };
  
    setLoading(true);
  
    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
      .then((response) => {
        setHabits([...habits, response.data]);
  
        setHabitName("");
        setSelectedDays([]);
      })
      .catch((error) => {
        console.error("Erro ao salvar o hábito:", error.response || error.message);
        alert("Erro ao salvar o hábito. Tente novamente.");
      })
      .finally(() => setLoading(false));
  }
  

  return (
    <CardContainer>
      <form onSubmit={saveHabit}>
        <InputContainer>
          <input
            type="text"
            placeholder="Nome do hábito"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            disabled={loading}
          />
        </InputContainer>

        <ButtonDay>
          {daysOfWeek.map((day, index) => (
            <button
              key={index}
              type="button"
              className={selectedDays.includes(index) ? "selected" : ""}
              onClick={() => toggleDay(index)}
              disabled={loading}
            >
              {day}
            </button>
          ))}
        </ButtonDay>

        <ButtonOptions>
          <CancelButton type="button" onClick={() => refreshHabits()}>
            Cancelar
          </CancelButton>
          <SaveButton type="submit" disabled={loading}>
            {loading ? (
              <ThreeDots
                visible={true}
                height="20"
                width="50"
                color="#ffffff"
                ariaLabel="three-dots-loading"
              />
            ) : "Salvar"}
          </SaveButton>
        </ButtonOptions>
      </form>
    </CardContainer>
  );
}

const CardContainer = styled.div`
  background-color: #ffffff;
  width: 100%; 
  max-width: 340px; 
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
  padding: 18px;
  box-sizing: border-box;
`;

const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 10px;

  input {
    width: 100%;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    color: #666666;
    padding: 10px;
    font-size: 20px;
    font-weight: 400;
    box-sizing: border-box;
  }
`;

const ButtonDay = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  margin-bottom: 10px;
  width: 100%;

  button {
    width: 30px;
    height: 30px;
    border-radius: 5px;
    border: 1px solid #d4d4d4;
    background-color: #ffffff;
    font-size: 14px;
    color: #d4d4d4;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &.selected {
      background-color: #cfcfcf;
      color: #ffffff;
    }
  }
`;

const ButtonOptions = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 10px;
`;

const CancelButton = styled.button`
  background-color: #ffffff;
  color: #52b6ff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #52b6ff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 16px;
  font-weight: 400;
  cursor: pointer;
  width: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

