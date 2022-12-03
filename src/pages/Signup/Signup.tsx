import { useState, FC } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import styles from "./Signup.module.css";

type SignupProps = { handleSignupOrLogin: () => void };

const Signup: FC<SignupProps> = ({ handleSignupOrLogin }) => {
  const [message, setMessage] = useState<string>("");

  const updateMessage = (msg: string) => {
    setMessage(msg);
  };

  return (
    <main className={styles.container}>
      <h1>Sign Up</h1>
      <p>{message}</p>
      <SignupForm
        handleSignupOrLogin={handleSignupOrLogin}
        updateMessage={updateMessage}
      />
    </main>
  );
};

export default Signup;
