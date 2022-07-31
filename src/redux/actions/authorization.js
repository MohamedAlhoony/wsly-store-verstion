import { base_url } from '../../config'
import axios from 'axios'
import { signinModal, confirmCodeModal } from './layout'
import { snackBar, makeRequests } from './home'

// export const verifyOTP_and_signin = () => {
//     return async (dispatch, getState) => {
//         try {
//             dispatch(
//                 confirmCodeModal({
//                     isLoading: true,
//                 })
//             )
//             const confirmCode =
//                 getState().layout_reducer.confirmCodeModal.confirmCode
//             await verifyOTP(Number.parseInt(confirmCode))
//             const user = authentication.currentUser
//             // const { customer } = await addAuthenticatedCustomer(
//             //     user.accessToken
//             // )
//             // dispatch({
//             //     type: 'authorization_reducer-currentUser',
//             //     data: customer,
//             // })
//             dispatch(
//                 snackBar({
//                     show: true,
//                     closeDuration: 4000,
//                     severity: 'success',
//                     message: 'تم تسجيل الدخول بنجاح',
//                 })
//             )
//             dispatch(
//                 confirmCodeModal({
//                     isLoading: false,
//                     show: false,
//                     confirmCode: '',
//                 })
//             )
//             // if (!customer.name && !customer.location) {
//             //     dispatch(
//             //         updateUserDataModal({
//             //             show: true,
//             //             nextOpenLocationModal: true,
//             //         })
//             //     )
//             // } else if (!customer.name) {
//             //     dispatch(
//             //         updateUserDataModal({
//             //             show: true,
//             //         })
//             //     )
//             // } else if (!customer.location) {
//             //     dispatch(
//             //         locationModal({
//             //             show: true,
//             //         })
//             //     )
//             // }
//         } catch (err) {
//             dispatch(confirmCodeModal({ isLoading: false }))
//             dispatch(
//                 snackBar({
//                     show: true,
//                     closeDuration: 4000,
//                     severity: 'error',
//                     message: 'فشلت عملية التأكيد',
//                 })
//             )
//         }
//     }
// }
export const signout = () => {
    return async (dispatch) => {
        try {
            dispatch(logoutUser())
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'info',
                    message: 'تم تسجيل الخروج',
                })
            )
            window.location.reload()
        } catch (err) {
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'info',
                    message: 'فشل تسجيل الخروج',
                })
            )
        }
    }
}
export const handleSigninValidation = () => {
    return (dispatch, getState) => {
        try {
            // const name = getState().store_page_reducer.signinModal.name
            const phoneNumber =
                getState().layout_reducer.signinModal.phoneNumber
            let errors = []
            // if (name === '') {
            //     errors.push({
            //         id: 'nameErrorMsg',
            //         errorMsg: 'يجب ادخال الاسم',
            //     })
            // } else if (name.length < 5) {
            //     errors.push({
            //         id: 'nameErrorMsg',
            //         errorMsg: 'الاسم لايمكن أن يكون أقل من 5 أحرف',
            //     })
            // }
            if (phoneNumber === '') {
                errors.push({
                    id: 'phoneNumberErrorMsg',
                    errorMsg: 'يجب ادخال رقم الهاتف',
                })
            } else if (
                phoneNumber.length < 9 ||
                !['91', '92', '94', '95'].includes(phoneNumber.substring(0, 2))
            ) {
                errors.push({
                    id: 'phoneNumberErrorMsg',
                    errorMsg: 'رقم الهاتف غير صحيح',
                })
            }
            if (errors.length) {
                throw new Error(JSON.stringify(errors))
            }
        } catch (err) {
            throw new Error(err.message)
        }
    }
}

const requestOTP = (phoneNumber) => {
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
                `${base_url}/D/CreateOTP?TelNo=${phoneNumber}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.ok) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}
const verifyOTP = ({ confirmCode, clientName, tokenId }) => {
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
                `${base_url}/D/ConfirmOTP?TokenID=${tokenId}&OTPValue=${encodeURIComponent(
                    confirmCode
                )}&ClientName=${clientName}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.ok) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const handleResendOTP = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(confirmCodeModal({ isLoading: true }))
            const tokenId = getState().layout_reducer.confirmCodeModal.tokenId
            await resendOTP({ tokenId })
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'info',
                    message: 'تم إعادة الارسال للرسالة',
                })
            )
            dispatch(confirmCodeModal({ isLoading: false }))
        } catch (err) {
            console.log(err)
            dispatch(confirmCodeModal({ isLoading: false }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية إعادة ارسال الرسالة',
                })
            )
        }
    }
}

const resendOTP = ({ tokenId }) => {
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
                `${base_url}/ResendOTP?TokenID=${tokenId}`,
                requestOptions
            )
            const body = JSON.parse(await response.text())
            if (response.ok) {
                resolve(body)
            } else {
                reject()
            }
        } catch (error) {
            reject(error)
        }
    })
}

const storeAuthData = ({ token, expDate, tokenId }) => {
    localStorage.setItem('token', token)
    localStorage.setItem('tokenId', tokenId)
    localStorage.setItem('expDate', new Date(expDate).getTime())
}
export const getToken = () => {
    const now = new Date(Date.now()).getTime()
    const expDate = Number.parseInt(localStorage.getItem('expDate'))
    if (now < expDate) {
        return localStorage.getItem('token')
    } else {
        return undefined
    }
}
export const getTokenId = () => {
    const now = new Date(Date.now()).getTime()
    const expDate = Number.parseInt(localStorage.getItem('expDate'))
    if (now < expDate) {
        return localStorage.getItem('tokenId')
    } else {
        return undefined
    }
}

export const verifyOTP_and_signin = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(
                confirmCodeModal({
                    isLoading: true,
                })
            )
            const confirmCode =
                getState().layout_reducer.confirmCodeModal.confirmCode
            const tokenId = getState().layout_reducer.confirmCodeModal.tokenId
            const clientName =
                getState().layout_reducer.confirmCodeModal.clientName
            const data = await verifyOTP({ confirmCode, tokenId, clientName })
            storeAuthData({
                token: data.AccessToken,
                tokenId: data.TokenID,
                expDate: data.ExpDate,
            })
            const storeId = getState().home_page_reducer.storeId
            window.location.reload()
            dispatch(authCheck())
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'success',
                    message: 'تم تسجيل الدخول بنجاح',
                })
            )
            dispatch(
                confirmCodeModal({
                    isLoading: false,
                    show: false,
                    confirmCode: '',
                })
            )
        } catch (err) {
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
export const handleSignin = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(signinModal({ isLoading: true }))
            const phoneNumber =
                getState().layout_reducer.signinModal.phoneNumber

            try {
                const confirmationResult = await requestOTP(
                    '+218' + phoneNumber
                )
                dispatch(signinModal({ show: false, isLoading: false }))
                dispatch(
                    confirmCodeModal({
                        timer: Date.now() + 1000 * 60 * 2,
                        show: true,
                        tokenId: confirmationResult.TokenID,
                        clientId: confirmationResult.ClientID,
                        clientName: '',
                    })
                )
            } catch (err) {
                throw new Error(err)
            }
        } catch (err) {
            console.log(err)
            dispatch(signinModal({ isLoading: false }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية تسجيل الدخول , حاول لاحقا',
                })
            )
        }
    }
}

export const authCheck = () => {
    return async (dispatch, getState) => {
        try {
            const token = getToken()
            const tokenId = getTokenId()
            if (token) {
                const userData = await fetchAuthenticatedUser({
                    accessToken: token,
                    tokenId,
                })
                dispatch({ type: 'AUTHENTICATED' })
                dispatch({
                    type: 'authorization_reducer-currentUser',
                    data: userData,
                })
            } else {
                dispatch({ type: 'NOT_AUTHENTICATED' })
            }
        } catch (err) {
            console.log(err)
        }
    }
}

const logoutUser = () => {
    return (dispatch) => {
        deleteUserData()
        dispatch({ type: 'NOT_AUTHENTICATED' })
    }
}

const deleteUserData = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('expDate')
}

export const fetchAuthenticatedUser = ({ tokenId, accessToken }) => {
    return new Promise(async (resolve, reject) => {
        var requestOptions = {
            method: 'GET',
            headers: {
                AccessToken: accessToken,
                TokenID: tokenId,
            },
        }
        try {
            var response = await axios.get(`${base_url}/D/data`, requestOptions)
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
