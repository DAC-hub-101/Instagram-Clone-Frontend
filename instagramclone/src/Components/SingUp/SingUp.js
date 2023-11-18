import React, { Component } from 'react';
import "./SingUp.css";

class SingUp extends Component {
    constructor(props) {
        super(props);
        this.state = { };
    }
    render() {
        return (
            <div>
                <input className="loginpage__text" type="text" placeholder="Mobile number or Email" />
                <input className="loginpage__text" type="text" placeholder="Full Name" />
                <input className="loginpage__text" type="text" placeholder="Username" />
                <input className="loginpage__text" type="password" placeholder="Password" />
                <button className="loginpage__button" >Sing up</button>
            </div>
         );
    }
}

export default SingUp;