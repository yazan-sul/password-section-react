import React from 'react';
import '../App.css';
import {isValid} from '../utils/passwordUtils'
type Props = {
  password: string;
};
export function PasswordRequirements({ password }: Props){
    
    
  return (
    
    <div className='password-requirements'>
       <ul>
        {Object.values(requirements).map((req, index) => (
          <li
            key={index}
            className={`requirement-item ${isValid(req, password) ? 'valid' : 'invalid'}`}
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
  oneUpper : "one uppercase letter",
  oneLower : "one lowercase letter",
  oneNumber : "one number",
  oneSpecial : "one special character(eg. !@#$%^&*)",

}