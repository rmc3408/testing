import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library';
import Counter from './Counter'

afterEach(cleanup);

test('Counter', () => {
    //const component = render(<Counter />);
    //component.debug();
    //component.getByText('0');
    const { debug, getByTestId } = render(<Counter />);
    
    const btnEl = getByTestId('btn');
    expect(btnEl.textContent).toBe('0');

    fireEvent.click(btnEl);
    expect(btnEl.textContent).toBe('1');
    //debug();

})
