const INITIAL_STATE = {
  adminID: null,
  adminUsername: "",
  msgFailedLogin: "",
  loginFailed: false,
  adminRole: "",
};

const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "ADMIN_LOGIN":
      return {
        ...state,
        adminID: action.payload.token,
        adminUsername: action.payload.username,
        adminRole: action.payload.role,
      };
    case "ADMIN_LOGIN_FAILED":
      return {
        ...state,
        loginFailed: true,
      };
    case "ADMIN_LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default adminReducer;
