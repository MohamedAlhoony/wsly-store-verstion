import { combineReducers } from 'redux'
import home_page_reducer from './home'

const appReducer = combineReducers({
    home_page_reducer,
})
const appReducer_middleware = (state, action) => {
    switch (action.type) {
        case 'reset-app':
            state = undefined
            break
        case 'reset-home_page_reducer':
            state.home_page_reducer = undefined
            break

        default:
    }
    return appReducer(state, action)
}
export default appReducer_middleware
