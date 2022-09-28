import { addNewPersonRequest, snackBar } from './home'
import { getToken, getTokenId, fetchAuthenticatedUser } from './authorization'
import { base_url } from '../../config'
import axios from 'axios'

export const makeRequests = (orderId) => {
    return (dispatch, getState) => {
        return new Promise(async (resolve, reject) => {
            try {
                dispatch(isLoading(true))
                const [data] = await Promise.all([
                    getOrderDetails({
                        accessToken: getToken(),
                        tokenId: getTokenId(),
                        orderId,
                    }),
                ])
                dispatch({ type: 'orderDetails_page-orderDetails', data })
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
        dispatch({ type: 'orderDetails_page-isLoading', data: isLoading })
    }
}

const getOrderDetails = ({ accessToken, tokenId, orderId }) => {
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
                `${base_url}/D/MyOrders?OrderID=${orderId}`,
                requestOptions
            )
            if (response.statusText === 'OK') {
                resolve(response.data[0] ?? null)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}
