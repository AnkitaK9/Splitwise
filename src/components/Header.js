import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../AuthContext'; // Import the useAuth hook to get the current user
import { auth } from '../firebase'; // Import Firebase auth

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

const Button = styled.button`
  background-color: #61dafb;
  color: #282c34;
  border: none;
  padding: 10px 20px;
  margin-left: 10px;
  cursor: pointer;

  &:hover {
    background-color: #21a1f1;
  }
`;

const Header = () => {
  const { currentUser } = useAuth(); // Get the current user from the AuthContext
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate("/login"); // Redirect to login page after logout
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  return (
    <HeaderContainer>
      <h1>Splitwise</h1>
      <Nav>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledLink to="/group">Make a Group</StyledLink>

        {/* Show Signup and Login links only if no user is logged in */}
        {!currentUser ? (
          <>
            <StyledLink to="/signup">Signup</StyledLink>
            <StyledLink to="/login">Login</StyledLink>
          </>
        ) : (
          <>
            {/* Show Profile  links when logged in */}
            <StyledLink to="/profile">Profile</StyledLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
