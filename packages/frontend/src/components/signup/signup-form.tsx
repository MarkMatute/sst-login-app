import { FormEvent, useState } from "react";

interface SignFormProps {
  createUser: (params: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => void;
}

export function SignForm({ createUser }: SignFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmission(event: FormEvent) {
    event.preventDefault();
    const userData = {
      email,
      password,
      confirmPassword,
    };
    createUser(userData);
  }

  return (
    <form onSubmit={handleSubmission}>
      <div>
        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <br />

        <div>
          <label>Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <br />

        <div>
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          />
        </div>
        <br />

        <div>
          <button type="submit">Sign up</button>
        </div>
      </div>
    </form>
  );
}
