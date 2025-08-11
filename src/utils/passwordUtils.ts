function includesNumber(str: string): boolean {
    return /\d/.test(str);
}
function includesUppercase(str: string): boolean {
    return /[A-Z]/.test(str);
}
function includesLowercase(str: string): boolean {
    return /[a-z]/.test(str);
}
function includesSpecialChar(str: string): boolean {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
}
export function isPasswordValid(password: string): boolean {
  return Object.values(requirements).every((req) => isValid(req, password));
}
export function isValid(requirement: string, password: string): boolean {

    switch (requirement) {
        case requirements.eightChars: {
            return password.length >= 8;
        }
        case requirements.oneUpper: {
            return includesUppercase(password);

        }
        case requirements.oneLower: {
            return includesLowercase(password);

        }
        case requirements.oneNumber: {
            return includesNumber(password);
        }
        case requirements.oneSpecial: {
            return includesSpecialChar(password);
        }
        default: {
            
            return false;
        }
    }
}




const requirements = {
  eightChars : "At least 8 characters long",
  oneUpper : "one uppercase letter",
  oneLower : "one lowercase letter",
  oneNumber : "one number",
  oneSpecial : "one special character(eg. !@#$%^&*)",

}