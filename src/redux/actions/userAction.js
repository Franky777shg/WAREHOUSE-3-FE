import Axios from 'axios'

const BASE_URL = "http://localhost:2000";
const URL_API = 'http://localhost:2000/user'

export const userLogin = (email, password) => {
  return (dispatch) => {
    Axios
      .post(`${BASE_URL}/user/auth/login`, { email, password })
      .then((res) => {
        if (res.data.status == "failed") {
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

export const keepLogin = (userIDToken) => {
  return (dispatch) => {
    const token = localStorage.getItem("token");

    if (token) {
      Axios
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
        });
    } else console.log("no token");
  };
};

export const changepassword = (body)=> {
    return(dispatch) => {
        //const idpass = localStorage.getItem('idUser')
        Axios.put(`${URL_API}/change-password/1`, body)
        .then(res => {
            console.log("result",res.data)
            dispatch({
                type: 'SUCCESS_CHANGE_PASSWORD',
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: 'FAILED_CHANGE_PASSWORD',
                payload: err.response.data
            })
        })
    }
}

export const closeModalFailedChangePass = () => {
    return(dispatch) => {
        dispatch({
            type: 'CLOSE_MODAL_FAILED_CHANGE_PASSSWORD'
        })
    }
}

