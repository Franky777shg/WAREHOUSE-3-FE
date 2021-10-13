const INITIAL_STATE = {
  userID: null,
};

const transactionReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default userReducer;
