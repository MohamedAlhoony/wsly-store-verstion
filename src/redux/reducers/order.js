let defaultState = {
    isLoading: false,
    orders: [],
    addOrderModal: {
        show: false,
        name: '',
        nameError: '',
        isLoading: false,
    },
}

const order_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'order_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'order_page-orders':
            return {
                ...state,
                orders: action.data,
            }
        case 'order_page-addOrderModal':
            return {
                ...state,
                addOrderModal: action.data,
            }

        default:
            return {
                ...state,
            }
    }
}

export default order_page_reducer
