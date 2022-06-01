import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase'
import Divider from '@mui/material/Divider'
import PersonIcon from '@mui/icons-material/Person'
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits'
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
                            <Paper
                                variant="outlined"
                                component="form"
                                sx={{
                                    p: '2px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <InputBase
                                    onChange={(e) =>
                                        props.handleForNameChange(
                                            e.target.value
                                        )
                                    }
                                    value={props.orderModal.forName}
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="الاسم"
                                />
                                <PersonIcon
                                    color={'action'}
                                    sx={{ p: '10px' }}
                                />
                            </Paper>
                            {/* <TextField
                                onChange={(e) =>
                                    props.handleForNameChange(e.target.value)
                                }
                                value={props.orderModal.forName}
                                label="الاسم"
                                fullWidth
                                type="text"
                                variant="filled"
                            /> */}
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Paper
                                variant="outlined"
                                component="form"
                                sx={{
                                    p: '2px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    maxWidth: 230,
                                }}
                            >
                                <IconButton
                                    onClick={() =>
                                        props.handleQtyChange({ id: 'add' })
                                    }
                                    sx={{ p: '10px' }}
                                    aria-label="directions"
                                >
                                    <AddIcon />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        props.handleQtyChange({
                                            id: 'subtract',
                                        })
                                    }
                                    sx={{ p: '10px' }}
                                    aria-label="directions"
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Divider
                                    sx={{ height: 28, m: 0.5 }}
                                    orientation="vertical"
                                />
                                <InputBase
                                    readOnly
                                    value={`الكمية (${props.orderModal.qty})`}
                                    sx={{ ml: 1, flex: 1 }}
                                />
                                <ProductionQuantityLimitsIcon
                                    color={'action'}
                                    sx={{ p: '10px' }}
                                />
                            </Paper>
                            {/* <IconButton sx={{ p: '10px' }}>
                                <AddIcon />
                            </IconButton>
                            <IconButton sx={{ p: '10px' }}>
                                <RemoveIcon />
                            </IconButton>
                            <TextField
                                onChange={(e) =>
                                    props.handleQtyChange(e.target.value)
                                }
                                value={props.orderModal.qty}
                                label="الكمية"
                                fullWidth
                                type="number"
                                variant="filled"
                            /> */}
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
