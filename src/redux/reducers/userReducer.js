const INITIAL_STATE = {
    successChangePass: false,
    failedChangePass: false,
    msgFailedChangePass: ''
}

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SUCCESS_CHANGE_PASSWORD':
            return {
                ...state,
                successChangePass: true
            }
        case 'FAILED_CHANGE_PASSWORD':
            return {
                ...state,
                failedChangePass: true,
                msgFailedChangePass: action.payload
            }
        case 'CLOSE_MODAL_FAILED_CHANGE_PASSSWORD':
            return {
                ...state,
                failedChangePass: false,
                msgFailedChangePass: ''
            }
        default:
            return state
    }
}

export default userReducer