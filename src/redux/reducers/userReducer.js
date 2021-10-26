const INITIAL_STATE = {
  userID: null,
  username: "",
  login_failed: false,
  login_failed_message: "",
  profile_image: "",
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        userID: action.payload.token,
        username: action.payload.username,
        profile_image: action.payload.profile_picture,
      };
    case "LOGIN_FAILED":
      return {
        ...state,
        login_failed: true,
        msgFailedLogin: action.payload,
      };
    case "LOGOUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default userReducer;
