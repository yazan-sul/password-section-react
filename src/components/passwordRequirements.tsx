import React from 'react';
import '../App.css';
import {isValid} from '../utils/passwordUtils'
import {requirements} from '../data/data'
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