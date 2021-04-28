import React, { Component } from 'react';

class Counter extends Component {
  state = {
    count: 0,
  };

  addCounter() {
    this.setState(st => ({
      count: st.count + 1,
    }));
  } 

  render() {
    return (
      <div className='box'>
        <button onClick={this.addCounter.bind(this)} data-testid='btn'>{this.state.count}</button>
      </div>
    );
  }
}

export default Counter;
