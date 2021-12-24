import React from 'react';
import '../Styles/Header.css';
import GoogleLogin from 'react-google-login';
import Modal from 'react-modal';
import axios from 'axios';
import queryString from 'query-string';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            loggedInUser: undefined,
            Signup:[],
            UserEmail: '',
            Password : '',
            FirstName : '',
            LastName : ''
        }
        this.UserEmail = this.UserEmail.bind(this);  
        this.Password = this.Password.bind(this);  
        this.FirstName = this.FirstName.bind(this);  
        this.LastName = this.LastName.bind(this);  
        this.register = this.register.bind(this);  
    }
    UserEmail(event) {  
        this.setState({ UserEmail: event.target.value })  
      }  
      Password(event) {  
        this.setState({ Password: event.target.value })  
      }  
    
      FirstName(event) {  
        this.setState({ FirstName: event.target.value })  
      } 

      LastName(event) {  
        this.setState({ LastName: event.target.value })  
      }

    register = (event,state)=> {
        this.setState({ [state]: event.target.value });
        
        fetch('https://infinite-eyrie-27228.herokuapp.com/Users',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                FirstName: this.state.FirstName,  
                Password: this.state.Password,  
                UserEmail: this.state.UserEmail, 
            })
            }).then ((res)=>res.json())
            .then((user)=>{
                if(user.status =='success')
                    this.props.push('/Home');
                else
                    alert('No User');
            })
        }   
    



    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, loggedInUser: response.profileObj.name, loginModalIsOpen: false });
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, loggedInUser: undefined });
    }
    
    handleFormDataChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

  

    render() {
        const { loginModalIsOpen, loggedInUser, isLoggedIn,formModalIsOpen } = this.state;
        return (
            <div >
                <div class="header">
                    <div class="header-logo">
                        <b>e!</b>
                    </div>
                    {!isLoggedIn ?
                        <div class="user-group">
                            <div class="login-header" onClick={() => this.handleModal('loginModalIsOpen', true)}>LogIn</div>
                            <div class="signup-header" onClick={this.register}>Create Account</div>
                        </div>
                        : <div class="user-group">
                            <div class="login-header">{loggedInUser}</div>
                            <div class="signup-header" onClick={this.handleLogout}>LogOut</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div>
                        <div class="glyphicon glyphicon-remove" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}>close</div>
                        <GoogleLogin
                            clientId="214934564540-vi1l5qarbeve27k6pi3u6bah5efqbu55.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={this.responseGoogle}
                            onFailure={this.responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        <br />
                        <button class="btn btn-light" style={{
                                color: '#000',
                                backgroundColor: '#f8f9fa',
                                borderColor: '#f8f9fa',
                                marginTop: '10px',
                                boxShadow: '0px 2px 1px 0px',
                                color: 'grey',
                                fontSize: '15px',
                                fontFamily: 'sans-serif'
                                
                        }} onClick={() => this.handleModal('loginModalIsOpen', false)}>Continue with Credentials</button>
                    </div>
                </Modal>
                <Modal
                    isOpen={formModalIsOpen}
                    style={customStyles}
                   
                >
                    <div >
                        <div className="material-icons" style={{ float: 'right', marginBottom: '10px' }}
                            onClick={() => this.handleModal('formModalIsOpen', false)}>Close</div>
                        <h2>Signup</h2>
                        <div>
                            <label>FirstName : </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your FirstName" onChange={this.FirstName} />
                        </div>
                        <div>
                            <label>LastName : </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your LastName" onChange={this.LastName} />
                        </div>
                        <div>
                            <label>UserEmail : </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your UserEmail" onChange={this.UserEmail} />
                        </div>
                        <div>
                            <label>Password: </label>
                            <input class="form-control" style={{ width: '70%' }}
                                type="text" placeholder="Enter your Password" onChange={this.Password} />
                        </div>
                        
                        <button class="btn btn-success"
                            style={{ float: 'right', marginTop: '20px' }} onClick={this.handleModal}>Register</button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Header;
