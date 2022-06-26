const initialState = {
    authChecked: false,
    loggedIn: false,
    currentUser: null,
}

const authorization_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTHENTICATED':
            return {
                ...state,
                authChecked: true,
                loggedIn: true,
            }
        case 'NOT_AUTHENTICATED':
            return {
                ...state,
                authChecked: true,
                loggedIn: false,
            }
        case 'authorization_reducer-currentUser':
            return {
                ...state,
                currentUser: action.data,
            }
        default:
            return state
    }
}

export default authorization_reducer
