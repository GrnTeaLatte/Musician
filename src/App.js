import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';
import Cookies from 'js-cookie';

import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();

class App extends Component {
    constructor(){
        super();
        const params = this.getHashParams();
        Cookies.set('token', params['access_token'])
        const token = Cookies.get('token');
        if (token) {
            spotifyApi.setAccessToken(token);
        }
        this.state = {
            token: token,
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: '' }
        };
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        e = r.exec(q)
        while (e) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
           e = r.exec(q);
        }
        return hashParams;
    }

    getNowPlaying(){
          spotifyApi.getMyCurrentPlaybackState()
            .then((response) => {
              this.setState({
                nowPlaying: {
                    name: response.item.name,
                    albumArt: response.item.album.images[0].url
                  }
              });
            })
    }
    render() {
//        let authorizationUrl = 'https://musician-login.herokuapp.com/';
        let authorizationUrl = 'http://localhost:3001';
        return (
            <div className="App">
              <header>
                <nav className="navbar">
                    <img className="logo" src="images/headset_logo.png" alt="bloc jams logo" />
                    <h1>Musician</h1>
                    <div className="links-container">
                        <Link className='navbar-link' to='/'>Home</Link>
                        <Link className='navbar-link' to='/library'>Library</Link>
                        <a className='navbar-link' href={authorizationUrl}> Login to Spotify </a>
                    </div>
                </nav>
              </header>
              <div>
                <main>
                    <Route exact path="/" component={Landing} />
                    <Route path="/library" component={Library} />
                    <Route path="/album/:slug" component={Album} />
                </main>
              </div>
            </div>
          );
        }
    }

export default App;
