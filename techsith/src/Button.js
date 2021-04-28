import React from 'react'

const Button = ({label}) => {
    return (
        <div className='btn' data-testid='button'>Hi {label}</div>
    )
}

export default Button
