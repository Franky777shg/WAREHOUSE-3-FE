import React from 'react'
// import Axios from 'axios'
import { Link, Redirect } from 'react-router-dom'
import {
    InputGroup,
    FormControl,
    Button,
    Form,
    Modal
} from 'react-bootstrap'
import { connect } from 'react-redux'
import { changepassword, closeModalFailedChangePass } from '../redux/actions'
// const URL_API = 'http://localhost:2000/user'

class ChangePassPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visibility1: false,
            visibility2: false,
            passErr: [false, ""],
            passInputErr: [false, ""]
        }
    }

    passValid = (e) => {
        let number = /[0-9]/

        if (!number.test(e.target.value) || e.target.value.length < 6) return this.setState({ passErr: [true, "Password must have 6 character and must include number !"] })

        this.setState({ passErr: [false, ""] })
    }

    onCheck = () => {
        let password = this.refs.password.value
        // let idUser = this.props.match.params.id

        // cek apakah semua input sudah terisi
        if (!password) return this.setState({ passInputErr: [true, "Please input all of data"] })

        //cek apakah ada error dalam validasi input password user 
        if (this.state.passErr[0]) return this.setState({ passInputErr: [true, "Make sure all of your input password is valid"] })

        //cek apakah confirm password sama dengan password
        if (this.refs.confpassword.value !== password) return this.setState({ passInputErr: [true, "Confirm New Password doesn't match with New Password, please input correctly !"] })

        //buat objek data user
        
        let body = {
            password
        }
        // console.log(body)
        
        //action untuk change password
        this.props.changepassword(body)   
        console.log(body)
    }

    render() {
        if (this.props.successChange) {
            return <Redirect to="/auth/login"/>
        }

        const { visibility1, visibility2 } = this.state
        return (
            <div style={styles.cont}>
                <div style={styles.contForm}>
                    <h2>Change Your Password</h2>
                    <label>New Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility1: !visibility1 })}>
                            {visibility1 ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility1 ? "text" : "password"}
                            onChange={(e) => this.passValid(e)}
                            ref="password"
                        />
                    </InputGroup>
                    <Form.Text style={styles.textErr}>
                        {this.state.passErr[0] ? this.state.passErr[1] : ""}
                    </Form.Text>
                    <br></br>
                    <label>Confirm New Password</label>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1" onClick={() => this.setState({ visibility2: !visibility2 })}>
                            {visibility2 ? <i class="fas fa-eye"></i> : <i class="fas fa-eye-slash"></i>}
                        </InputGroup.Text>
                        <FormControl
                            placeholder="Input Here"
                            type={visibility2 ? "text" : "password"}
                            onChange={(e) => this.passValid(e)}
                            ref="confpassword"
                        />
                    </InputGroup>
                    <div style={styles.contButton}>
                        <Button variant="outline-dark" style={styles.button} onClick={this.onCheck}>
                            <i className="far fa-save" style={{ marginRight: '12px' }}></i>
                            Submit
                        </Button>
                    </div>
                    <p style={styles.goToRegis}>Go to <Link style={{ color: '#B23636', fontWeight: 'bold' }} to="/">Home</Link></p>
                </div>

                <Modal show={this.state.passInputErr[0]}>
                    <Modal.Header>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.state.passInputErr[1]}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.setState({ passInputErr: [false, ""] })}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.props.failedChanged}>
                    <Modal.Header>
                        <Modal.Title>Error!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.msgFailedChanged}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.props.closeModalFailedChangePass}>
                            OK
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

const styles = {
    cont: {
        background: "url(https://images.unsplash.com/photo-1487015307662-6ce6210680f1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fGZ1cm5pdHVyZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80) no-repeat center",
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '12vh'
    },
    contForm: {
        width: '40vw',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '15px',
        backgroundColor: 'rgba(226,222,217, 0.8)',
        padding: '1% 2%'
    },
    contButton: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '10px'

    },
    button: {
        backgroundColor: '#F07167',
        border: 'none'
    },
    goToRegis: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: '0'
    },
    textErr: {
        color: 'red',
        marginBottom: '15px'
    }
}

const mapStateToProps = (state) => {
    return {
        successChange: state.userReducer.successChangePass,
        failedChange: state.userReducer.failedChangePass,
        msgFailedChanged: state.userReducer.msgFailedChangePass
    }
}
export default connect(mapStateToProps, { changepassword, closeModalFailedChangePass })(ChangePassPage)
// export default ChangePassPage