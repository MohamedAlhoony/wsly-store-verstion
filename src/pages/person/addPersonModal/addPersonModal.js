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
export default function SubmitModal(props) {
    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="xs"
            open={props.addPersonModal.show}
            onClose={props.togglePersonModal}
        >
            <DialogTitle>اضافة شخص</DialogTitle>

            <DialogContent>
                {props.addPersonModal.isLoading ? (
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
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={(e) => {
                                        props.handleNameChange(e.target.value)
                                    }}
                                    fullWidth
                                    value={props.addPersonModal.name}
                                    variant={'filled'}
                                    placeholder={'اسم الشخص'}
                                    error={
                                        props.addPersonModal.nameError !== ''
                                    }
                                />
                                {props.addPersonModal.nameError !== '' ? (
                                    <Typography
                                        fontSize={14}
                                        mt={1}
                                        color={'error'}
                                    >
                                        {props.addPersonModal.nameError}
                                    </Typography>
                                ) : null}
                            </Grid>
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    // disabled={props.addPersonModal.name === ''}

                    onClick={props.handleAddNewPerson}
                >
                    إضافة
                </Button>
                <Button
                    disabled={props.addPersonModal.isLoading}
                    onClick={props.togglePersonModal}
                >
                    إغلاق
                </Button>
            </DialogActions>
        </Dialog>
    )
}
