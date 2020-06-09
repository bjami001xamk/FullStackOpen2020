
const blogReducer = (state = [], action) => {
    switch(action.type) {
        case 'SET_BLOGS':
            return action.data
        default:
            return state
    }
}

export const setBlogs = (blogArray) => {
    return{
        type:'SET_BLOGS',
        data: blogArray
    }
}


export default blogReducer