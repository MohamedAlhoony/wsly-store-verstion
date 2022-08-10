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
import Map from './map'

export default function SubmitModal(props) {
    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="md"
            open={props.submitModal.show}
            onClose={props.handleToggleSubmitModal}
        >
            <DialogTitle>اتمام الطلب</DialogTitle>

            <DialogContent>
                {props.submitModal.isLoading ? (
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
                        <Grid container spacing={1}>
                            <Grid item xs={12} sm={6}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            onChange={(e) =>
                                                props.handleSubmitModalInputChange(
                                                    {
                                                        id: 'isDelivery',
                                                        value: e.target.checked,
                                                    }
                                                )
                                            }
                                            checked={
                                                props.submitModal.isDelivery
                                            }
                                        />
                                    }
                                    label="مع التوصيل"
                                />
                            </Grid>
                            {props.submitModal.isDelivery && (
                                <Grid item xs={12}>
                                    <Map
                                        handleMarkerClick={
                                            props.handleMarkerClick
                                        }
                                        handleAddLocation={
                                            props.handleAddLocation
                                        }
                                        submitModal={props.submitModal}
                                        locations={props.locations}
                                    />
                                </Grid>
                            )}
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={
                        props.submitModal.isDelivery &&
                        !props.submitModal.selectedLocation
                    }
                    onClick={props.submit}
                    endIcon={<ShoppingCartCheckoutIcon />}
                >
                    طلب
                </Button>
                <Button
                    disabled={props.submitModal.isLoading}
                    onClick={props.handleToggleSubmitModal}
                >
                    إغلاق
                </Button>
            </DialogActions>
        </Dialog>
    )
}
