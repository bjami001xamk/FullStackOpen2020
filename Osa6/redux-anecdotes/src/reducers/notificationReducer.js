
const initialState = ''

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            if(state[1]) {
                clearTimeout(state[1])
            }
            let newNotification = action.data
            state = newNotification
            
            return [newNotification, action.timeoutID]
        case 'EMPTY_NOTIFICATION':
            return ''
        default:
             return state
    }
}

export const emptyNotification = () => {
    return{
        type: 'EMPTY_NOTIFICATION'
    }
}

export const setNotification = (message, seconds) => {
    return async(dispatch) => {
        seconds = seconds * 1000 
        const timeoutID = setTimeout(() => {
            dispatch({
                type: 'EMPTY_NOTIFICATION'
            })
        }, seconds)

        dispatch({
            type: 'SET_NOTIFICATION',
            data: message,
            timeoutID: timeoutID
        })
    }
}

export default reducer