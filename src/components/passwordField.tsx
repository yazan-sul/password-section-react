import React, { useState } from "react";
import "../App.css";

type Props = {
  label: string;
  id:string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export function PasswordField({ label, id, value, onChange }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="password-field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={showPassword ? "text" : "password"}
        placeholder={`Enter your ${label}`}
        value={value}
        onChange={onChange}
      />
      <button type="button" id="password-toggle" className={`${showPassword ? "hide" : "show"}`} onClick={togglePasswordVisibility}>
        👁️
        {/*  */}
      </button>
    </div>
  );
}
