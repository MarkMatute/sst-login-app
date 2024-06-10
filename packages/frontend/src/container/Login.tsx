import { Auth } from "aws-amplify";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/contextLib";

export default function Login() {
  const { setIsAuthenticated } = useAppContext();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      setIsAuthenticated(true);
      nav("/");
    } catch (error) {
      alert("Login failed.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label>email</label>
          <br />
          <input type="email" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <br />
        <div>
          <label>password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}
