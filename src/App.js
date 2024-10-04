import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Group from './components/Group';
import GroupChat from './components/GroupChat';
import Signup from './Signup';
import Login from './Login';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Profile from './components/Profile';

function App() {
  const [groups, setGroups] = useState([]);
  const [groupExpenses, setGroupExpenses] = useState({});
  const [groupMembers, setGroupMembers] = useState({}); // State to store members for each group

  const addGroup = (groupName, members) => {
    setGroups((prevGroups) => [...prevGroups, groupName]);
    setGroupExpenses((prevExpenses) => ({
      ...prevExpenses,
      [groupName]: [],
    }));
    setGroupMembers((prevMembers) => ({
      ...prevMembers,
      [groupName]: members, // Store members for the new group
    }));
  };

  const addExpenseToGroup = (groupName, expense) => {
    setGroupExpenses((prevExpenses) => ({
      ...prevExpenses,
      [groupName]: [...prevExpenses[groupName], expense],
    }));
  };

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 40px' }}>
            <div style={{ width: '100%', maxWidth: '70vw' }}>
              <Routes>
                {/* Public routes */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                
                {/* Protected routes */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard groups={groups} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

                <Route
                  path="/group"
                  element={
                    <ProtectedRoute>
                      <Group addGroup={addGroup} />
                    </ProtectedRoute>
                  }
                />
                {groups.map((group, index) => (
                  <Route
                    key={index}
                    path={`/group/${group}`}
                    element={
                      <ProtectedRoute>
                        <GroupChat
                          groupName={group}
                          expenses={groupExpenses[group]}
                          addExpense={(expense) => addExpenseToGroup(group, expense)}
                          members={groupMembers[group]} // Pass members to GroupChat
                        />
                      </ProtectedRoute>
                    }
                  />
                ))}

                {/* Redirect all other routes to login if not authenticated */}
                <Route path="*" element={<Navigate to="/login" />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
