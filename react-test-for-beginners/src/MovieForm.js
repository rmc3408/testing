import React, { Component } from 'react'

class MovieForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'initials',
        }
    }

    render() {
        const { subForm } = this.props;

        return (
            <div>
                {/* <form data-testid='form' onSubmit={(evt) => subForm(evt, this.state)} > */}
                <form data-testid='form' onSubmit={() => subForm(this.state)} >
                    <label htmlFor='text'>Name</label>
                    <input type='text' id='text' onChange={e => this.setState({ text: e.target.value })  }/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default MovieForm
