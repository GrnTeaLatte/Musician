import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './styles/search.css';
import Cookies from 'js-cookie';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Search extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('token');
//      Set session token on Spotify Web API instance
        spotifyApi.setAccessToken(token);
//      Initialize Search state to have an empty query
        this.state = {
            queryTerm: '',
            token: token
        };
//      Add handler to changes that sets the queryterm on keypress
        this.handleChange = this.handleChange.bind(this);
//      Add Handler to submission to send search request
        this.handleSubmit = this.handleSubmit.bind(this);
    }
//  Calls Spotify search API with queryterm
    searchSpotify () {
        spotifyApi.searchTracks(this.state.queryTerm)
            .then((response) => {
                this.setState({
                    results: response.tracks.items
                })
            });
    }
    handleChange(event) {
        this.setState({queryTerm: event.target.value});
    }
//  Expect to return a list of tracks
    handleSubmit(event) {
        this.searchSpotify();
        event.preventDefault();
    }

    render() {
        if (this.state.results) {
            const data = {
                token: this.state.token,
                results: this.state.results,
            }
            return (<Redirect to={{pathname: '/library', data: data}}/>)
        }
        return (
        <div className="search_container">
            <form className="search" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="First, Login to Spotify..." value={this.state.queryTerm} onChange={this.handleChange} />
                <button type="submit">Search</button>
            </form>
        </div>
        )
    }
}

export default Search;