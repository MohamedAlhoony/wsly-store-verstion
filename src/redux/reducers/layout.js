const initialState = {
    signinModal: {
        show: false,
        isLoading: false,
        phoneNumber: '',
        name: '',
        nameErrorMsg: '',
        phoneNumberErrorMsg: '',
    },
    confirmCodeModal: {
        timer: null,
        isLoading: false,
        show: false,
        confirmCode: '',
        clientName: '',
        tokenId: '',
        clientId: '',
    },
}

const layout_reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'layout_reducer-signinModal':
            return {
                ...state,
                signinModal: action.data,
            }
        case 'layout_reducer-confirmCodeModal':
            return {
                ...state,
                confirmCodeModal: action.data,
            }
        default:
            return state
    }
}

export default layout_reducer
