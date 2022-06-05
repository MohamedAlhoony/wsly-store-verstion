import React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
const getPreferences = (props) => {
    return props.preferences.map((pref, key) => {
        return (
            <Grid key={key} item xs={12} sm={'auto'}>
                {/* <Paper sx={{ p: 1, px: 3, height: 1 }}> */}
                <FormControl>
                    <RadioGroup
                        onChange={(e) =>
                            props.handlePrefChange(e.target.value, key)
                        }
                        value={pref.choiceValue.Id}
                        aria-labelledby="demo-radio-buttons-group-label"
                        name="radio-buttons-group"
                    >
                        <FormLabel id="demo-radio-buttons-group-label">
                            {pref.name}
                        </FormLabel>

                        {pref.choices.map((choice, key) => {
                            return (
                                <FormControlLabel
                                    // labelPlacement={'top'}
                                    sx={{ margin: 0 }}
                                    key={key}
                                    value={choice.Id}
                                    control={<Radio size="small" />}
                                    label={
                                        choice.Name + ` - ${choice.Price} دينار`
                                    }
                                />
                            )
                        })}
                    </RadioGroup>
                </FormControl>
                {/* </Paper> */}
            </Grid>
        )
    })
}
const Preferences = (props) => {
    return (
        <Box py={3}>
            <Typography
                sx={{ mb: 1, fontSize: 17 }}
                component={'div'}
                variant="h6"
            >
                التفضيلات:
            </Typography>
            <Grid spacing={3} container>
                {getPreferences(props)}
            </Grid>
        </Box>
    )
}

export default Preferences
