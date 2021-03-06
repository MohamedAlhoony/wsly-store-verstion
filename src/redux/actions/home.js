import { base_url } from '../../config'
import { getToken, getTokenId, fetchAuthenticatedUser } from './authorization'
import axios from 'axios'

const normalizeData = (data) => {
    let categories = data.StoreMenue.categories.slice()
    let allItems = []
    categories.forEach((category) => {
        allItems = allItems.concat(category.items)
    })
    categories.unshift({ Name: 'كل الأصناف', Id: 0, items: allItems })
    data.StoreMenue.categories = categories

    return data
}
export const makeRequests = (storeID) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(isLoading(true))
                const [data, userData] = await Promise.all([
                    getOrdersList({
                        storeID,
                        accessToken: getToken(),
                        tokenId: getTokenId(),
                    }),
                    fetchAuthenticatedUser({
                        accessToken: getToken(),
                        tokenId: getTokenId(),
                    }),
                ])
                dispatch({ type: 'home_page-storeId', data: storeID })
                dispatch({
                    type: 'authorization_reducer-currentUser',
                    data: userData,
                })
                dispatch({
                    type: 'home_page-data',
                    data: normalizeData(data),
                })
                dispatch(
                    handleCategoryInputValueChange(
                        data.StoreMenue.categories[0].Id
                    )
                )
                if (data.Persons?.length) {
                    dispatch({ type: 'home_page-forNameOptions', data: [] })
                    dispatch(addPersonsToList(data.Persons))
                }
                dispatch(isLoading(false))
                resolve(data)
            } catch (error) {
                console.log(error)
                dispatch(isLoading(false))
                reject()
            }
        })
    }
}

export const isLoading = (isLoading) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-isLoading', data: isLoading })
    }
}

const getOrdersList = ({ storeID, accessToken, tokenId }) => {
    return new Promise(async (resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            headers: accessToken
                ? {
                      AccessToken: accessToken,
                      TokenID: tokenId,
                  }
                : {},
        }
        try {
            var response = await axios.get(
                `${base_url}/d/store?id=${storeID}`,
                requestOptions
            )
            if (response.statusText === 'OK') {
                resolve(response.data)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const handleCategoryInputValueChange = (value) => {
    return (dispatch, getState) => {
        const categories =
            getState().home_page_reducer.data.StoreMenue.categories.slice()
        const listItems = categories.find(
            (category) => category.Id === value
        ).items
        dispatch({ type: 'home_page-categoryInputValue', data: value })
        dispatch(updateListItems(listItems))
        dispatch(updateFilteredListItems(listItems))
        dispatch(handleFilterChange())
    }
}

export const updateListItems = (value) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-listItems', data: value })
    }
}
export const updateFilteredListItems = (value) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-filteredListItems', data: value })
    }
}

export const orderModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'home_page-orderModal',
            data: { ...getState().home_page_reducer.orderModal, ...value },
        })
    }
}
export const submitModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'home_page-submitModal',
            data: { ...getState().home_page_reducer.submitModal, ...value },
        })
    }
}
export const confirmCodeModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'home_page-confirmCodeModal',
            data: {
                ...getState().home_page_reducer.confirmCodeModal,
                ...value,
            },
        })
    }
}
export const snackBar = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'home_page-snackBar',
            data: { ...getState().home_page_reducer.snackBar, ...value },
        })
    }
}

export const handleItemListClick = (item) => {
    return (dispatch) => {
        item.preferences.forEach((pref) => {
            pref.choiceValue = pref.choice
        })
        dispatch(orderModal({ show: true, listItem: item }))
    }
}
export const handlePrefChange = (value, index) => {
    return (dispatch, getState) => {
        let listItem = getState().home_page_reducer.orderModal.listItem
        let preferences = listItem.preferences.slice()
        preferences[index].choiceValue = preferences[index].choices.find(
            (item) => Number.parseInt(value) === item.Id
        )
        listItem.preferences = preferences
        dispatch(orderModal({ listItem }))
    }
}

export const addToCart = () => {
    return async (dispatch, getState) => {
        const orderModalState = getState().home_page_reducer.orderModal
        let cart = getState().home_page_reducer.cart.slice()
        const forName = orderModalState.forName
        const qty = orderModalState.qty
        const listItem = orderModalState.listItem
        let sameOrderIndex = cart.findIndex((item) => {
            if (item.listItem.Id === listItem.Id && item.forName === forName) {
                return item.listItem.preferences.every((pref, index) => {
                    return (
                        pref.choiceValue.Id ===
                        listItem.preferences[index].choiceValue.Id
                    )
                })
            } else {
                return false
            }
        })
        if (sameOrderIndex !== -1) {
            cart[sameOrderIndex].qty += qty
        } else {
            cart.unshift({
                qty,
                forName,
                listItem,
            })
        }
        if (forName !== '') {
            let forNameOptions =
                getState().home_page_reducer.forNameOptions.slice()

            let itemIndex = forNameOptions.findIndex(
                (item) => item.forName === forName
            )
            if (itemIndex !== -1) {
                let productIndex = forNameOptions[itemIndex].items.findIndex(
                    (item) => item.Id === listItem.Id
                )
                if (productIndex !== -1) {
                    forNameOptions[itemIndex].items[productIndex] = listItem
                } else {
                    forNameOptions[itemIndex].items.push(listItem)
                }
            } else {
                try {
                    dispatch(orderModal({ isLoading: true }))
                    await addNewPersonRequest({
                        name: forName,
                        accessToken: getToken(),
                        tokenId: getTokenId(),
                    })
                    const userData = await fetchAuthenticatedUser({
                        accessToken: getToken(),
                        tokenId: getTokenId(),
                    })
                    dispatch({
                        type: 'authorization_reducer-currentUser',
                        data: userData,
                    })
                    dispatch(orderModal({ isLoading: false }))
                } catch (err) {
                    dispatch(orderModal({ isLoading: false }))
                    dispatch(
                        snackBar({
                            show: true,
                            closeDuration: 4000,
                            severity: 'error',
                            message: 'فشلت العملية',
                        })
                    )
                    return
                }
                forNameOptions.unshift({ forName, items: [listItem] })
            }
            dispatch({ type: 'home_page-forNameOptions', data: forNameOptions })
        }
        dispatch({ type: 'home_page-cart', data: cart })
        dispatch(orderModal({ show: false, qty: 1, forName: '' }))
        dispatch(
            snackBar({
                show: true,
                closeDuration: 4000,
                severity: 'success',
                message: 'تمت الإضافة للسلة',
            })
        )
    }
}

export const addPersonsToList = (persons) => {
    return (dispatch, getState) => {
        let forNameOptions = getState().home_page_reducer.forNameOptions.slice()
        let listItems = getState().home_page_reducer.listItems.slice()
        const userPersons =
            getState().authorization_reducer.currentUser?.Persons ?? []
        userPersons.forEach((person) => {
            forNameOptions.unshift({
                forName: person.PersonName,
                items: [],
                id: person.PersonID,
            })
        })
        persons.forEach((person, personIndex) => {
            let personObjIndex = forNameOptions.findIndex(
                (personItem) => personItem.PersonID === person.id
            )
            person.items.forEach((item, itemIndex) => {
                const listItemIndex = listItems.findIndex(
                    (oItem) => oItem.Id === item.id
                )

                let preferences = listItems[listItemIndex].preferences

                item.clientPreferences.forEach(
                    (clientPreference, clientPreferenceIndex) => {
                        preferences[clientPreferenceIndex].choiceValue =
                            preferences[[clientPreferenceIndex]].choices.find(
                                (choice) =>
                                    choice.Id === clientPreference.ChoiceID
                            )
                    }
                )
                forNameOptions[personObjIndex].items.push({
                    ...listItems[listItemIndex],
                    preferences: preferences,
                })
            })
        })
        dispatch({ type: 'home_page-forNameOptions', data: forNameOptions })
    }
}

export const removeFromCart = (index) => {
    return (dispatch, getState) => {
        let cart = getState().home_page_reducer.cart.slice()
        cart.splice(index, 1)
        dispatch({ type: 'home_page-cart', data: cart })
        dispatch(
            snackBar({
                show: true,
                closeDuration: 4000,
                severity: 'success',
                message: 'تم الحذف من السلة',
            })
        )
    }
}
const submitRequest = ({
    storeID,
    IsDelivery,
    items,
    LocationID,
    accessToken,
    tokenId,
}) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            headers: accessToken
                ? {
                      AccessToken: accessToken,
                      TokenID: tokenId,
                  }
                : {},
            redirect: 'follow',
        }
        const requestBody = {
            StoreID: Number.parseInt(storeID),
            IsDelivery,
            LocationID,
            items,
        }
        try {
            var response = await axios.post(
                `${base_url}/d/order`,
                requestBody,
                requestOptions
            )
            if (response.statusText === 'Created') {
                resolve(response.data)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

const addNewPersonRequest = ({ accessToken, tokenId, name }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            headers: accessToken
                ? {
                      AccessToken: accessToken,
                      TokenID: tokenId,
                  }
                : {},
            redirect: 'follow',
        }
        const requestBody = {}
        try {
            var response = await axios.post(
                `${base_url}/D/Person?Name=${name}`,
                requestBody,
                requestOptions
            )
            if (response.statusText === 'Created') {
                resolve(response.data)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const submit = (storeID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(
                submitModal({
                    isLoading: true,
                })
            )
            const LocationID =
                getState().home_page_reducer.submitModal.selectedLocation
                    ?.LocationID
            const cart = getState().home_page_reducer.cart
            const IsDelivery =
                getState().home_page_reducer.submitModal.isDelivery
            const items = cart.map((item) => {
                return {
                    PersonID:
                        getState().authorization_reducer.currentUser.Persons.find(
                            (person) => person.PersonName === item.forName
                        ).PersonID,
                    Qty: item.qty,
                    item: {
                        id: item.listItem.Id,
                        clientPreferences: item.listItem.preferences.map(
                            (pref) => {
                                return {
                                    ChoiceID: pref.choiceValue.Id,
                                    preferenceID: pref.id,
                                }
                            }
                        ),
                    },
                }
            })
            const body = await submitRequest({
                storeID,
                LocationID,
                IsDelivery,
                items,
                accessToken: getToken(),
                tokenId: getTokenId(),
            })
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'success',
                    message: 'تم الطلب بنجاح',
                })
            )
            dispatch(
                submitModal({
                    isLoading: false,
                    show: false,
                    selectedLocation: null,
                })
            )
            dispatch(
                confirmCodeModal({
                    timer: Date.now() + 1000 * 60 * 2,
                    orderId: body.OrderID,
                    show: true,
                })
            )
            dispatch({ type: 'home_page-cart', data: [] })
        } catch (error) {
            console.log(error)
            dispatch(submitModal({ isLoading: false }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية الطلب',
                })
            )
        }
    }
}

export const handleCartQtyChange = ({ id, index }) => {
    return (dispatch, getState) => {
        let cart = getState().home_page_reducer.cart.slice()
        if (id === 'add') {
            cart[index].qty = cart[index].qty + 1
        } else if (cart[index].qty > 1) {
            cart[index].qty = cart[index].qty - 1
        }
        dispatch({ type: 'home_page-cart', data: cart })
    }
}

export const handleFilterChange = () => {
    return (dispatch, getState) => {
        const listItems = getState().home_page_reducer.listItems
        const filterValue = getState()
            .home_page_reducer.filterValue.toLowerCase()
            .trim()
        const filteredListItems = listItems.filter(
            (item) => item.Name.toLowerCase().indexOf(filterValue) !== -1
        )
        dispatch({
            type: 'home_page-filteredListItems',
            data: filteredListItems,
        })
    }
}

export const handleConfirmCodeSubmit = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(
                confirmCodeModal({
                    isLoading: true,
                })
            )
            const confirmCode =
                getState().home_page_reducer.confirmCodeModal.confirmCode
            const orderId =
                getState().home_page_reducer.confirmCodeModal.orderId

            await confirmCodeSubmitRequest({
                confirmCode,
                orderId,
            })
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'success',
                    message: 'تمت عملية التأكيد بنجاح',
                })
            )
            dispatch(
                confirmCodeModal({
                    isLoading: false,
                    show: false,
                    confirmCode: '',
                })
            )
            dispatch({ type: 'home_page-cart', data: [] })
        } catch (error) {
            console.log(error)
            dispatch(confirmCodeModal({ isLoading: false }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية التأكيد',
                })
            )
        }
    }
}

const confirmCodeSubmitRequest = ({ confirmCode, orderId }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${base_url}/D/ConfirmOrder?OrderID=${orderId}&ConfirmCode=${encodeURIComponent(
                    confirmCode
                )}`,
                requestOptions
            )
            let body
            try {
                body = JSON.parse(await response.text())
            } catch (err) {
                body = ''
            }
            if (response.status >= 200 && response.status < 300) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}
export const resendConfirmationCode = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(
                confirmCodeModal({
                    isLoading: true,
                })
            )
            const orderId =
                getState().home_page_reducer.confirmCodeModal.orderId

            await resendConfirmationCodeRequest({
                orderId,
            })
            dispatch(
                confirmCodeModal({
                    timer: Date.now() + 1000 * 60 * 2,
                })
            )
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'success',
                    message: 'تمت عملية إعادة الإرسال',
                })
            )
            dispatch(
                confirmCodeModal({
                    isLoading: false,
                    confirmCode: '',
                })
            )
        } catch (error) {
            dispatch(confirmCodeModal({ isLoading: false }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية إعادة الإرسال',
                })
            )
        }
    }
}

const resendConfirmationCodeRequest = ({ orderId }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${base_url}/D/ResendOTP?OrderID=${orderId}`,
                requestOptions
            )
            let body
            try {
                body = JSON.parse(await response.text())
            } catch (err) {
                body = ''
            }
            if (response.status >= 200 && response.status < 300) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const handleMarkerClick = (item) => {
    return (dispatch) => {
        dispatch(submitModal({ selectedLocation: item }))
        dispatch(
            snackBar({
                show: true,
                closeDuration: 1000,
                severity: 'info',
                message: 'تم اختيار الموقع',
            })
        )
    }
}
