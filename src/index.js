import * as ReactDOMClient from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'
const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
})
const theme = createTheme({
    direction: 'rtl',
    typography: {
        fontFamily: ['Tajawal'].join(','),
    },
    palette: {
        primary: {
            main: '#385278',
        },
        secondary: {
            main: '#f5a62b',
        },
    },
})
const container = document.getElementById('root')

const root = ReactDOMClient.createRoot(container)

root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <CacheProvider value={cacheRtl}>
                <App />
            </CacheProvider>
        </Provider>
    </ThemeProvider>
)
