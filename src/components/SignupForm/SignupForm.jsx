import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignupForm.module.css";
import * as authService from "../../services/authService";
import * as Bootstrap from "react-bootstrap";

const SignupForm = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConf: "",
  });

  const handleChange = (e) => {
    props.updateMessage("");
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.signup(formData);
      props.handleSignupOrLogin();
      navigate("/");
    } catch (err) {
      props.updateMessage(err.message);
    }
  };

  const { name, email, password, passwordConf } = formData;

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf);
  };

  return (
    <div className={styles.signupFormMainContainer}>
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={styles.container}
      >
        <title> Signup </title>
        <div className={styles.inputContainer}>
          <label htmlFor="name" className={styles.label}>
            Name
          </label>
          <Bootstrap.Form.Control
            type="text"
            autoComplete="off"
            id="name"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <Bootstrap.Form.Control
            type="text"
            autoComplete="off"
            id="email"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <Bootstrap.Form.Control
            type="password"
            autoComplete="off"
            id="password"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="confirm" className={styles.label}>
            Confirm Password
          </label>
          <Bootstrap.Form.Control
            type="password"
            autoComplete="off"
            id="confirm"
            value={passwordConf}
            name="passwordConf"
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <Bootstrap.Button
            disabled={isFormInvalid()}
            type="submit"
            className={styles.button}
          >
            Sign Up
          </Bootstrap.Button>
          <Link to="/">
            <Bootstrap.Button>Cancel</Bootstrap.Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
