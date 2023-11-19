import React, { Component } from 'react';
import "./InfoSection.css"
import imageSrc from "../../images/pp1.png"
import { Avatar } from '@material-ui/core';

class InfoSection extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render () {
        return ( 
            <div className = "info__container">
                <Avatar src = {imageSrc}  className = "info__image"/>
                <div>
                    <div>TESTING USERNAME</div>
                    <div>Description</div>
                </div>
            </div>
        );
    }
 }

 export default InfoSection;