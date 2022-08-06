import React from 'react'
import {
    Paper,
    InputBase,
    Divider,
    Select,
    MenuItem,
    Grid,
    Typography,
    // Tab,
    // Tabs,
} from '@mui/material'
import './mui-tabs.css'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import { useTheme } from '@mui/material/styles'
import { Tabs, Tab } from 'react-tabs-scrollable'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import 'react-tabs-scrollable/dist/rts.css'
// import styles from './styles.module.scss'
const TopForm = (props) => {
    return (
        <Grid justifyContent={'center'} container>
            <Grid item xs={12}>
                <Tabs
                    animationDuration={300}
                    selectedAnimationDuration={0}
                    leftBtnIcon={<ArrowBackIosIcon />}
                    rightBtnIcon={<ArrowForwardIosIcon />}
                    hideNavBtnsOnMobile={false}
                    isRTL={true}
                    activeTab={props.categoryInputValue}
                    onTabClick={(e, newValue) => {
                        props.handleCategoryInputValueChange(newValue)
                    }}
                    // variant="scrollable"
                    // scrollButtons={true}
                    // value={props.categoryInputValue}
                    // onChange={(event, newValue) => {
                    // props.handleCategoryInputValueChange(newValue)
                    // }}
                    // aria-label="icon tabs example"
                >
                    {props.categories.map((item, key) => {
                        // return <Tab key={key} label={item.Name} />
                        return (
                            <Tab key={key}>
                                <Typography component={'span'}>
                                    {item.Name}
                                </Typography>
                            </Tab>
                        )
                    })}
                </Tabs>
            </Grid>
            {/* <Grid item xs={12} md={6}>
                <Paper
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
                        value={props.filterValue}
                        onChange={(e) => {
                            props.handleFilterChange(e.target.value)
                        }}
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="فلترة..."
                    />
                    <FilterAltIcon color={'action'} sx={{ p: '10px' }} />
                </Paper>
            </Grid> */}
        </Grid>
    )
}

export default TopForm
