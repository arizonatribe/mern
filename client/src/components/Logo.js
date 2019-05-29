import React from 'react';
import logo from './logo.svg';
import styled, { keyframes } from 'styled-components';

const spinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;

const AppLogo = styled.img`
  animation: ${spinner} infinite 20s linear;
  height: 40vmin;
  pointer-events: none;
`;

function Logo() {
  return <AppLogo src={logo} alt="logo" />
}

export default Logo;
