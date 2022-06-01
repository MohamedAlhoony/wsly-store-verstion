import { base_url } from '../../config'
const normalizeData = (data) => {
    let categories = data.categories.slice()
    // categories = [
    //     {
    //         Id: 1,
    //         Name: 'سندوتشات',
    //         items: [
    //             {
    //                 Id: 1,
    //                 Name: 'شيش طاووق',
    //                 Price: 10,
    //                 preferences: [
    //                     {
    //                         id: 1,
    //                         name: 'هريسة',
    //                         choice: null,
    //                         choices: [
    //                             {
    //                                 Id: 1,
    //                                 Name: 'بدون هريسة',
    //                                 Price: 0,
    //                             },
    //                             {
    //                                 Id: 2,
    //                                 Name: 'مع هريسة',
    //                                 Price: 0,
    //                             },
    //                         ],
    //                     },
    //                     {
    //                         id: 1,
    //                         name: 'هريسة',
    //                         choice: null,
    //                         choices: [
    //                             {
    //                                 Id: 1,
    //                                 Name: 'بدون هريسة',
    //                                 Price: 0,
    //                             },
    //                             {
    //                                 Id: 2,
    //                                 Name: 'مع هريسة',
    //                                 Price: 0,
    //                             },
    //                         ],
    //                     },
    //                     {
    //                         id: 1,
    //                         name: 'هريسة',
    //                         choice: null,
    //                         choices: [
    //                             {
    //                                 Id: 1,
    //                                 Name: 'بدون هريسة',
    //                                 Price: 0,
    //                             },
    //                             {
    //                                 Id: 2,
    //                                 Name: 'مع هريسة',
    //                                 Price: 0,
    //                             },
    //                         ],
    //                     },
    //                 ],
    //             },
    //         ],
    //     },
    //     {
    //         Id: 2,
    //         Name: 'وجبات',
    //         items: [
    //             {
    //                 Id: 2,
    //                 Name: 'وجبة كباب',
    //                 Price: 20,
    //                 preferences: [
    //                     {
    //                         id: 2,
    //                         name: 'الصوص',
    //                         choice: null,
    //                         choices: [
    //                             {
    //                                 Id: 1,
    //                                 Name: 'ساموراي',
    //                                 Price: 5,
    //                             },
    //                             {
    //                                 Id: 2,
    //                                 Name: 'ثومية',
    //                                 Price: 5,
    //                             },
    //                         ],
    //                     },
    //                 ],
    //             },
    //             {
    //                 Id: 3,
    //                 Name: 'وجبة مشكل',
    //                 Price: 20,
    //                 preferences: [],
    //             },
    //         ],
    //     },
    // ]
    let allItems = []
    categories.forEach((category) => {
        allItems = allItems.concat(category.items)
    })
    categories.unshift({ Name: 'كل الأصناف', Id: 0, items: allItems })
    data.categories = categories

    return data
}
export const makeRequests = (storeID) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(isLoading(true))
                const [data] = await Promise.all([getOrdersList(storeID)])
                dispatch({
                    type: 'home_page-data',
                    data: normalizeData(data),
                })
                dispatch(handleCategoryInputValueChange(data.categories[0].Id))
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

const getOrdersList = (storeID) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${base_url}/d/store?id=${storeID}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.status === 200) {
                resolve(body)
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
        const categories = getState().home_page_reducer.data.categories.slice()
        const listItems = categories.find(
            (category) => category.Id === value
        ).items
        dispatch({ type: 'home_page-categoryInputValue', data: value })
        dispatch(updateListItems(listItems))
    }
}

export const updateListItems = (value) => {
    return (dispatch) => {
        dispatch({ type: 'home_page-listItems', data: value })
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
            pref.choiceValue = pref.choice.Id
        })
        dispatch(orderModal({ show: true, listItem: item }))
    }
}
export const handlePrefChange = (value, index) => {
    return (dispatch, getState) => {
        let listItem = getState().home_page_reducer.orderModal.listItem
        let preferences = listItem.preferences.slice()
        preferences[index].choiceValue = Number.parseInt(value)
        listItem.preferences = preferences
        dispatch(orderModal({ listItem }))
    }
}
// :[{"For":"abdo" , "Qty":2 , "item":{"id":1,"clientPreferences":[{"preferenceID":1,"ChoiceID":2},

//     {"preferenceID":2,"ChoiceID":6}

//     ]}}]
export const addToCart = () => {
    return (dispatch, getState) => {
        const orderModalState = getState().home_page_reducer.orderModal
        let cart = getState().home_page_reducer.cart.slice()
        const forName = orderModalState.forName
        const qty = orderModalState.qty
        const listItem = orderModalState.listItem
        // const preferences = orderModalState.listItem.preferences.slice()
        cart.unshift({
            qty,
            forName,
            listItem,
            // name: listItem.Name,
            // price: listItem.Price,
            // item: {
            //     id: listItem.Id,
            //     clientPreferences: preferences.map((pref) => {
            //         return { preferenceID: pref.id, ChoiceID: pref.choice.Id }
            //     }),
            // },
        })
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
const submitRequest = ({ storeID, telNo, clientName, isDelivery, items }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            redirect: 'follow',
            body: JSON.stringify({
                TelNo: telNo,
                ClientName: clientName,
                StoreID: storeID,
                isDelivery,
                items,
            }),
        }
        try {
            var response = await fetch(`${base_url}/d/order`, requestOptions)
            const body = JSON.parse(await response.text())
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

export const submit = (storeID) => {
    return async (dispatch, getState) => {
        try {
            dispatch(
                submitModal({
                    isLoading: true,
                })
            )
            const telNo = getState().home_page_reducer.submitModal.telNo
            const cart = getState().home_page_reducer.cart
            const clientName =
                getState().home_page_reducer.submitModal.clientName
            const isDelivery =
                getState().home_page_reducer.submitModal.isDelivery
            const items = cart.map((item) => {
                return {
                    For: item.forName,
                    Qty: item.qty,
                    item: {
                        id: item.listItem.Id,
                        clientPreferences: item.listItem.preferences.map(
                            (pref) => {
                                return {
                                    ChoiceID: pref.choice.Id,
                                    preferenceID: pref.id,
                                }
                            }
                        ),
                    },
                }
            })
            await submitRequest({
                storeID,
                telNo,
                clientName,
                isDelivery,
                items,
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
                    clientName: '',
                    telNo: '',
                })
            )
            dispatch({ type: 'home_page-cart', data: [] })
        } catch (error) {
            dispatch(submitModal({ isloading: false }))
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
