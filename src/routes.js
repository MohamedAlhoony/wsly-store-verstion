import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home'
import LocationPage from './pages/location/location'
import PersonPage from './pages/person/person'
import PageNotFound from './pages/pageNotFound/pageNotFound'
import Layout from './HOC/layout'
const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/location" element={<LocationPage />} />
                <Route index path="/person" element={<PersonPage />} />
                <Route index path="/:storeID" element={<HomePage />} />

                <Route path={'/*'} element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default Router
