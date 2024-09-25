import React, { useState } from 'react';

const Group = ({ addGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(['']); // Allow adding multiple members

  const handleAddMember = (index) => {
    setMembers((prev) => {
      const newMembers = [...prev];
      newMembers.push(''); // Add an empty string for new member input
      return newMembers;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName && members.length > 0) {
      addGroup(groupName, members); // Pass members to addGroup function
      setGroupName('');
      setMembers(['']); // Reset members input
    }
  };

  return (
    <div>
      <h2>Create Group</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        {members.map((member, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Member Name"
              value={member}
              onChange={(e) => {
                const newMembers = [...members];
                newMembers[index] = e.target.value;
                setMembers(newMembers);
              }}
            />
          </div>
        ))}
        <button type="button" onClick={handleAddMember}>Add Member</button>
        <button type="submit">Create Group</button>
      </form>
    </div>
  );
};

export default Group;
