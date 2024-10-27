const crypto = require("crypto");

const generateSecretKey = () => {
  return crypto.randomBytes(8).toString("hex");
};

const secretKey = generateSecretKey();
console.log(secretKey);
