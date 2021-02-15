import React from 'react';
import Aux from '../hoc/Aux';
import './styles/main.css';
import Search from './Search';

const Landing = (props) => (
    <Aux>
        <div className="bg_image"/>
        <Search/>
         <section className="landing">
            <section className="selling-points">
              <div className="point">
                <h2 className="point-title">Choose your music</h2>
                <p className="point-description">The world is full of music; why should you have to listen to music that someone else chose?</p>
              </div>
              <div className="point">
                <h2 className="point-title">Unlimited, streaming, ad-free</h2>
                <p className="point-description">No arbitrary limits. No distractions.</p>
              </div>
              <div className="point">
                <h2 className="point-title">Mobile enabled</h2>
                <p className="point-description">Listen to your music on the go. This streaming service is available on all mobile platforms.</p>
              </div>
            </section>
        </section>
    </Aux>
);

export default Landing;