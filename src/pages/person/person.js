import React from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import PeopleIcon from '@mui/icons-material/People'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/person'
import AddPersonModal from './addPersonModal/addPersonModal'
import Persons from './persons/persons'
import * as LayoutActions from '../../redux/actions/layout'
const Person = (props) => {
    const navigate = useNavigate()

    const togglePersonModal = (event, reason) => {
        if (reason && reason === 'backdropClick') return
        props.dispatch(
            actions.addPersonModal({ show: !props.addPersonModal.show })
        )
    }

    const deletePerson = (person) => {
        props.dispatch(LayoutActions.handleDeletePerson(person))
    }
    const handleNameChange = (value) => {
        props.dispatch(actions.addPersonModal({ name: value, nameError: '' }))
    }
    const handleAddNewPerson = () => {
        props.dispatch(actions.handleAddNewPerson())
    }
    return (
        <Grid mt={3} container spacing={1}>
            <AddPersonModal
                handleNameChange={handleNameChange}
                togglePersonModal={togglePersonModal}
                addPersonModal={props.addPersonModal}
                handleAddNewPerson={handleAddNewPerson}
            />
            <Grid
                item
                xs={12}
                display={'flex'}
                alignItems={'center'}
                justifyContent={'space-between'}
            >
                <Typography
                    component={'div'}
                    mb={3}
                    variant={'h4'}
                    display={'flex'}
                    alignItems={'center'}
                >
                    <PeopleIcon sx={{ fontSize: 'inherit' }} />
                    الأشخاص
                </Typography>
                <Button onClick={() => navigate(-1)}>
                    <Typography sx={{ fontSize: 17 }}>عودة</Typography>
                    <ArrowBackIcon />
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button
                    onClick={togglePersonModal}
                    endIcon={<AddIcon />}
                    size={'large'}
                    variant="contained"
                >
                    إضافة شخص
                </Button>
            </Grid>
            <Grid item xs={12}>
                {props.persons?.length ? (
                    <Persons
                        deletePerson={deletePerson}
                        persons={props.persons}
                    />
                ) : (
                    <Alert sx={{ mt: 2 }} severity="info">
                        لايوجد لديك أشخاص إلى حد الآن, قم بإضافة شخص
                    </Alert>
                )}
            </Grid>
        </Grid>
    )
}

export default connect(
    ({ person_page_reducer, authorization_reducer, layout_reducer }) => {
        return {
            persons: authorization_reducer.currentUser?.Persons,
            addPersonModal: person_page_reducer.addPersonModal,
        }
    }
)(Person)
