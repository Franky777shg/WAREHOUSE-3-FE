import axios from "axios";
const BASE_URL = "http://localhost:2000";

export const userLogin = (email, password) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/user/auth/login`, { email, password })
      .then((res) => {
        if (res.data.status === "failed") {
          dispatch({
            type: "LOGIN_FAILED",
            payload: "Login failed, check your account",
          });
        } else {
          localStorage.setItem("token", res.data.token);
          dispatch({
            type: "LOGIN",
            payload: res.data.data,
          });
        }
      });
  };
};

export const keepLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .post(
          `${BASE_URL}/user/auth/keepLogin`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          dispatch({
            type: "LOGIN",
            payload: res.data[0],
          });
        })
        .catch((err) => {
          localStorage.removeItem("token");
          dispatch({
            type: "LOGOUT",
          });
        });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };
};
