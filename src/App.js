import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
    render() {
        return (
            <div className="App">
              <header>
                <nav className="navbar">
                    <img className="logo" src="images/headset_logo.png" alt="bloc jams logo" />
                    <h1>Musician</h1>
                    <div className="links-container">
                        <Link className='navbar-link' to='/'>Home</Link>
                        <Link className='navbar-link' to='/library'>Library</Link>
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
