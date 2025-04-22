const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const encrypt = (payload) => {
  // Encrypt the payload and return token
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

const decrypt = (token) => {
  // Verify and decode the token
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded;
  } catch (error) {
    console.error('Invalid Token:', error.message);
    return null;
  }
};

// Test block
const testPayload = { userId: 123, role: 'admin' };

// Encrypt the payload
const testToken = encrypt(testPayload);
console.log('Generated Token:', testToken);

// Decrypt the token
const testDecodedPayload = decrypt(testToken);
console.log('Decoded Payload:', testDecodedPayload);

// Check if the decoded payload matches the original payload
if (testDecodedPayload && testDecodedPayload.userId === testPayload.userId && testDecodedPayload.role === testPayload.role) {
  console.log('Success: The encryption and decryption process works correctly!');
} else {
  console.log('Failure: The encryption and decryption process failed.');
}

module.exports = {
  encrypt,
  decrypt
};