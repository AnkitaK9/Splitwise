import React, { useState } from 'react';
import styled from 'styled-components';
import ExpenseModal from './ExpenseModal';

const ChatContainer = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;
  width: 100%;
  height: 100%;
  max-width: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  max-height: 300px;
  overflow-y: auto;
`;

const MessageItem = styled.li`
  margin: 5px 0;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const ExpenseList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
`;

const ExpenseItem = styled.li`
  margin: 5px 0;
  padding: 10px;
  background-color: #e0f7fa;
  border-radius: 4px;
`;

const AddExpenseButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const GroupChat = ({ groupName, expenses, addExpense, members }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage('');
    }
  };

  const handleAddExpense = (expense) => {
    addExpense(expense);

    // Construct a message string for the chat
    const shareStrings = expense.shares.map((share, index) => {
      const member = members[index] || "Unknown";
      return `${member} owes ₹${share.toFixed(2)}`;
    }).join(", ");

    const message = `Added Expense: ${expense.description}: ₹${expense.amount} paid by ${expense.payer}, split as: ${shareStrings}`;
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  // Calculate balances for each member
  const calculateBalances = (expenses) => {
    const balances = {};

    // Initialize balances for each member
    members.forEach(member => {
      balances[member] = 0;
    });

    // Calculate total amounts for each member
    expenses.forEach(expense => {
      const { payer, shares } = expense;

      // Increase balance for payer
      balances[payer] += expense.amount;

      // Decrease balance for other members based on their shares
      shares.forEach((share, index) => {
        const member = members[index];
        balances[member] -= share;
      });
    });

    return balances;
  };

  // Calculate settlements
  const calculateSettlements = (balances) => {
    const settlements = [];
    
    const creditors = []; // Members who are owed money
    const debtors = [];   // Members who owe money

    // Separate creditors and debtors
    for (const member in balances) {
      if (balances[member] > 0) {
        creditors.push({ member, amount: balances[member] });
      } else if (balances[member] < 0) {
        debtors.push({ member, amount: -balances[member] });
      }
    }

    // Create settlements
    let i = 0, j = 0;
    while (i < creditors.length && j < debtors.length) {
      const creditor = creditors[i];
      const debtor = debtors[j];
      
      const amountToSettle = Math.min(creditor.amount, debtor.amount);
      settlements.push(`${debtor.member} pays ₹${amountToSettle.toFixed(2)} to ${creditor.member}`);

      // Update amounts
      creditor.amount -= amountToSettle;
      debtor.amount -= amountToSettle;

      // Move to next creditor or debtor if settled
      if (creditor.amount === 0) i++;
      if (debtor.amount === 0) j++;
    }

    return settlements;
  };

  const balances = calculateBalances(expenses);
  const settlements = calculateSettlements(balances);

  return (
    <ChatContainer>
      <h3>Group: {groupName}</h3>

      <h3>Settlements:</h3>
      {settlements.length > 0 ? (
        <ul>
          {settlements.map((settlement, index) => (
            <li key={index}>{settlement}</li>
          ))}
        </ul>
      ) : (
        <p>No settlements needed.</p>
      )}

      <h3>Expenses:</h3>
      <ExpenseList>
        {expenses.length > 0 ? (
          expenses.map((expense, index) => (
            <ExpenseItem key={index}>
              <strong>{expense.description}</strong>: ₹{expense.amount} <br />
              Paid by: {expense.payer} <br />
              Split: 
              <ul>
                {Array.isArray(expense.shares) && expense.shares.length > 0 ? (
                  expense.shares.map((share, i) => (
                    <li key={i}>
                      {members[i]} owes: ₹{share.toFixed(2)}
                    </li>
                  ))
                ) : (
                  <li>No splits available</li>
                )}
              </ul>
            </ExpenseItem>
          ))
        ) : (
          <p>No expenses added yet.</p>
        )}
      </ExpenseList>

      <h3>Chat:</h3>
      <MessageList>
        {messages.map((msg, index) => (
          <MessageItem key={index}>{msg}</MessageItem>
        ))}
      </MessageList>

      <form onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      <AddExpenseButton onClick={() => setShowModal(true)}>
        Add Expense
      </AddExpenseButton>

      {showModal && (
        <ExpenseModal
          onClose={() => setShowModal(false)}
          onAddExpense={handleAddExpense}
          members={members}
        />
      )}
    </ChatContainer>
  );
};

export default GroupChat;
