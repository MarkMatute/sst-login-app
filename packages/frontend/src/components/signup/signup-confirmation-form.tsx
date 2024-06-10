import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpConfirmationFormProps {
  confirmCode: (code: string) => void;
}

export function SignUpConfirmationForm({
  confirmCode,
}: SignUpConfirmationFormProps) {
  const nav = useNavigate();
  const [code, setCode] = useState("");

  async function handleSubmission(e: FormEvent) {
    e.preventDefault();
    try {
      await confirmCode(code);
      nav("/login");
    } catch (error) {
      alert("Sign up failed.");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmission}>
        <div>
          <label>Confirmation Code</label>
          <input
            type="text"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
        </div>
        <br />
        <div>
          <button type="submit">Confirm Code</button>
        </div>
      </form>
    </div>
  );
}
