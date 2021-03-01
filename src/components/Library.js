import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import albumData from './../data/albums';
import SpotifyWebApi from 'spotify-web-api-js';
import Results from './Results';
import './styles/library.css';

const spotifyApi = new SpotifyWebApi();

class Library extends Component {
    constructor(props){
        super();
        let token = '';
        let results = [];
        if(props.location.data) {
            const params = this.getHashParams();
            token = props.location.data.token;
            if (token) {
                spotifyApi.setAccessToken(token);
            }
            results = props.location.data.results;
        }

        this.state = {
            albums: [],
            loggedIn: token ? true : false,
            nowPlaying: { name: 'Not Checked', albumArt: '' },
            results: results
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

    getSavedAlbums(){
      spotifyApi.getMySavedAlbums()
        .then((response) => {
            console.log(response)
            this.setState({
                albums:response.items.map( (item, index) => { return item.album } )
            })
        });
    }


    render() {
        return (
            <div>
                <section className='library_section'>
                    <div>
                        Now Playing: { this.state.nowPlaying.name }
                    </div>
                    <div>
                        <img src={this.state.nowPlaying.albumArt} style={{ height: 150 }}/>
                    </div>
                    {
                    this.state.loggedIn &&
                        <button onClick={() => this.getNowPlaying()}>
                          Check Now Playing
                        </button>
                    }
                    {
                    this.state.loggedIn &&
                        <button onClick={() => this.getSavedAlbums()}>
                          View My Albums
                        </button>
                    }
                </section>
                <section className='library_section'>
                    {
                        this.state.albums.map( (album, index) =>
                           <div>{album.name}</div>
                        )
                    }
                </section>
                <section className='library_section'>
                    <Results results={this.state.results}/>
                </section>
            </div>
        );
    }
}

export default Library;