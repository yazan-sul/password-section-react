import React from 'react';
import '../App.css';

type Props = {
  password: string;
};
export function PasswordRequirements({ password }: Props){
    
    function includesNumber (str: string): boolean {
        return /\d/.test(str); 
    }
    function includesUppercase (str: string): boolean {
        return /[A-Z]/.test(str);
    }
    function includesLowercase (str: string): boolean {
        return /[a-z]/.test(str);
    }
    function includesSpecialChar (str: string): boolean {
        return /[!@#$%^&*(),.?":{}|<>]/.test(str);
    }
    function isValid(requirement: string): boolean {

        switch (requirement) {
            case "At least 8 characters long":
                return password.length >= 8;
            case "one uppercase letter":
                return includesUppercase(password);
            case "one lowercase letter":
                return includesLowercase(password);
            case "one number":
                return includesNumber(password  );
            case "one special character(eg. !@#$%^&*)":
                return includesSpecialChar(password );
            default:
                return false;
        }
    }
    
  return (
    
    <div className='password-requirements'>
       <ul>
        {requirements.map((req, index) => (
          <li
            key={index}
            className={`requirement-item ${isValid(req) ? 'valid' : 'invalid'}`}
          >
            {req}
          </li>
        ))}
      </ul>
    </div>
  );
}


const requirements = [
  "At least 8 characters long",
  "one uppercase letter",
  "one lowercase letter",
  "one number",
  "one special character(eg. !@#$%^&*)",
]
