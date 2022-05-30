import * as React from 'react'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

export default function SimpleSnackbar(props) {
    return (
        <Snackbar
            open={props.snackBar.show}
            autoHideDuration={props.snackBar.closeDuration}
            onClose={props.closeSnackBar}
        >
            <Alert
                onClose={props.closeSnackBar}
                severity={props.snackBar.severity}
                sx={{ width: '100%' }}
            >
                {props.snackBar.message}
            </Alert>
        </Snackbar>
    )
}
