import React, { useState, useRef } from "react";
import { PasswordField } from "./components/passwordField";
import { PasswordRequirements } from "./components/passwordRequirements";
import { ConfirmPassword } from "./components/confirmPassword";
import {isPasswordValid} from './utils/passwordUtils'
import {changePasswordApi} from './api'
import "./App.css";

function App() {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [valid, setIsVaild] = useState(false);
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("is vaild ? "+valid)
    try {
      if (!valid) {
        return;
      }
      setError(null);

      if (isSubmitting) return;
      if(error !== null) return;
      setIsSubmitting(true);
      setSubmitStatus(null);

      const res = await fetch(
          changePasswordApi(),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: 1234,
            password: password,
            new_password: newPassword,
          }),
        }
      );  
      setIsSubmitting(false);
      const data = await res.json();
      if (res.ok && data.user) {
        setSubmitStatus("Password changed successfully!");
        setPassword("");
        setNewPassword("");
        setRepeatPassword("");
      } else {
        setError(data.error || "Password change failed");
      }
    } catch {
      setError("Failed to change password");
    }
  }
  const handleRepeatedPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setRepeatPassword(value);
    if (!value || !newPassword) {
      setError("Password fields can't be empty");
    } else if (!handleMatch(value, newPassword)) {
      setError("New password and repeat password do not match");
    } else {
      setError(null);
    }
  };
  const handleNewPasswrodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPassword(value);

    setIsVaild(isPasswordValid(value));
    if (!value || !repeatPassword) {
      setError("Password fields can't be empty");
    } else if (!handleMatch(value, repeatPassword)) {
      setError("New password and repeat password do not match");
    } else {
      setError(null);
    }
  };
  function handleMatch(value1: string, value2: string): boolean {
    return value1 === value2;
  }
  
  return (
    <form className="App" onSubmit={handleSubmit}>
      <header>
        <h2>Manage Security</h2>
        <p>Protect your data and ensure interactions are secure.</p>
      </header>
      <PasswordField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordField
        label="New Password"
        value={newPassword}
        onChange={handleNewPasswrodChange}
      />
      <PasswordRequirements password={newPassword} />

      <PasswordField
        label="Repeat Password"
        value={repeatPassword}
        onChange={handleRepeatedPasswordChange}
      />
      {!submitStatus && !error && (
        <>
          {repeatPassword && newPassword === repeatPassword && (
            <p className="validPass">Passwords do match</p>
          )}
          {repeatPassword && newPassword !== repeatPassword && newPassword && (
            <p className="inValidPass">Passwords do not match</p>
          )}
        </>
      )}

      {submitStatus && (
        <p className="validPass">{submitStatus}</p>
      )}

      {error && <p className="inValidPass">{error}</p>}

      <button className="button" type="submit">
        Save changes
      </button>
    </form>
  );
}

export default App;
