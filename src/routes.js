import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home'
import PageNotFound from './pages/pageNotFound/pageNotFound'
import Layout from './HOC/layout'
const Router = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index path="/:storeID" element={<HomePage />} />
                <Route path={'/*'} element={<PageNotFound />} />
            </Route>
        </Routes>
    )
}

export default Router
