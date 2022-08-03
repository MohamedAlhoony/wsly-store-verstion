let defaultState = {
    isLoading: false,
    persons: [],
    addPersonModal: {
        show: false,
        name: '',
        nameError: '',
        isLoading: false,
    },
}

const person_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'person_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'person_page-persons':
            return {
                ...state,
                persons: action.data,
            }
        case 'person_page-addPersonModal':
            return {
                ...state,
                addPersonModal: action.data,
            }

        default:
            return {
                ...state,
            }
    }
}

export default person_page_reducer
