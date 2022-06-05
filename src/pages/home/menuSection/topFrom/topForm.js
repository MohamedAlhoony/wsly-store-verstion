import React from 'react'
import {
    Paper,
    InputBase,
    Divider,
    Select,
    MenuItem,
    Grid,
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
// import styles from './styles.module.scss'
const TopForm = (props) => {
    return (
        <Grid justifyContent={'center'} container>
            <Grid item xs={12} md={6}>
                <Paper
                    component="form"
                    sx={{
                        p: '2px 4px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Select
                        onChange={(e) => {
                            props.handleCategoryInputValueChange(e.target.value)
                        }}
                        disableUnderline
                        variant={'standard'}
                        sx={{ width: 0.3 }}
                        value={props.categoryInputValue}
                    >
                        {props.categories.map((item, key) => {
                            return (
                                <MenuItem key={key} value={item.Id}>
                                    {item.Name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                    <Divider
                        sx={{ height: 28, m: 0.5 }}
                        orientation="vertical"
                    />
                    <InputBase
                        onChange={(e) => {
                            props.handleFilterChange(e.target.value)
                        }}
                        value={props.filter}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="فلترة..."
                    />
                    <FilterAltIcon color={'action'} sx={{ p: '10px' }} />
                </Paper>
            </Grid>
        </Grid>
    )
}

export default TopForm
