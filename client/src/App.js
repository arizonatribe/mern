import React from 'react';
import styled from 'styled-components';
import Header from './components/Header';
import StudentList from './components/StudentList';

const Main = styled.main`
  display: grid;
  text-align: center;
  justify-content: center;
  background-color: #282c34;
`;

function App() {
  return (
    <Main>
      <Header />
      <StudentList />
    </Main>
  );
}

export default App;
