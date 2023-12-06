// NavBar.js

import React, { Component } from 'react';
import "./NavBar.css";
import Grid from '@material-ui/core/Grid';
import insta_log from "../../images/logoinsta.png"
import home from "../../images/home.svg";
import message from "../../images/message.svg";
import find from "../../images/find.svg";
import react from "../../images/love.svg";
import Avatar from '@material-ui/core/Avatar';
import pp from "../../images/pp1.png"

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: "", // User input for search
        };
    }

    handleSearchInputChange = (event) => {
        const searchInput = event.target.value;
        this.setState({ searchInput });
        this.props.onSearch(searchInput); // Call the onSearch function to update the search query in the parent component
    };

    render() {
        return (
            <div>
                <div className="navbar__barContent">
                    <Grid container>
                        <Grid item xs={2}> </Grid>
                        <Grid item xs={3}>
                            <img className="navbar_logo" src={insta_log} width="105px" alt="Instagram" />
                        </Grid>
                        <Grid item xs={3}>
                            <input
                                type="text"
                                className="navbar__searchBar"
                                placeholder="Search"
                                value={this.state.searchInput}
                                onChange={this.handleSearchInputChange}
                            />
                        </Grid>
                        <Grid item xs={3} style={{ "display": "flex" }}>
                            <img className="navbar__img" src={home} width="25px" alt="Home" />
                            <img className="navbar__img" src={message} width="25px" alt="Messages" />
                            <img className="navbar__img" src={find} width="25px" alt="Search" />
                            <img className="navbar__img" src={react} width="25px" alt="React" />
                            <Avatar src={pp} className="navbar__img" style={{ "maxWidth": "25px", "maxHeight": "25px" }} alt="Profile" />
                        </Grid>
                        <Grid item xs={1}></Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

export default NavBar;
