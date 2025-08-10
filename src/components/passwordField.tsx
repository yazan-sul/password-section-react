import React from "react";
import "../App.css";

type Props = {
  label: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
export function PasswordField({ label, value, onChange }: Props) {

  return (
    <div className="password-field">
      <label>{label}</label>
      <input 
        type="password"
        placeholder={`Enter your ${label}`} 
        value={value}
        onChange={onChange}
        
      />
    </div>
  );
}
