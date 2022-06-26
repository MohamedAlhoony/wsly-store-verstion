import { base_url } from '../../config'
import { snackBar } from './home'
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
