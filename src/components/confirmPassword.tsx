import React, { useEffect, useState, useMemo} from "react";
import "../App.css";

type Props = {
  value: string; 
  newPassword: string;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}


export function ConfirmPassword({ value, newPassword }: Props) {
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
    const debouncedCheck = debounce(handleRequest, 3000); 

  useEffect(() => {
    if (!value) {
      setIsValid(null);
      return;
    }

    setIsLoading(true);
    setError(null);


    debouncedCheck(value, newPassword);
  }, [value, newPassword]);

  if (isLoading) {
    return <div className="password-field">Checking password...</div>;
  }

  if (error) {
    return <div className="password-field error">{error}</div>;
  }

  if (isValid === null) {
    return null;
  }

  async function handleRequest(password : string, newPass : string){
    try {
        const res = await fetch(
          "https://www.greatfrontend.com/api/projects/challenges/auth/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: 1234,
              password: password.trim(),
              new_password: newPass.trim(),
            }),
          }
        );

        const data = await res.json();

        if (res.ok && data.user) {
          setIsValid(true);
        } else {
          setIsValid(false);
          setError(data.error || "Failed to validate password");
        }
      } catch {
        setIsValid(false);
        setError("Failed to validate password");
      } finally {
        setIsLoading(false);
      }

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
