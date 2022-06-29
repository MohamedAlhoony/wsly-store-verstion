import React from 'react'
import ProductsItems from './productsItems/productsItems'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TopForm from './topFrom/topForm'
import Skeleton from '@mui/material/Skeleton'
import Stack from '@mui/material/Stack'
const getSkeleton = () => {
    return Array.apply(null, Array(5)).map((item, key) => {
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
        <Box>
            <TopForm {...props} />
            <ProductsItems {...props} />
        </Box>
    ) : (
        <Box>
            <Grid spacing={1} sx={{ mt: 2 }} container>
                {getSkeleton()}
            </Grid>
        </Box>
    )
}

export default MenuSection
