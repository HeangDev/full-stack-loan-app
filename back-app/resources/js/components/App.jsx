import React from 'react'
import { Routes, Route } from "react-router-dom";

import PrivateRoutes from '../route/PrivateRoutes';
import PublicRoutes from '../route/PublicRoutes';

import Dashboard from '../pages/Dashboard'

import UserIndex from '../pages/user/Index'
import UserCreate from '../pages/user/Create'
import UserEdit from '../pages/user/Edit'

import DurationIndex from '../pages/duration/Index'
import DurationCreate from '../pages/duration/Create'
import DurationEdit from '../pages/duration/Edit'

import CustomerIndex from '../pages/customer/Index'
import CustomerCreate from '../pages/customer/Create'
import CustomerShow from '../pages/customer/Show'

import Login from '../pages/Login'
import NotFound from '../pages/NotFound'
import Layout from '../layout/Layout';

const App = () => {
    return (
        <>
            <Layout>
                <Routes>
                    <Route element={<PrivateRoutes/>}>
                        <Route path="/dashboard" element={<Dashboard />} />

                        <Route path="/user" element={<UserIndex />} />
                        <Route path="/user/create" element={<UserCreate />} />
                        <Route path="/user/edit/:id" element={<UserEdit />} />

                        <Route path="/duration" element={<DurationIndex />} />
                        <Route path="/duration/create" element={<DurationCreate />} />
                        <Route path="/duration/edit/:id" element={<DurationEdit />} />

                        <Route path="/customer" element={<CustomerIndex />} />
                        <Route path="/customer/create" element={<CustomerCreate />} />
                        <Route path="/customer/:id" element={<CustomerShow />} />

                        <Route path="/*" element={<NotFound />} />
                    </Route>

                    <Route element={<PublicRoutes/>}>
                        <Route path="/" element={<Login />} />
                    </Route>
                </Routes>
            </Layout>
        </>
    )
}

export default App