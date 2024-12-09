import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../contexts/UserContext";

export default function Topo() {
  const { user } = useContext(UserContext); 

  return (
    <Header>
      <h1>TrackIt</h1>
      {user?.image ? (
        <img src={user.image} alt="User Avatar" />
      ) : (
        <Placeholder>Avatar</Placeholder>
      )}
    </Header>
  );
}

const Header = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  background-color: #126ba5;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20px;
  z-index: 2;

  h1 {
    font-size: 38px;
    font-family: "Playball", cursive;
    color: #fff;
    font-weight: 400;
  }

  img {
    height: 51px;
    width: 51px;
    border-radius: 50%;
   
  }
`;

const Placeholder = styled.div`
  height: 51px;
  width: 51px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;
