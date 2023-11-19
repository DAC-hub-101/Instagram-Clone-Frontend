import React, { Component } from 'react';
import "./Suggestions.css"
import { Avatar } from '@material-ui/core';
import imageSrc from '../../images/pp1.png';

class Suggestions extends Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render () {
        return ( 
            <div>
                <div className = "suggestions__container">
                    <div className = "suggestions__header">
                        <div>Suggestions For You</div>
                    </div>
                    <div className="suggestions__body">
                        <div className="suggestios__friends">
                            <Avatar src={imageSrc}  className="suggestions_image"/>
                            <div className="suggestions__username">Portfolio</div>
                        </div>

                        <div className="suggestios__friends">
                            <Avatar src={imageSrc}  className="suggestions_image"/>
                            <div className="suggestions__username">Soft skills interview</div>
                        </div>
                        
                        <div className="suggestios__friends">
                            <Avatar src={imageSrc}  className="suggestions_image"/>
                            <div className="suggestions__username">Technical_interview</div>
                        </div>

                        <div className="suggestios__friends">
                            <Avatar src={imageSrc}  className="suggestions_image"/>
                            <div className="suggestions__username">Recruiter</div>
                        </div>

                        <div className="suggestios__friends">
                            <Avatar src={imageSrc}  className="suggestions_image"/>
                            <div className="suggestions__username">Email me</div>
                        </div>

                        <div className="suggestios__friends">
                            <Avatar src={imageSrc}  className="suggestions_image"/>
                            <div className="suggestions__username">Call me</div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
 }

 export default Suggestions;