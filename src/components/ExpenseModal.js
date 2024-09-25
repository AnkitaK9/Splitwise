import React, { useState } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 5px;
  width: 500px;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 8px;
  margin-left: 10px;
  margin-right: 10px;
`;

const ExpenseModal = ({ onClose, onAddExpense, members }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [payer, setPayer] = useState(members[0]); // Default to the first member
  const [splitType, setSplitType] = useState('equal');
  const [shares, setShares] = useState(Array(members.length).fill(''));

  const handleAdd = () => {
    if (description && amount) {
      const parsedAmount = parseFloat(amount);
      const parsedShares = splitType === 'equal' 
        ? Array(members.length).fill(parsedAmount / members.length) 
        : shares.map(share => parseFloat(share) || 0); // Use 0 if parsing fails

      const expense = {
        description,
        amount: parsedAmount,
        payer,
        shares: parsedShares,
      };

      // Check for valid shares before calling onAddExpense
      if (parsedShares.every(share => !isNaN(share))) {
        onAddExpense(expense);
        onClose();
      } else {
        alert("Please make sure all shares are valid numbers.");
      }
    } else {
      alert("Please enter both description and amount.");
    }
  };

  const handleShareChange = (index, value) => {
    const newShares = [...shares];
    newShares[index] = value;
    setShares(newShares);
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h3>Add Expense</h3>
        <Select value={payer} onChange={(e) => setPayer(e.target.value)}>
          {members.map((member) => (
            <option key={member} value={member}>
              {member}
            </option>
          ))}
        </Select>
        <Input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <Select value={splitType} onChange={(e) => setSplitType(e.target.value)}>
          <option value="equal">Split Equally</option>
          <option value="unequal">Split Unequally</option>
        </Select>
        {splitType === 'unequal' && (
          <>
            {members.map((member, index) => (
              <Input
                key={member}
                type="number"
                placeholder={`${member}'s share`}
                value={shares[index]}
                onChange={(e) => handleShareChange(index, e.target.value)}
              />
            ))}
          </>
        )}
        <ButtonContainer>
          <Button onClick={handleAdd}>OK</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ExpenseModal;
