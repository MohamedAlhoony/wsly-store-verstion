import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import Countdown from 'react-countdown'
import SendIcon from '@mui/icons-material/Send'
const Completionist = () => (
    <Typography component={'span'}>
        انتهت صلاحية الرمز, قم بإعادة الإرسال
    </Typography>
)
const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
        // Render a completed state
        return <Completionist />
    } else {
        // Render a countdown
        return (
            <span>
                انتهاء صلاحية رمز التأكيد في&nbsp;{minutes}:{seconds}
            </span>
        )
    }
}
export default function ConfirmCodeModal(props) {
    return (
        <Dialog
            dir="rtl"
            fullWidth
            maxWidth="xs"
            open={props.confirmCodeModal.show}
            onClose={props.handleToggleConfirmCodeModal}
        >
            <DialogTitle>
                {props.confirmCodeModal.clientId === 0
                    ? 'أدخل اسمك و رمز التأكيد'
                    : 'أدخل رمز التأكيد'}
            </DialogTitle>

            <DialogContent>
                {props.confirmCodeModal.isLoading ? (
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
                            {props.confirmCodeModal.clientId === 0 ? (
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={(e) => {
                                            // if (
                                            //     e.target.value.length > 6 ||
                                            //     !/^[0-9]*$/.test(e.target.value)
                                            // ) {
                                            //     return
                                            // }
                                            props.handleConfirmCodeModalInputChange(
                                                {
                                                    id: 'clientName',
                                                    value: e.target.value,
                                                }
                                            )
                                        }}
                                        value={
                                            props.confirmCodeModal.clientName
                                        }
                                        label="اسمك"
                                        fullWidth
                                        type="text"
                                        variant="filled"
                                    />
                                </Grid>
                            ) : null}
                            <Grid item xs={12}>
                                <TextField
                                    dir={'ltr'}
                                    onChange={(e) => {
                                        // if (
                                        //     e.target.value.length > 6 ||
                                        //     !/^[0-9]*$/.test(e.target.value)
                                        // ) {
                                        //     return
                                        // }
                                        props.handleConfirmCodeModalInputChange(
                                            {
                                                id: 'confirmCode',
                                                value: e.target.value,
                                            }
                                        )
                                    }}
                                    value={props.confirmCodeModal.confirmCode}
                                    label="رمز التأكيد"
                                    fullWidth
                                    type="text"
                                    variant="filled"
                                />

                                <Typography mt={1}>
                                    <Countdown
                                        date={props.confirmCodeModal.timer}
                                        renderer={renderer}
                                    />
                                </Typography>
                                <Box mt={1}>
                                    <Typography component={'span'}>
                                        لم يصلك الرمز؟
                                    </Typography>
                                    <Button
                                        onClick={props.resendConfirmationCode}
                                        variant="text"
                                    >
                                        إعادة إرسال رمز التأكيد
                                    </Button>
                                </Box>
                            </Grid>
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button
                    endIcon={<SendIcon />}
                    // disabled={props.confirmCodeModal.confirmCode.length !== 6}
                    onClick={props.handleConfirmCodeSubmit}
                >
                    تأكيد
                </Button>
                <Button
                    disabled={props.confirmCodeModal.isLoading}
                    onClick={props.handleToggleConfirmCodeModal}
                >
                    إلغاء
                </Button>
            </DialogActions>
        </Dialog>
    )
}
