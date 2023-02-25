const { sign, verify } = require("jsonwebtoken");

const createTokens = (user) => {
  const accessToken = sign(user, "jwtsecretplschange", {
    expiresIn: "3s",
  });
  return accessToken;
};

const validateToken = (token) => {
  const accessToken = token;
  const validToken = verify(accessToken, "jwtsecretplschange");
  if (validToken) {
    return validToken;
  }
};

module.exports = { createTokens, validateToken };
