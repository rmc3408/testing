import React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react';
import MovieForm from '../MovieForm'

afterEach(cleanup);

const consoleSubmit = jest.fn();
//const consoleSubmit = () => console.log('hi');

test('<MovieForm />', () => {
    const { getByText, getByLabelText } = render(<MovieForm subForm={consoleSubmit} />);

    fireEvent.change(getByLabelText('Name'), {
        target: { value: 'initialsTEST02' }
    });

    const submit = getByText('Submit');
    fireEvent.click(submit);

    expect(consoleSubmit).toHaveBeenCalledTimes(1);
    expect(consoleSubmit).toHaveBeenCalledWith({ text: 'initialsTEST02' });

})
