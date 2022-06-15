let defaultState = {
    isLoading: false,
    locations: [],
    addLocationModal: {
        show: false,
        mapCenter: {
            lat: 32.8872,
            lng: 13.1913,
        },
        locationType: '',
    },
}

const location_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'location_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'location_page-locations':
            return {
                ...state,
                locations: action.data,
            }
        case 'location_page-addLocationModal':
            return {
                ...state,
                addLocationModal: action.data,
            }

        default:
            return {
                ...state,
            }
    }
}

export default location_page_reducer
