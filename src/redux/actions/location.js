export const addLocationModal = (value) => {
    return (dispatch, getState) => {
        dispatch({
            type: 'location_page-addLocationModal',
            data: {
                ...getState().location_page_reducer.addLocationModal,
                ...value,
            },
        })
    }
}
