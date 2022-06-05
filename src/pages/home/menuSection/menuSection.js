import React from 'react'
import ProductsItems from './productsItems/productsItems'
import Box from '@mui/material/Box'
import TopForm from './topFrom/topForm'
const MenuSection = (props) => {
    return (
        <Box>
            <TopForm {...props} />
            <ProductsItems {...props} />
        </Box>
    )
}

export default MenuSection
