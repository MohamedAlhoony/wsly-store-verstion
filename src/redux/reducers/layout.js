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
    locationModal: {
        show: false,
        isLoading: false,
        location: { lat: 32.8872, lng: 13.1913 },
        center: { lat: 32.8872, lng: 13.1913 },
        zoom: 12,
        showGuide: true,
        locationName: '',
        noteForDriver: '',
    },
    displayLocationsModal: {
        selectedLocation: { lat: 32.8872, lng: 13.1913 },
        show: false,
        isLoading: false,
        location: { lat: 32.8872, lng: 13.1913 },
        center: { lat: 32.8872, lng: 13.1913 },
        zoom: 12,
        showGuide: true,
        locationName: '',
        noteForDriver: '',
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
        case 'layout_reducer-locationModal':
            return {
                ...state,
                locationModal: action.data,
            }
        case 'layout_reducer-displayLocationsModal':
            return {
                ...state,
                displayLocationsModal: action.data,
            }
        default:
            return state
    }
}

export default layout_reducer
