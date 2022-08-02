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
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import CircularProgress from '@mui/material/CircularProgress'
import styles from './styles.module.scss'
import { Typography } from '@mui/material'
export default function OrderModal(props) {
    return (
        <div>
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

                <DialogContent style={{ height: '100vh' }}>
                    {props.orderModal.isLoading ? (
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
                                <Grid item xs={12} sm={6}>
                                    <Paper
                                        variant="outlined"
                                        component="form"
                                        sx={{
                                            p: '2px 4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            borderColor:
                                                props.orderModal
                                                    .forNameErrMsg !== ''
                                                    ? '#d32f2f'
                                                    : 'none',
                                        }}
                                    >
                                        <Autocomplete
                                            sx={{
                                                '& .MuiAutocomplete-popper': {
                                                    display: 'none',
                                                },
                                            }}
                                            blurOnSelect={true}
                                            onChange={(e, value) => {
                                                props.forNameAutocompleteChange(
                                                    value
                                                )
                                            }}
                                            fullWidth
                                            disablePortal
                                            id="combo-box-demo"
                                            options={props.forNameOptions.map(
                                                (item, key) => {
                                                    return {
                                                        ...item,
                                                        label: item.forName,
                                                    }
                                                }
                                            )}
                                            renderInput={(params) => (
                                                <div
                                                    ref={params.InputProps.ref}
                                                >
                                                    <input
                                                        {...params.inputProps}
                                                        onChange={(e) =>
                                                            props.handleForNameChange(
                                                                e.target.value
                                                            )
                                                        }
                                                        value={
                                                            props.orderModal
                                                                .forName
                                                        }
                                                        placeholder="الاسم"
                                                        className={
                                                            styles.forNameInput
                                                        }
                                                    />
                                                </div>
                                            )}
                                        />

                                        <PersonIcon
                                            color={'action'}
                                            sx={{ p: '10px' }}
                                        />
                                    </Paper>
                                    <Typography
                                        fontSize={14}
                                        mt={1}
                                        color={'error'}
                                    >
                                        {props.orderModal.forNameErrMsg}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Paper
                                        variant="outlined"
                                        component="form"
                                        sx={{
                                            p: '2px 4px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            maxWidth: 200,
                                        }}
                                    >
                                        <IconButton
                                            onClick={() =>
                                                props.handleQtyChange({
                                                    id: 'add',
                                                })
                                            }
                                            sx={{ p: '10px' }}
                                            aria-label="directions"
                                        >
                                            <AddIcon />
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
                                        <Divider
                                            sx={{ height: 28, m: 0.5 }}
                                            orientation="vertical"
                                        />
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
                                    </Paper>
                                </Grid>
                            </Grid>
                            {props.orderModal.listItem?.preferences.length !==
                                0 && (
                                <Preferences
                                    handlePrefChange={props.handlePrefChange}
                                    preferences={
                                        props.orderModal.listItem
                                            ?.preferences ?? []
                                    }
                                />
                            )}
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        disabled={props.orderModal.isLoading}
                        onClick={props.handleCloseOrderModal}
                    >
                        إلغاء
                    </Button>
                    <Button
                        disabled={props.orderModal.isLoading}
                        onClick={props.addToCart}
                    >
                        أضف للسلة
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
