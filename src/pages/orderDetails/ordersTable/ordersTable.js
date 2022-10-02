import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import moment from 'moment/moment'

const getPreferences = (prefs) => {
    let preferences = ''
    prefs.forEach((pref, index) => {
        preferences +=
            pref.ChoiceCaption + (prefs.length - 1 !== index ? ' ,' : '')
    })
    if (preferences === '') {
        return ''
    } else {
        return '(' + preferences + ')'
    }
}

const OrderList = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>اسم المنتج</TableCell>
                        <TableCell>الكمية</TableCell>
                        <TableCell>اسم الشخص</TableCell>
                        <TableCell>التفضيلات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.orderItems.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{row.item.ItemName}</TableCell>
                            <TableCell>{row.Qty}</TableCell>
                            <TableCell>{row.For ? row.For : '_ _'}</TableCell>
                            <TableCell>
                                {getPreferences(row.item?.clientPreferences)}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default OrderList
