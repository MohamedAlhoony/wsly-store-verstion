import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Preferences from './preferences/preferences'
export default function OrderModal(props) {
    return (
        <div>
            {/* <Button variant="outlined" onClick={handleClickOpen}>
                Open form dialog
            </Button> */}
            <Dialog
                dir="rtl"
                fullWidth
                maxWidth="md"
                open={props.orderModal.show}
                onClose={props.handleCloseOrderModal}
            >
                <DialogTitle>
                    طلب: {props.orderModal.listItem?.Name}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) =>
                                    props.handleForNameChange(e.target.value)
                                }
                                value={props.orderModal.forName}
                                label="الاسم"
                                fullWidth
                                type="text"
                                variant="filled"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                onChange={(e) =>
                                    props.handleQtyChange(e.target.value)
                                }
                                value={props.orderModal.qty}
                                label="الكمية"
                                fullWidth
                                type="number"
                                variant="filled"
                            />
                        </Grid>
                    </Grid>
                    {props.orderModal.listItem?.preferences.length !== 0 && (
                        <Preferences
                            handlePrefChange={props.handlePrefChange}
                            preferences={
                                props.orderModal.listItem?.preferences ?? []
                            }
                        />
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handleCloseOrderModal}>إلغاء</Button>
                    <Button onClick={props.addToCart}>أضف للسلة</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
