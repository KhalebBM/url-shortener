const CHARACTERS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

/**
 * Generates a random alphanumeric short code.
 * @param {number} length - Length of the code to generate (default 6).
 * @returns {string} A random alphanumeric string.
 */
function generateCode(length = 6) {
  let code = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * CHARACTERS.length);
    code += CHARACTERS[randomIndex];
  }
  return code;
}

module.exports = generateCode;
