import styled from "styled-components";

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8f8f8;
`;

export const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  padding: 10px;
  margin: 10px;
  background-color: darkred;
  width: 25vh;
  height: 20vh;

  h2 {
    color: white;
  }

  p {
    color: white;
    padding: 5px;
  }
`;
export const ToDoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  justify-content: center;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  -ms-grid-row-align: right;
  align-items: right;
  flex-direction: column;
  justify-content: center;
  justify-self: right;
  background-color: #f8f8f8;
  padding: 20px;
  border: 1px solid black;
  background-color: rgb(99, 0, 0);
  width: 100%;

  h1 {
    color: white;
    margin: 20px;
    text-align: center;
  }
  p {
    color: white;
    margin: 20px;
  }

  button {
    color: white;
    border-color: white;
  }
`;

export const Welcome = styled.div`
  border: 1px solid black;
  background-color: #f8f8f8;
`;

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  background-color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border: 1px solid black;
  background-color: #f8f8f8;
`;

export const UserForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  width: 100%;

  p {
    margin-bottom: 0px;
    padding-bottom: 0px;
  }

  input {
    margin-top: 5px;
  }
`;

export const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: 20px;
  select {
    padding: 10px;
    margin: 10px;
    border-radius: 20px;
    background-color: #f8f8f8;
    width: 100%;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  background-color: white;
`;

export const EntryForm = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  background-color: #f8f8f8;
`;

export const UserArray = styled.div`
  display: grid;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const UserCardContent = styled.div`
  display: grid;
  grid-template-columns: 31% 31% 31% 7%;
  flex-direction: row;
  align-items: center;
  justify-items: left;
  justify-content: left;
  text-align: left;
  padding: 10px;
  margin: 20px;
  border-radius: 20px;
  background-color: darkred;
  width: 80vh;

  p {
    color: white;
  }

  h3 {
    color: white;
    margin: 20px;
  }
`;

export const LoggedInContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  width: 95%;
`;

export const LogInContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  background-color: white;
  height: auto;
  width: 30vh;
  position: absolute; // Position auf absolut setzen
  top: 50%; // Obere Kante auf 50% des Containers setzen
  left: 50%; // Linke Kante auf 50% des Containers setzen
  transform: translate(-50%, -50%); // Element zur Mitte verschieben

  p {
    padding-top: 10px;
  }

  input {
    margin-top: 5px;
    width: 80%;
  }
`;
