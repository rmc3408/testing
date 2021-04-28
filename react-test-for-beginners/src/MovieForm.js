import React, { Component } from 'react'

class MovieForm extends Component {
    render() {
        return (
            <div>
                <form data-testid='form'>
                    <input type='text' />
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default MovieForm
