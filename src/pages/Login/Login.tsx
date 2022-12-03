import { useState, FC } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import styles from "./Login.module.css";

type LoginFormPropstype = {
  handleSignupOrLogin: () => void;
};

const LoginPage: FC<LoginFormPropstype> = ({ handleSignupOrLogin }) => {
  const [message, setMessage] = useState("");

  const updateMessage = (msg: string) => setMessage(msg);

  return (
    <main className={styles.container}>
      <h1>Log In</h1>
      <p>{message}</p>
      <LoginForm
        handleSignupOrLogin={handleSignupOrLogin}
        updateMessage={updateMessage}
      />
    </main>
  );
};

export default LoginPage;
