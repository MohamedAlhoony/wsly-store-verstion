import { addNewPersonRequest, snackBar } from '../actions/home'
import { getToken, getTokenId, fetchAuthenticatedUser } from './authorization'

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

export const handleAddNewPerson = () => {
    return async (dispatch, getState) => {
        try {
            const name = getState().person_page_reducer.addPersonModal.name
            const persons =
                getState().authorization_reducer.currentUser?.Persons
            if (name === '') {
                dispatch(addPersonModal({ nameError: 'قم بإدخال الإسم' }))
                return
            } else if (
                persons.findIndex((person) => person.PersonName === name) !== -1
            ) {
                dispatch(
                    addPersonModal({
                        nameError: 'هذا الإسم موجود مسبقا لديك, أدخل اسما آخرا',
                    })
                )
                return
            }
            dispatch(addPersonModal({ isLoading: true }))
            const body = await addNewPersonRequest({
                accessToken: getToken(),
                tokenId: getTokenId(),
                name: name.trim(),
            })
            dispatch(
                addPersonModal({ isLoading: false, show: false, name: '' })
            )
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'success',
                    message: 'تم إضافة الشخص بنجاح',
                })
            )
            const userData = await fetchAuthenticatedUser({
                accessToken: getToken(),
                tokenId: getTokenId(),
            })
            dispatch({
                type: 'authorization_reducer-currentUser',
                data: userData,
            })
        } catch (err) {
            dispatch(addPersonModal({ isLoading: false, name: '' }))
            dispatch(
                snackBar({
                    show: true,
                    closeDuration: 4000,
                    severity: 'error',
                    message: 'فشلت عملية إضافة الشخص',
                })
            )
        }
    }
}
