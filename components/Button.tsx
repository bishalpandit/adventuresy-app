import React from 'react'

const Button = ({ classProp, children } : { classProp: string, children: any }) => {
    return (
        <button className={`${classProp}`}>
            {children}
        </button>
    )
}

export default Button
