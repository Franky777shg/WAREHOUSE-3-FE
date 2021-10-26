import Axios from "axios";

const BASE_URL = "https://api-warehouse-3.purwadhikafs2.com";
const URL_API = "https://api-warehouse-3.purwadhikafs2.com/user";

export const adminLogin = (email, password) => {
  return (dispatch) => {
    Axios.post(`${BASE_URL}/admin/auth/login`, { email, password }).then(
      (res) => {
        if (res.data.status === "failed") {
          dispatch({
            type: "ADMIN_LOGIN_FAILED",
          });
        } else {
          localStorage.setItem("admin_token", res.data.token);
          dispatch({
            type: "ADMIN_LOGIN",
            payload: res.data.data,
          });
        }
      }
    );
  };
};

export const keepAdminLogin = () => {
  return (dispatch) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      Axios.post(
        `${BASE_URL}/admin/auth/keepLogin`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          dispatch({
            type: "ADMIN_LOGIN",
            payload: res.data.data,
          });
        })
        .catch((err) => {
          localStorage.removeItem("admin_token");
          dispatch({
            type: "ADMIN_LOGOUT",
          });
        });
    }
  };
};

export const adminLogout = () => {
  return (dispatch) => {
    localStorage.removeItem("admin_token");
    dispatch({
      type: "ADMIN_LOGOUT",
    });
  };
};
