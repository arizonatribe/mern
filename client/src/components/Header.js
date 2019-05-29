import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';

const AppHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  background-color: #282c34;
`;

function Header(props) {
  return (
    <AppHeader {...props}>
      <Logo />
    </AppHeader>
  );
}

export default Header;
