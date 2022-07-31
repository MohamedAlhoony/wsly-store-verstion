import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Checkbox from '@mui/material/Checkbox'
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'
import LoginIcon from '@mui/icons-material/Login'
import InputAdornment from '@mui/material/InputAdornment'
import Map from './map'

export default function LocationModal(props) {
    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="lg"
            open={props.locationModal.show}
            onClose={props.handleToggleLocationModal}
        >
            <DialogTitle>عرض المواقع</DialogTitle>

            <DialogContent>
                {props.locationModal.isLoading ? (
                    <Grid
                        item
                        xs={12}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        sx={{ height: 1, width: 1 }}
                    >
                        <CircularProgress />
                    </Grid>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Map
                                    updateMapZoom={props.updateMapZoom}
                                    locations={props.locations}
                                    updateMapCenter={props.updateMapCenter}
                                    locationModal={props.locationModal}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={props.locationModal.isLoading}
                    onClick={props.toggleLocationModal}
                >
                    الغاء
                </Button>
            </DialogActions>
        </Dialog>
    )
}
