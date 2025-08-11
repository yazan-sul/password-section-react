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
            case requirements.eightChars:
                return password.length >= 8;
            case requirements.oneUpper:
                return includesUppercase(password);
            case requirements.oneLower:
                return includesLowercase(password);
            case requirements.oneNumber:
                return includesNumber(password  );
            case requirements.oneSpecial:
                return includesSpecialChar(password );
            default:
                return false;
        }
    }
    
  return (
    
    <div className='password-requirements'>
       <ul>
        {Object.values(requirements).map((req, index) => (
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


const requirements = {
  eightChars : "At least 8 characters long",
  oneUpper : "one lowercase letter",
  oneLower : "one uppercase letter",
  oneNumber : "one number",
  oneSpecial : "one special character(eg. !@#$%^&*)",

}