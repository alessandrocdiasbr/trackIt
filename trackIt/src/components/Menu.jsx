import { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Menu() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState(() => {
    if (location.pathname.includes("habitos")) return "habitos";
    if (location.pathname.includes("hoje")) return "hoje";
    return "";
  });

  function handleNavigation(button) {
    setActiveButton(button); 
    navigate(`/${button}`); 
  }

  return (
    <Footer>
      <button
        className={activeButton === "habitos" ? "active" : ""}
        onClick={() => handleNavigation("habitos")}
      >
        <CalendarMonthIcon /> Hábitos
      </button>
      <button
        className={activeButton === "hoje" ? "active" : ""}
        onClick={() => handleNavigation("hoje")}
      >
        <EventAvailableIcon /> Hoje
      </button>
    </Footer>
  );
}

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 65px;
  width: 100%;
  display: flex;
  z-index: 2;
  background-color: #fff; 
  box-shadow: 0 -2px 4px rgba(0,0,0,0.1); 

  button {
    background-color: #fff;
    width: 100%;
    color: #d4d4d4;
    border: none;
    font-size: 18px;
    font-weight: 400;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    transition: background-color 0.3s, color 0.3s;

    &.active {
      background-color: #52b6ff;
      color: #fff;
    }

    :hover {
      background-color: #e0e0e0;
    }
  }
`;
