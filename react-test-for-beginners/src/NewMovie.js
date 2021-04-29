import React, { Component } from 'react'
import MovieForm from './MovieForm'

class NewMovie extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(txt) {
        //e.preventDefault();
        console.log(txt);
    }

    render() {
        return (
            <div>
                <h1 data-testid='title'>New Movie</h1>
                <MovieForm subForm={this.handleSubmit}/>
            </div>
        )
    }
}
export default NewMovie;