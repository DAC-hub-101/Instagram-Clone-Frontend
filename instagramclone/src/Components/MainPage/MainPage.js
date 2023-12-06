// MainPage.js

import React, { Component } from 'react';
import "./MainPage.css";
import Post from '../Post/Post';
import uploadImage from "../../images/upload.png";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postArray: [], // All posts
            filteredPostArray: [], // Posts to display after filtering
            progressBar: "",
        };
    }

    componentDidMount() {
        this.getPost();
    }

    getPost = () => {
        // Fetch post data from your backend and update the state
        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
                this.setState({ postArray: data });
                this.filterPosts(""); // Filter posts with an empty search query to show all posts initially
            });
    }

    // Function to filter posts based on the search query
    filterPosts = (searchQuery) => {
        const { postArray } = this.state;

        // Filter posts based on the search query (username)
        const filteredPosts = postArray.filter(
            (post) => post.userName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        this.setState({ filteredPostArray: filteredPosts });
    };

    upload = (event) => {
        let image = event.target.files[0];
        if (!image) return;

        const storage = getStorage();
        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                this.setState({ progressBar: progress });
            },
            (error) => {
                console.error("Upload Error:", error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log("File available at", downloadURL);

                    let payload = {
                        "postId": Math.floor(Math.random() * 100000).toString(),
                        "userId": JSON.parse(localStorage.getItem("users")).uid,
                        "postPath": downloadURL,
                        "timeStamp": new Date().getTime(),
                        "likeCount": 0
                    };

                    const requestOptions = {
                        method: "POST",
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(payload)
                    };

                    fetch("http://localhost:8080/post", requestOptions)
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                            this.getPost(); // Refresh the posts
                        })
                        .catch(error => {
                            console.error("Error:", error);
                        });
                });
            }
        );
    }

    render() {
        return (
            <div>
                <div className="mainpage__container">
                    <div className="mainpage__divider"></div>
                    <div className="fileupload">
                        <label htmlFor="file-upload">
                            <img className="mainpage__uploadicon" src={uploadImage} alt="Upload" />
                        </label>
                        <input onChange={this.upload} id="file-upload" type="file" />
                    </div>
                    <div className="mainpage__divider"></div>
                </div>
                <div className="upload_text">{this.state.progressBar}% Uploaded</div>
                {
                    this.state.filteredPostArray.map((item) => (
                        <Post
                            key={item.postId}
                            id={item.postId}
                            userName={item.userName}
                            postImage={item.postPath}
                            likes={item.likeCount}
                        />
                    ))
                }
            </div>
        );
    }
}

export default MainPage;
