class ValidationService {
  email(value) {
    const result = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    return result ? { valid: true } : { valid: false, msg: 'Invalid email.' };
  }

  password(value) {
    const result = value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/);
    return result ?
      { valid: true } :
      { valid: false,
        msg: 'Password must be at least 8 characters long, contain a number and a special character.'
      };
  }

  blank(value) {
    return value.length ? { valid: true } : { valid: false, msg: 'Cannnot be blank.' };
  }
}

export default new ValidationService();
