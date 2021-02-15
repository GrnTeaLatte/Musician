import React, { Component } from 'react';

class Results extends Component {
    constructor(props) {
        super(props);
        this.state= {
            results: props.results
        }
    }

    render() {
        const tracks = this.state.results ? this.state.results : [];
        const listItems = tracks.map((track) =>
            <li>{track.name}</li>
        );

        return (
            <ul>{listItems}</ul>
        );
    }
}

export default Results;