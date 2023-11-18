import React, { Component } from 'react';
import "./Post.css";
import { Avatar } from '@material-ui/core';
import postimage from  "../../images/post.jpg";
import love from "../../images/love.svg";
import comment from "../../images/comment.svg";
import share from "../../images/share.svg";



class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            commentList:[]
        }
    }

    componentDidMount(){
        this.getcomments();
    }
    getcomments = () => {
        let data = [
            {
                "username": "ASD",
                "commentId":"1234",
                "timeStamp":"123456",
                "description":"Comment 1"
            }

        ];

        this.setState({commentList: data});
    }

    render() {
        return ( 
            <div className="post__container">
                {/* Header */}
                <div className="post__header">
                    <Avatar className = "post__image" src={this.state.profileImage} />
                    <div className="post__username">{this.state.username}</div>
                </div>

                {/* Image */}
                <div>
                    <img src={this.state.postimage} width="615px"></img>
                </div>

                {/* Analytics */}
                <div>
                    <div style={{"marginLeft":"10px"}}>
                        <img src={love} className="post_reactimage"/>
                        <img src={comment} className="post_reactimage"/>
                        <img src={share} className="post_reactimage"/>
                    </div>
                    <div style={{"fontWeight":"bold", "marginLeft":"20px"}}>
                            {this.state.links} likes
                    </div>
                </div>

                {/* Comment Section */}
                <div>
                    {
                        this.state.commentList.map((item,index) => (
                            <div className="post_comment">{item.username}: {item.description} </div>
                        ))
                    }
                    <input text="text" className="post__commentbox" placeholder="Add a comment..."></input>
                </div>
            </div>
        ); 
    }
}

export default Post;