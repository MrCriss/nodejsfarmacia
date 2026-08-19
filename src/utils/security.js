/**
 * Utilidades para validación y seguridad
 * @module security
 */

/**
 * Sanitiza texto para prevenir XSS
 * @param {string} text - Texto a sanitizar
 * @returns {string} Texto sanitizado
 */
export const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  
  const element = document.createElement('div');
  element.textContent = text;
  return element.innerHTML;
};

/**
 * Valida un email
 * @param {string} email - Email a validar
 * @returns {boolean} True si es válido
 */
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Valida contraseña
 * Requisitos:
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 * @param {string} password - Contraseña a validar
 * @returns {object} Objeto con validación y mensajes de error
 */
export const validatePassword = (password) => {
  const validations = {
    minLength: password.length >= 8,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const isValid = Object.values(validations).every(v => v === true);
  
  const errors = [];
  if (!validations.minLength) errors.push('Mínimo 8 caracteres');
  if (!validations.hasUpperCase) errors.push('Al menos una mayúscula');
  if (!validations.hasLowerCase) errors.push('Al menos una minúscula');
  if (!validations.hasNumber) errors.push('Al menos un número');
  if (!validations.hasSpecialChar) errors.push('Al menos un carácter especial');

  return { isValid, errors, validations };
};

/**
 * Valida URL
 * @param {string} url - URL a validar
 * @returns {boolean} True si es válida
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Escapa caracteres especiales en strings para usar en regexp
 * @param {string} string - String a escapar
 * @returns {string} String escapado
 */
export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Valida que un objeto contenga solo propiedades permitidas
 * @param {object} obj - Objeto a validar
 * @param {array} allowedKeys - Array de claves permitidas
 * @returns {boolean} True si es válido
 */
export const validateObjectKeys = (obj, allowedKeys) => {
  const objKeys = Object.keys(obj);
  return objKeys.every(key => allowedKeys.includes(key));
};

/**
 * Limpia un objeto removiendo propiedades no permitidas
 * @param {object} obj - Objeto a limpiar
 * @param {array} allowedKeys - Array de claves permitidas
 * @returns {object} Objeto limpio
 */
export const cleanObject = (obj, allowedKeys) => {
  const cleaned = {};
  allowedKeys.forEach(key => {
    if (key in obj) {
      cleaned[key] = obj[key];
    }
  });
  return cleaned;
};

/**
 * Valida permisos de CORS
 * @param {string} origin - Origen a validar
 * @param {array} allowedOrigins - Array de orígenes permitidos
 * @returns {boolean} True si el origen está permitido
 */
export const validateCORSOrigin = (origin, allowedOrigins) => {
  return allowedOrigins.includes(origin);
};

/**
 * Obtiene las origenes permitidas desde env
 * @returns {array} Array de orígenes permitidos
 */
export const getAllowedOrigins = () => {
  const originsStr = import.meta.env.VITE_ALLOWED_ORIGINS || '';
  return originsStr.split(',').map(o => o.trim()).filter(Boolean);
};

export default {
  sanitizeText,
  validateEmail,
  validatePassword,
  validateURL,
  escapeRegExp,
  validateObjectKeys,
  cleanObject,
  validateCORSOrigin,
  getAllowedOrigins,
};
