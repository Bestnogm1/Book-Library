import * as tokenService from "./tokenService";
const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/auth`;

type SignupType = {
  name: string;
  email: string;
  password: string;
  passwordConf: string;
};
async function signup(user: SignupType) {
  try {
    const res = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(user),
    });
    const json = await res.json();
    if (json.token) {
      tokenService.setToken(json.token);
    }
    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err) {
    throw err;
  }
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

type LoginType = {
  email: string;
  pw: string;
};

async function login(credentials: LoginType) {
  try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify(credentials),
    });
    const json = await res.json();
    if (json.token) {
      tokenService.setToken(json.token);
    }
    if (json.err) {
      throw new Error(json.err);
    }
  } catch (err) {
    throw err;
  }
}

export { signup, getUser, logout, login };
