const INITIAL_STATE = {
  userID: null,
  username: "",
  login_failed: false,
  login_failed_message: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userID: action.payload.token,
        username: action.payload.username,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        login_failed: true,
        msgFailedLogin: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
