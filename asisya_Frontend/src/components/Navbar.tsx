import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "15px" }}>
      <Link to="/">Inicio</Link>
      <Link to="/products">Productos</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}