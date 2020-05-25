import React from 'react'

const Filter = ({ value, handleOnChange }) => {
    return (
        <div>
            filter shown with <input value={value} onChange={handleOnChange}/>
        </div>
    )

}

export default Filter