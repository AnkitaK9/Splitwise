import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import styled from 'styled-components';

const UpdateProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
  text-align: center;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px;
  width: 100%;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: #007BFF;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
`;

const UpdateProfile = () => {
  const { currentUser } = useAuth();
  const [name, setName] = useState(currentUser?.displayName || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [password, setPassword] = useState(""); // To re-authenticate, we need the user's password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [requiresReauth, setRequiresReauth] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (requiresReauth) {
      // Re-authenticate the user if required
      try {
        const credential = EmailAuthProvider.credential(currentUser.email, password);
        await reauthenticateWithCredential(currentUser, credential);
        setRequiresReauth(false);
        setPassword(""); // Clear password after successful re-authentication
      } catch (err) {
        setError("Re-authentication failed. " + err.message);
        return;
      }
    }

    try {
      // Update the display name
      if (name !== currentUser.displayName) {
        await updateProfile(currentUser, { displayName: name });
      }

      // Update the email
      if (email !== currentUser.email) {
        await updateEmail(currentUser, email);
      }

      setSuccess("Profile updated successfully!");
    } catch (err) {
      if (err.code === "auth/requires-recent-login") {
        setRequiresReauth(true);
        setError("Please re-authenticate to update sensitive information.");
      } else {
        setError("Failed to update profile. " + err.message);
      }
    }
  };

  return (
    <UpdateProfileContainer>
      <Form onSubmit={handleUpdateProfile}>
        <h2>Update Profile</h2>

        <Input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* Only show password field when re-authentication is required */}
        {requiresReauth && (
          <Input
            type="password"
            placeholder="Enter your password to re-authenticate"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        )}

        <Button type="submit">Update Profile</Button>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <p>{success}</p>}
      </Form>
    </UpdateProfileContainer>
  );
};

export default UpdateProfile;
