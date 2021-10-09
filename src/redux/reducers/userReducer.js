const INITIAL_STATE = {
  userID: null,
  username: "",
  login_failed: false,
  login_failed_message: "",
  successChangePass: false,
  failedChangePass: false,
  msgFailedChangePass: '',
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
    case 'SUCCESS_CHANGE_PASSWORD':
      return {
        ...state,
        successChangePass: true
      };
    case 'FAILED_CHANGE_PASSWORD':
      return {
        ...state,
        failedChangePass: true,
        msgFailedChangePass: action.payload
      };
    case 'CLOSE_MODAL_FAILED_CHANGE_PASSSWORD':
      return {
        ...state,
        failedChangePass: false,
        msgFailedChangePass: ''
      };
    default:
      return state;
  }
};

export default userReducer;
