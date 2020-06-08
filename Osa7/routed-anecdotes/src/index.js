import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = (event) => {
      setValue("")
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

// moduulissa voi olla monta nimettyä eksportia
export const useAnotherHook = () => {
  // ...
}

ReactDOM.render(<App />, document.getElementById('root'))