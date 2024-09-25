import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #282c34;
  padding: 20px;
  color: white;
  text-align: center;
`;

const Nav = styled.nav`
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: #61dafb;
  margin: 0 10px;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => (
  <HeaderContainer>
    <h1>Splitwise</h1>
    <Nav>
      <StyledLink to="/">Dashboard</StyledLink>
      {/* <StyledLink to="/add">Add Expense</StyledLink> */}
      <StyledLink to="/group">Make a Group</StyledLink>
    </Nav>
  </HeaderContainer>
);

export default Header;
