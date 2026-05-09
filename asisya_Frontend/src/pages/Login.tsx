import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function Login() {
  const [username, setUsername] = useState("");
  const [passwordHash, setPasswordHash] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({
        username,
        passwordHash
      });

      localStorage.setItem("token", res.token);

      navigate("/products");
    } catch (error) {
      alert("Error en login");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPasswordHash(e.target.value)} />

      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
}