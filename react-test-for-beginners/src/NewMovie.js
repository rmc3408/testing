import React, { Component } from 'react'
import MovieForm from './MovieForm'

class NewMovie extends Component {
    render() {
        return (
            <div>
                <h1 data-testid='title'>New Movie</h1>
                <MovieForm />
            </div>
        )
    }
}
export default NewMovie;