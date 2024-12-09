import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import Topo from "../components/Topo";
import Menu from "../components/Menu";
import CheckIcon from "@mui/icons-material/Check";
import { ThreeDots } from "react-loader-spinner";

export default function Hoje() {
  const { auth } = useContext(AuthContext);
  const token = auth?.token;
  const [habits, setHabits] = useState([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodayHabits();
  }, []);

  function loadTodayHabits() {
    if (!token) {
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        config
      )
      .then((response) => {
        setHabits(response.data);
        const completed = response.data.filter((habit) => habit.done).length;
        setCompletedCount(completed);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Erro detalhado:", {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers,
        });

        if (error.response?.status === 401) {
          localStorage.removeItem("token");
        }

        alert("Erro ao carregar hábitos de hoje.");
        setLoading(false); 
      });
  }

  function toggleHabitStatus(habit) {
    const config = { headers: { Authorization: `Bearer ${token}` } };

    const url = habit.done
      ? `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`
      : `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`;

    axios
      .post(url, {}, config)
      .then(() => {
        loadTodayHabits();
      })
      .catch((error) => {
        console.error("Erro ao atualizar status do hábito:", error.response || error.message);
        alert("Erro ao atualizar status do hábito.");
      });
  }

  const currentDate = dayjs().locale("pt-br").format("dddd, DD/MM");

  return (
    <div>
      {loading ? (
        <LoaderContainer>
          <ThreeDots visible={true} height="80" width="80" color="#52b6ff" />
        </LoaderContainer>
      ) : (
        <Container>
          <Topo />

          <Body>
            <Title>
              <h1>{currentDate}</h1>
              
            </Title>

            <HabitsList>
              {habits.map((habit) => (
                <HabitCard key={habit.id}>
                  <div>
                    <h3>{habit.name}</h3>
                    <p>
                      Sequência atual: <span>{habit.currentSequence} dias</span>
                    </p>
                    <p>
                      Seu recorde:{" "}
                      <span
                        className={
                          habit.currentSequence === habit.highestSequence
                            ? "highlight"
                            : ""
                        }
                      >
                        {habit.highestSequence} dias
                      </span>
                    </p>
                  </div>
                  <CheckButton
                    className={habit.done ? "checked" : ""}
                    onClick={() => toggleHabitStatus(habit)}
                  >
                    <CheckIcon sx={{ fontSize: 60 }} />
                  </CheckButton>
                </HabitCard>
              ))}
            </HabitsList>
          </Body>

          <Menu />
        </Container>
      )}
    </div>
  );
}

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
`;

const Container = styled.div`
  height: 100vh;
  max-width: 100vw;
  background-color: #f2f2f2;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  margin-top: 70px;
  padding: 0 20px;
`;

const Title = styled.div`
  margin: 20px 0;

  h1 {
    font-size: 23px;
    color: #126ba5;
    text-transform: capitalize;
    font-family: "Lexend Deca", sans-serif;
  }

  p {
    font-size: 18px;
    color: ${(props) => (props.completed ? "#BABABA" : "#BABABA")};
    font-family: "Lexend Deca", sans-serif;
    margin-top: 5px;
  }
`;

const HabitsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const HabitCard = styled.div`
  height: 82px;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 20px;
    color: #666666;
    font-weight: 600;
    font-family: "Lexend Deca", sans-serif;
  }

  p {
    font-size: 14px;
    color: #666666;
    font-family: "Lexend Deca", sans-serif;

    span {
      font-weight: bold;
    }

    .highlight {
      color: #666666;
    }
  }
`;

const CheckButton = styled.button`
  width: 70px;
  height: 70px;
  border-radius: 5px;
  border: none;
  background-color: #ebebeb;
  color: #ffffff;
  font-size: 35px;
  cursor: pointer;

  &.checked {
    background-color: #8fc549;
  }
`;
