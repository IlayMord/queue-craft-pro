/**
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * @param {string} phone
 * @returns {boolean}
 */
export function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10;
}
