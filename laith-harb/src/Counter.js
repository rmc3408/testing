import React, { useState } from 'react'

const Counter = () => {
    const [count, setCount] = useState(0);
    const [inpValue, setInpValue] = useState(1);

    return (
        <div>
            <h3 data-testid='header'>My Counter</h3>
            <h1 data-testid='counter'
                className={count >= 100 ? 'green' : (count <= -100 ? 'red' : '')}
            >{count}</h1>
            <button
                onClick={() => setCount(count-inpValue)}
                data-testid='rem-btn'>-</button>
            <input value={inpValue} type='number' data-testid='input'
                onChange={(e)=> setInpValue(e.target.valueAsNumber) }/>
            <button
                onClick={() => setCount(count+inpValue)}
                data-testid='add-btn'>+</button>
        </div>
    )
}

export default Counter
