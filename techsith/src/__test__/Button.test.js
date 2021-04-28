import React from 'react';
import ReactDOM from 'react-dom';
import Button from '../Button';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';



afterEach(cleanup);

it('render withot crash', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button></Button>, div);
})

test('render button label', () => {
    const { getByTestId } = render(<Button label='click me'></Button>);
    expect(getByTestId('button')).toHaveTextContent('click me');
    
})

test('render button label 2', () => {
    const { getByTestId } = render(<Button label='save'></Button>);
    expect(getByTestId('button')).toHaveTextContent('save')
})

test('snapshot', () => {
    const myTree = renderer.create(<Button label='snap'></Button>).toJSON();
    expect(myTree).toMatchSnapshot();
})


export default Button
