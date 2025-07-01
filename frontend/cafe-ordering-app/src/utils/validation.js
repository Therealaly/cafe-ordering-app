// Form validation utilities
export const validateRequired = (value, fieldName) => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

export const validatePrice = (price) => {
  const numPrice = Number(price);
  if (isNaN(numPrice) || numPrice <= 0) {
    return 'Price must be a positive number';
  }
  return null;
};

// Generic form validator
export const validateForm = (data, rules) => {
  const errors = {};
  
  Object.entries(rules).forEach(([field, validators]) => {
    const value = data[field];
    
    for (const validator of validators) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
