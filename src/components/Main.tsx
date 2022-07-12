import React from 'react';
import styled from 'styled-components';
import { Container } from './Container';

const Wrapper = styled.main`
  padding-bottom: 4rem;
`;

type PropsType = {
  children: React.ReactNode
};

const Main: React.FC<PropsType> = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Main