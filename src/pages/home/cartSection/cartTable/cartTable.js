import * as React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
export default function CartTable(props) {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>المنتج</TableCell>
                        <TableCell>الكمية</TableCell>
                        <TableCell>السعر</TableCell>
                        <TableCell>اسم المعني</TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.cart.map((item, key) => (
                        <TableRow
                            key={key}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{item.listItem.Name}</TableCell>
                            <TableCell>{item.qty}</TableCell>
                            <TableCell>
                                {item.listItem.Price} دينار ليبي
                            </TableCell>
                            <TableCell>
                                {item.forName !== '' ? item.forName : '_ _'}
                            </TableCell>
                            <TableCell>
                                <IconButton
                                    onClick={() =>
                                        props.handleRemoveProduct(key)
                                    }
                                    color="inherit"
                                >
                                    <RemoveShoppingCartIcon color={'error'} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
