import React, { useState } from "react";
import { PasswordField } from "./components/passwordField";
import { PasswordRequirements } from "./components/passwordRequirements";
import { ConfirmPassword } from "./components/confirmPassword";

import "./App.css";

function App() {
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
   
     if (newPassword !== repeatPassword) {
      setError("New password and repeat password do not match");
      return;
    }
   
    setError(null);

    if(isSubmitting) return; 
    setIsSubmitting(true);
    setSubmitStatus(null);
 
     try {
      const res = await fetch(
        "https://www.greatfrontend.com/api/projects/challenges/auth/change-password",
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
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <PasswordRequirements password={newPassword} />

      <PasswordField
        label="Repeat Password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      {!submitStatus && !error && (
        <>
          {repeatPassword && newPassword === repeatPassword && (
            <p style={{ color: "green" }}>Passwords do match</p>
          )}
          {repeatPassword && newPassword !== repeatPassword && newPassword && (
            <p style={{ color: "red" }}>Passwords do not match</p>
          )}
        </>
      )}

      {submitStatus && (
        <p style={{ color: "green", marginTop: "1rem" }}>{submitStatus}</p>
      )}

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      <button className="button" type="submit">
        Save changes
      </button>
    </form>
  );
}

export default App;
