import { addNewPersonRequest, snackBar } from './home'
import { getToken, getTokenId, fetchAuthenticatedUser } from './authorization'
import { base_url } from '../../config'
import axios from 'axios'

export const addPersonModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'person_page-addPersonModal',
            data: {
                ...getState().person_page_reducer.addPersonModal,
                ...value,
            },
        })
    }
}
export const makeRequests = (storeID) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(isLoading(true))
                const [data] = await Promise.all([
                    getOrders({
                        accessToken: getToken(),
                        tokenId: getTokenId(),
                    }),
                ])
                dispatch({ type: 'order_page-orders', data })
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
        dispatch({ type: 'order_page-isLoading', data: isLoading })
    }
}

const getOrders = ({ accessToken, tokenId }) => {
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
                `${base_url}/D/MyOrders`,
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
