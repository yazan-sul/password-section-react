import React, { useEffect, useState } from "react";
import "../App.css";

type Props = {
  value: string; 
  newPassword: string;
};

export function ConfirmPassword({ value, newPassword }: Props) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!value) {
      setIsValid(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    fetch("https://www.greatfrontend.com/api/projects/challenges/auth/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1234, 
        password: value.trim(),
        new_password: newPassword.trim(), 
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (res.ok && data.user) {
          setIsValid(true);
        } else {
          setIsValid(false);
          setError(data.error || "Failed to validate password");
        }
      })
      .catch(() => {
        setIsValid(false);
        setError("Failed to validate password");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [value, newPassword]);

  if (isLoading) {
    return <div className="password-field">Checking password...</div>;
  }

  if (error) {
    return <div className="password-field error">{error}</div>;
  }
if (!newPassword.trim()) {
  setError("New password is required.");
  return null;
}
  if (isValid === null) {
    return null;
  }

  return (
    <div className="password-field">
      {isValid ? (
        <h3 className="validPass">Correct password</h3>
      ) : (
        <h3 className="inValidPass">Password not found on system</h3>
      )}
    </div>
  );
}
