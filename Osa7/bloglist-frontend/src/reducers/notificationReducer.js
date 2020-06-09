
const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            state = action.data
            console.log(state)
            return state
        default:
            return state
    }
  
}




export const setNotification = (message) => {
    console.log(message)
    return {
        type: 'SET_NOTIFICATION',
        data: message
    }
}

export default notificationReducer