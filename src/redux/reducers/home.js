let defaultState = {
    isLoading: false,
    data: null,
    cart: [],
    categoryInputValue: '',
    listItems: [],
    filteredListItems: [],
    forNameOptions: [],
    orderModal: {
        show: false,
        listItem: null,
        forName: '',
        qty: 1,
    },
    snackBar: {
        show: false,
        message: '',
        severity: 'success',
        closeDuration: 6000,
    },
    filterValue: '',
    submitModal: {
        isLoading: false,
        show: false,
        clientName: '',
        telNo: '',
        isDelivery: true,
    },
    confirmCodeModal: {
        timer: null,
        isLoading: false,
        show: false,
        confirmCode: '',
        orderId: '',
    },
}

const home_page_reducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'home_page-isLoading':
            return {
                ...state,
                isLoading: action.data,
            }
        case 'home_page-forNameOptions':
            return {
                ...state,
                forNameOptions: action.data,
            }
        case 'home_page-cart':
            return {
                ...state,
                cart: action.data,
            }
        case 'home_page-orderModal':
            return {
                ...state,
                orderModal: {
                    ...action.data,
                    listItem: {
                        ...action.data.listItem,
                        preferences: action.data.listItem.preferences.map(
                            (pref) => {
                                return {
                                    ...pref,
                                    choices: pref.choices.map((choice) => {
                                        return { ...choice }
                                    }),
                                    choiceValue: { ...pref.choiceValue },
                                    choice: { ...pref.choice },
                                }
                            }
                        ),
                    },
                },
            }
        case 'home_page-filterValue':
            return {
                ...state,
                filterValue: action.data,
            }
        case 'home_page-listItems':
            return {
                ...state,
                listItems: action.data,
            }
        case 'home_page-filteredListItems':
            return {
                ...state,
                filteredListItems: action.data,
            }
        case 'home_page-categoryInputValue':
            return {
                ...state,
                categoryInputValue: action.data,
            }
        case 'home_page-data':
            return {
                ...state,
                data: action.data,
            }
        case 'home_page-snackBar':
            return {
                ...state,
                snackBar: action.data,
            }
        case 'home_page-submitModal':
            return {
                ...state,
                submitModal: action.data,
            }
        case 'home_page-confirmCodeModal':
            return {
                ...state,
                confirmCodeModal: action.data,
            }
        default:
            return {
                ...state,
            }
    }
}

export default home_page_reducer
