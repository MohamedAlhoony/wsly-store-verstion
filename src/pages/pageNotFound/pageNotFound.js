import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles/styles.module.scss'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const PageNotFound = () => {
    return (
        <Box
            sx={{
                height: 'calc(100vh - 80px)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <h1>404</h1>
            <p>الصفحة غير موجودة</p>
        </Box>
    )
}

export default PageNotFound
