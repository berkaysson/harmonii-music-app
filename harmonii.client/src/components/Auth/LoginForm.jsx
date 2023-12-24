import { useState } from "react";
import { useUserContext } from "../../services/hooks/useUser";
import { displayResponse } from "../../services/displayResponse";
import { loginApi } from "../../api/loginApi";

const LoginForm = () => {
  const {login} = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const response = await loginApi(email, password);
      login(response.data.data);
      displayResponse(response);
    }
    catch(error){
      console.error(error);
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
