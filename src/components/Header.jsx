import React from 'react';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./Container";
import { Button } from './Button';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`

const HeaderEl = styled.header`
  padding-top: 30px;
`;

const Title = styled.h1`
  margin: 0;
  margin-right: 100px;
  font-size: 16px;
  line-height: 23px;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
`;

const NavItem = styled(NavLink)`
  list-style-type: none;
  text-decoration: none;
  color: black;
  text-transform: uppercase;
  font-weight: 500;
  opacity: ${props => props.disabled ? '0.5' : '1'};
  :hover {
    opacity: 0.6;
  }
`;

const Header = ({ allTasksNum, favoriteTasksNum, repeatingTasksNum, archivedTasksNum, expiredTasksNum, todayTasksNum, setActive }) => {

  const isDisabledHandler = param => event => {
    !param && event.preventDefault()
  }


  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Title>TASKMANAGER</Title>
          <Button onClick={() => setActive(true)}>+ ADD NEW TASK</Button>
        </Wrapper>
        <Navbar>
          <NavItem to="/">
            ALL {allTasksNum}
          </NavItem>
          <NavItem to="/overdue" disabled={!expiredTasksNum} onClick={isDisabledHandler(expiredTasksNum)}>
            OVERDUE {expiredTasksNum}
          </NavItem>
          <NavItem to="/today" disabled={!todayTasksNum} onClick={isDisabledHandler(todayTasksNum)}>
            TODAY {todayTasksNum}
          </NavItem>
          <NavItem to="/favorites" disabled={!favoriteTasksNum} onClick={isDisabledHandler(favoriteTasksNum)}>
            FAVORITES {favoriteTasksNum}
          </NavItem>
          <NavItem to="/repeating" disabled={!repeatingTasksNum} onClick={isDisabledHandler(repeatingTasksNum)}>
            REPEATING {repeatingTasksNum}
          </NavItem>
          <NavItem to="/archive" disabled={!archivedTasksNum} onClick={isDisabledHandler(archivedTasksNum)}>
            ARCHIVE {archivedTasksNum}
          </NavItem>
        </Navbar>
      </Container>
    </HeaderEl>
  );
};

export default Header;