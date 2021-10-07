import Axios from 'axios'

const URL_API = 'http://localhost:2000/user'

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