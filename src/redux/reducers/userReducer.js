const INITIAL_STATE = {
  userID: null,
  username: "",
  login_failed: false,
  login_failed_message: "",
  successChangePass: false,
  failedChangePass: false,
  msgFailedChangePass: '',
  pageActive: 1,
  totalProd: '',
  prodPerPage: '',
  product: [],
  counterPage: 1,
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
    case 'PAGE_PAGINATION':
      return{
        ...state,
        product: action.payload[0],
        prodPerPage: action.payload[2].per_page,
        pageActive: action.payload[1].current_page,
        totalProd: action.payload[3].totalItems,
        counterPage: action.payload[1].current_page
      };
    default:
      return state;
  }
};

export default userReducer;
