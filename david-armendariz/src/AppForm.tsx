import React from 'react'

interface Props {
    fnChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    text: string,
    children: string,
}

function AppForm({ fnChange, text, children}: Props) {
    return (
        <div>
            <h1>{children}</h1>
            <label htmlFor='search'>input:</label>
            <input type='text' id='search' value={text} onChange={(e) => fnChange(e)} placeholder='Enter text...' />
        </div>
    )
}

export default AppForm;
