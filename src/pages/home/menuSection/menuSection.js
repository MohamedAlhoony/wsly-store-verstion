import React from 'react'
import ProductsItems from './productsItems/productsItems'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TopForm from './topFrom/topForm'
import Alert from '@mui/material/Alert'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
const getSkeleton = () => {
    return Array.apply(null, Array(12)).map((item, key) => {
        return (
            <Grid
                xs={6}
                sm={3}
                key={key}
                justifyContent={'center'}
                sx={{ display: 'flex' }}
                item
            >
                <Stack width={1} spacing={1}>
                    <Skeleton variant="text" />
                    <Skeleton variant="circular" width={40} height={40} />
                    <Skeleton variant="rectangular" height={118} />
                </Stack>
            </Grid>
        )
    })
}

const MenuSection = (props) => {
    return !props.isLoading ? (
        props.isAvailable ? (
            <Box>
                <TopForm {...props} />
                <ProductsItems {...props} />
            </Box>
        ) : (
            <Alert severity="info">المتجر مغلق في الوقت الحالي</Alert>
        )
    ) : (
        <Box>
            <Grid spacing={1} sx={{ mt: 2 }} container>
                {getSkeleton()}
            </Grid>
        </Box>
    )
}

export default MenuSection
