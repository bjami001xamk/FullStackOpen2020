



const reducer = (state = '', action) => {
    switch(action.type) {
        case 'SET_NEW_FILTER':
            return action.data
        default:
            return state
    }
}





export const setNewFilter = (filter) => {
    return{
        type: 'SET_NEW_FILTER',
        data:filter
    }
}

export default reducer