let defaultState = {
    isLoading: false,
    orderDetails: [],
    addOrderModal: {
        show: false,
        name: '',
        nameError: '',
        isLoading: false,
    },
}

const orderDetails_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'orderDetails_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'orderDetails_page-orderDetails':
            return {
                ...state,
                orderDetails: action.data,
            }
        case 'orderDetails_page-addOrderModal':
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

export default orderDetails_page_reducer
