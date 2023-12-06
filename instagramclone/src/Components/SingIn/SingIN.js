import React, { Component } from 'react';
import "../LoginPage/LoginPage.css";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

class SignIN extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailId: '',
            password: ''
        };
    }

    login = () => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.state.emailId, this.state.password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                localStorage.setItem("users", JSON.stringify(user));
                window.location.reload(); // Consider using React Router for navigation
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorMessage); // Display or log error message
            });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    render() { 
        return ( 
            <div>
                <input 
                    className="logipage__text" 
                    name="emailId"
                    onChange={this.handleChange} 
                    type="text" 
                    placeholder="Phone number, username, or email" 
                />
                <input 
                    className="logipage__text" 
                    name="password"
                    onChange={this.handleChange}  
                    type="password" 
                    placeholder="Password" 
                />
                <button className="login__button" onClick={this.login}>Log In</button>
            </div> 
        );
    }
}
 
export default SignIN;
