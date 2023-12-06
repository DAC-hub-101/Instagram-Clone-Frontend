import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import MainContent from '../MainContent/MainContent';
import LoginPage from '../LoginPage/LoginPage'; // Import the login page
import { auth } from '../firebase'; // Import Firebase auth

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            postArray: [], // Initialize postArray here
            filteredPosts: [], // For displaying filtered posts
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                // User is signed in
                this.setState({ isAuthenticated: true });
                this.fetchPosts(); // Fetch posts when the user is authenticated
            } else {
                // No user is signed in
                this.setState({ isAuthenticated: false });
            }
        });
    }

    // Fetch posts from the backend
    fetchPosts = () => {
        fetch('http://localhost:8080/post')
            .then(response => response.json())
            .then(data => {
                this.setState({ postArray: data });
            })
            .catch(error => console.error('Error:', error));
    }

    // Filter posts based on the search term
    handleSearch = (searchTerm) => {
        const { postArray } = this.state;
        const filteredPosts = postArray.filter(
            (post) => post.userName.toLowerCase().includes(searchTerm.toLowerCase())
        );

        this.setState({ filteredPosts });
    }

    render() {
        if (!this.state.isAuthenticated) {
            return <LoginPage />; // Redirect to the login page if not authenticated
        }

        return (
            <div>
                <NavBar onSearch={this.handleSearch} /> {/* Pass the handleSearch function */}
                <MainContent posts={this.state.filteredPosts.length > 0 ? this.state.filteredPosts : this.state.postArray} /> {/* Show filtered or all posts */}
            </div>
        );
    }
}

export default Home;
