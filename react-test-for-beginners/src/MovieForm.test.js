import React from 'react'
import { render, fireEvent, cleanup } from 'react-testing-library';
import MovieForm from './MovieForm'

afterEach(cleanup);

const consoleSubmit = jest.fn();
//const consoleSubmit = () => console.log('hi');

test('<MovieForm />', () => {
    const { getByText, getByLabelText } = render(<MovieForm subForm={consoleSubmit} />);

    //get input information by label.
    const inputByLabel_Name = getByLabelText('Name');
    inputByLabel_Name.value = 'initialsTEST01';
    fireEvent.change(inputByLabel_Name);

    //SECOND ALTERNATIVE
    // fireEvent.change(getByLabelText('Name'), {
    //     target: { value: 'initialsTEST02' }
    // });

    const submit = getByText('Submit');
    fireEvent.click(submit);

    expect(consoleSubmit).toHaveBeenCalledTimes(1);
    expect(consoleSubmit).toHaveBeenCalledWith({ text: 'initialsTEST01' });

})
