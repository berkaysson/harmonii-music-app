import { useState } from "react";
import { useUserContext } from "../../services/hooks/useUser";
import instance from '../../services/api/api';

const LoginForm = () => {
  const {login} = useUserContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const response = await instance.post("/auth/login", {
        email, password
      });
      login(response.data.data);
      console.log(response.data);
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