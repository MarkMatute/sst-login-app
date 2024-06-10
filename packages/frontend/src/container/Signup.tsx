import { useState } from "react";
import { SignForm } from "../components/signup/signup-form";
import { Auth } from "aws-amplify";
import { ISignUpResult } from "amazon-cognito-identity-js";
import { SignUpConfirmationForm } from "../components/signup/signup-confirmation-form";

export default function Signup() {
  const [newUser, setNewUser] = useState<ISignUpResult | null>(null);

  async function handleSignUp({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const createdUser = await Auth.signUp(email, password);
    setNewUser(createdUser);
  }

  async function handleConfirmSignUp(code: string) {
    const email = newUser?.user.getUsername();
    if (email) {
      await Auth.confirmSignUp(email, code);
    }
  }

  return (
    <>
      {!newUser ? (
        <SignForm createUser={handleSignUp} />
      ) : (
        <SignUpConfirmationForm confirmCode={handleConfirmSignUp} />
      )}
    </>
  );
}
