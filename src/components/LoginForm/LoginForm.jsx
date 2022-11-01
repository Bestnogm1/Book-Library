import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./LoginForm.module.css";
import * as authService from "../../services/authService";
import * as Bootstrap from "react-bootstrap";

const LoginForm = (props) => {
  const [formData, setFormData] = useState({
    email: "",
    pw: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    props.updateMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      await authService.login(formData);
      props.handleSignupOrLogin();
      navigate("/");
    } catch (err) {
      props.updateMessage(err.message);
    }
  };

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
          <Bootstrap.Button type="submit" className={styles.button}>
            Log In
          </Bootstrap.Button>
          <Link to="/">
            <Bootstrap.Button>Cancel</Bootstrap.Button>
          </Link>
        </div>
      </Bootstrap.Form>
    </div>
  );
};

export default LoginForm;
