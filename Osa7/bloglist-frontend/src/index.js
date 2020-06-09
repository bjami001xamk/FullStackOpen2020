import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import App from './App'
import userReducer from './reducers/userReducer'

const reducers = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
})

const store = createStore(reducers)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , 
    document.getElementById('root'))