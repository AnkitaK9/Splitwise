import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Group from './components/Group';
import GroupChat from './components/GroupChat';

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
    <Router>
      <div className="App">
        <Header />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 40px' }}>
          <div style={{ width: '100%', maxWidth: '70vw' }}>
            <Routes>
              <Route path="/" element={<Dashboard groups={groups} />} />
              <Route path="/group" element={<Group addGroup={addGroup} />} />
              {groups.map((group, index) => (
                <Route
                  key={index}
                  path={`/group/${group}`}
                  element={
                    <GroupChat
                      groupName={group}
                      expenses={groupExpenses[group]}
                      addExpense={(expense) => addExpenseToGroup(group, expense)}
                      members={groupMembers[group]} // Pass members to GroupChat
                    />
                  }
                />
              ))}
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
