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
export default function SigninModal(props) {
    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="xs"
            open={props.signinModal.show}
            onClose={props.handleToggleSigninModal}
        >
            <DialogTitle>تسجيل دخول</DialogTitle>

            <DialogContent>
                {props.signinModal.isLoading ? (
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
                            {/* <Grid item xs={12}>
                                <TextField
                                    error={
                                        props.signinModal.nameErrorMsg !== ''
                                    }
                                    helperText={props.signinModal.nameErrorMsg}
                                    onChange={(e) => {
                                        props.handleSigninModalInputChange({
                                            id: 'name',
                                            value: e.target.value,
                                        })
                                    }}
                                    value={props.signinModal.name}
                                    label="اسمك و لقبك"
                                    fullWidth
                                    type="text"
                                    variant="filled"
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <TextField
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            props.signin()
                                        }
                                    }}
                                    error={
                                        props.signinModal
                                            .phoneNumberErrorMsg !== ''
                                    }
                                    helperText={
                                        props.signinModal.phoneNumberErrorMsg
                                    }
                                    dir="ltr"
                                    onChange={(e) => {
                                        if (
                                            e.target.value.length > 9 ||
                                            !/^[0-9]*$/.test(e.target.value)
                                        ) {
                                            return
                                        }
                                        props.handleSigninModalInputChange({
                                            id: 'phoneNumber',
                                            value: e.target.value,
                                        })
                                    }}
                                    value={props.signinModal.phoneNumber}
                                    label="رقم هاتفك"
                                    fullWidth
                                    type="text"
                                    variant="filled"
                                    placeholder={'91/92-xxx-xx-xx'}
                                    maxLength={7}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                +218
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={props.signinModal.isLoading}
                    onClick={props.signin}
                    endIcon={<LoginIcon />}
                >
                    تسجيل دخول
                </Button>
                <Button
                    disabled={props.signinModal.isLoading}
                    onClick={props.handleToggleSigninModal}
                >
                    إغلاق
                </Button>
            </DialogActions>
        </Dialog>
    )
}
