import { jwtDecode } from "jwt-decode";

const checkTokenNotValid = (token) => {
  if (!token) return false;
  const jwt = token.result.jwt;
  const decodedToken = jwtDecode(jwt);
  const currentTime = new Date() / 1000;
  return decodedToken.exp < currentTime;
};

export default checkTokenNotValid;