import { base_url } from '../../config'
import { snackBar, submitModal } from './home'
import axios from 'axios'
import { getToken, getTokenId, fetchAuthenticatedUser } from './authorization'

export const signinModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'layout_reducer-signinModal',
            data: {
                ...getState().layout_reducer.signinModal,
                ...value,
            },
        })
    }
}

export const confirmCodeModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'layout_reducer-confirmCodeModal',
            data: {
                ...getState().layout_reducer.confirmCodeModal,
                ...value,
            },
        })
    }
}

export const getCurrentUserRequest = ({ token, customerId }) => {
    return new Promise(async (resolve, reject) => {
        var myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('authorization', `bearer ${token}`)
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        }
        try {
            var response = await fetch(
                `${base_url}/api/main/customer/${customerId}`,
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

export const locationModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'layout_reducer-locationModal',
            data: {
                ...getState().layout_reducer.locationModal,
                ...value,
            },
        })
    }
}

export const handleFindUserLocation = () => {
    return (dispatch) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    dispatch(
                        locationModal({
                            zoom: 19,
                            location: {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            },
                            center: {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            },
                        })
                    )
                },
                function () {
                    dispatch(
                        snackBar({
                            show: true,
                            closeDuration: 4000,
                            severity: 'info',
                            message: 'قم بتشغيل خاصية تحديد الموقع لجهازك',
                        })
                    )
                }
            )
        } else {
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'متصفحك لا يدعم هذه الخاصية',
                })
            )
        }
    }
}

export const handleLocationSubmit = () => {
    return async (dispatch, getState) => {
        try {
            dispatch(
                locationModal({
                    isLoading: true,
                })
            )
            const location = getState().layout_reducer.locationModal.location
            const body = await addLocationRequest({
                accessToken: getToken(),
                tokenId: getTokenId(),
                location,
            })
            const userData = await fetchAuthenticatedUser({
                accessToken: getToken(),
                tokenId: getTokenId(),
            })
            dispatch({
                type: 'authorization_reducer-currentUser',
                data: userData,
            })
            dispatch(
                submitModal({
                    selectedLocation:
                        userData.Locations[userData.Locations.length - 1],
                })
            )

            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'success',
                    message: 'تم إضافة الموقع بنجاح',
                })
            )
            dispatch(
                locationModal({
                    isLoading: false,
                    show: false,
                })
            )
        } catch (err) {
            dispatch(locationModal({ isLoading: false }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية التحديث',
                })
            )
        }
    }
}

const addLocationRequest = ({
    location,
    accessToken,
    tokenId,
    locationName,
    notoForDriver,
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
        const requestBody = {}
        try {
            var response = await axios.post(
                `${base_url}/D/Location?Lat=${location.lat}&Lang=${location.lng}&LocationName=${locationName}&NoteForDriver=${notoForDriver}`,
                requestBody,
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
