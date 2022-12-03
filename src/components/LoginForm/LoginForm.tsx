import React, { useState, FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import * as authService from "../../services/authService";
import * as Bootstrap from "react-bootstrap";
import {
  LoginFromDataInterface,
  LoginInterface,
} from "./LoginInterface/LoginInterface";

const LoginForm: FC<LoginInterface> = ({
  handleSignupOrLogin,
  updateMessage,
}) => {
  const [formData, setFormData] = useState<LoginFromDataInterface>({
    email: "",
    pw: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await authService.login(formData);
      handleSignupOrLogin();
      navigate("/");
    } catch (error) {
      updateMessage(error as string);
    }
  };
  const guestLogin = () =>
    setFormData({ email: "guesttest@gmail.com", pw: "123123" });

  return (
    <div className={styles.loginFormMainContainer}>
      <Bootstrap.Form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.container}
      >
        <title> Login </title>
        <div className={styles.inputContainer}>
          <Bootstrap.Form.Label htmlFor="email" className={styles.label}>
            Email
          </Bootstrap.Form.Label>
          <Bootstrap.Form.Control
            type="text"
            autoComplete="off"
            id="email"
            value={formData.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Bootstrap.Form.Label htmlFor="password" className={styles.label}>
            Password
          </Bootstrap.Form.Label>
          <Bootstrap.Form.Control
            type="password"
            autoComplete="off"
            id="password"
            value={formData.pw}
            name="pw"
            onChange={handleChange}
          />
        </div>
        <div>
          <Bootstrap.Button
            type="submit"
            className={styles.button}
            onSubmit={handleSubmit}
          >
            Log In
          </Bootstrap.Button>
          <Link to="/">
            <Bootstrap.Button>Cancel</Bootstrap.Button>
          </Link>
          <div className={styles.LoginFormGuestLogin}>
            <Bootstrap.Form.Check
              aria-label="option 1"
              onClick={(e) => guestLogin()}
            />
            <h6>Login as guest </h6>
          </div>
        </div>
      </Bootstrap.Form>
    </div>
  );
};

export default LoginForm;
