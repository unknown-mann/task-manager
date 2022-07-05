import styled from 'styled-components';
import { Container } from './Container';

const Wrapper = styled.main`
  padding-bottom: 4rem;
`;


const Main = ({ children }) => {
  return (
    <Wrapper>
      <Container>{children}</Container>
    </Wrapper>
  );
};

export default Main