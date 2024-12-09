import { useState, useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import styled from "styled-components";
import { ThreeDots } from "react-loader-spinner";

export default function HabitsList({ habits, setHabits }) {
  const { auth } = useContext(AuthContext);
  const token = auth?.token;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then((response) => {
        setHabits(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao carregar hábitos:", error.response || error.message);
        setLoading(false);
      });
  }, [token, setHabits]);

  return (
    <div>
      {loading ? (
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#52b6ff"
                ariaLabel="three-dots-loading"
              />
            ) : habits.length === 0 ? (
        <p>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</p>
      ) : (
        <HabitusList>
          {habits.map((habit) => (
            <HabitCard key={habit.id}>
              <h3>{habit.name}</h3>
              <Days>
                {["D", "S", "T", "Q", "Q", "S", "S"].map((day, index) => (
                  <span
                    key={index}
                    className={habit.days.includes(index) ? "selected" : ""}
                  >
                    {day}
                  </span>
                ))}
              </Days>
            </HabitCard>
          ))}
        </HabitusList>
    
      )}
    </div>
  );
}



const HabitusList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100vw;
  max-width: 340px;
  margin-top: 10px;
  font-family: "Lexend Deca", sans-serif;
`;

const HabitCard = styled.div`
  background-color: #ffffff;
  max-width: 340px;
  height: 91px;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    font-size: 20px;
    color: #666666;
    font-weight: 400;
  }
`;

const Days = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 8px;

  span {
    width: 30px;
    height: 30px;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    background-color: #ffffff;
    color: #d4d4d4;
    text-align: center;
    line-height: 30px;

    &.selected {
      background-color: #cfcfcf;
      color: #ffffff;
    }
  }
`;
