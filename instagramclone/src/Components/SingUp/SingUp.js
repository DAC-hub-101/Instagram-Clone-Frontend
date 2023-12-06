import React, { Component } from 'react';
import "./SingUp.css";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            emailId: '',
            name: '',
            userName: '',
            password: ''
        };
    }

    newSignUp = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.state.emailId, this.state.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;

                let payload = {
                    "userId": user.uid,
                    "userName": this.state.userName,
                    "name": this.state.name,
                    "profileImage": "" // Replace with actual profile image if you have
                };

                const requestOptions = {
                    method: "POST",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload),
                };

                fetch("http://localhost:8080/users", requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        localStorage.setItem("users", JSON.stringify(user));
                        // Here, you may want to redirect to another page or perform some action
                        window.location.reload();
                    })
                    .catch(error => {
                        console.error('Error:', error); // It's good practice to handle errors
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage); // Log or display error message
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
                    placeholder="Mobile number or Email"
                />
                <input
                    className="logipage__text"
                    name="name"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    className="logipage__text"
                    name="userName"
                    onChange={this.handleChange}
                    type="text"
                    placeholder="Username"
                />
                <input
                    className="logipage__text"
                    name="password"
                    onChange={this.handleChange}
                    type="password"
                    placeholder="Password"
                />
                <button className="login__button" onClick={this.newSignUp}>Sign up</button>
            </div>
        );
    }
}

export default SignUp;
