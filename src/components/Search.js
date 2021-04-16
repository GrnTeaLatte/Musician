import React, { Component } from 'react';
import { Redirect, Route, Link } from 'react-router-dom';
import './styles/search.css';
import Cookies from 'js-cookie';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class Search extends Component {
    constructor(props) {
        super(props);
        const token = Cookies.get('token');
        console.log(token)
        spotifyApi.setAccessToken(token);
        this.state = {
            queryTerm: '',
            token: token
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    searchSpotify () {
        spotifyApi.searchTracks(this.state.queryTerm)
            .then((response) => {
                this.setState({
                    results:response.tracks.items
                })
            });
    }

    handleChange(event) {
        this.setState({queryTerm: event.target.value});
    }

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