import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Import Link for navigation

const Container = styled.div`
  padding: 20px;
`;

const GroupList = styled.ul`
  list-style: none;
  padding: 0;
`;

const GroupItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const GroupLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #61dafb;
  }
`;

const Dashboard = ({ groups }) => {
  return (
    <Container>
      <h2>Dashboard</h2>
      {groups.length > 0 ? (
        <GroupList>
          {groups.map((group, index) => (
            <GroupItem key={index}>
              <GroupLink to={`/group/${group}`}>
                {group}
              </GroupLink>
            </GroupItem>
          ))}
        </GroupList>
      ) : (
        <p>No groups created yet.</p>
      )}
    </Container>
  );
};

export default Dashboard;
