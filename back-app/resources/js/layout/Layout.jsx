import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    const useAuth = () => {
        const token = localStorage.getItem('auth_token')
        if (token) {
            return true
        } else {
            return false
        }
    }
    const user = useAuth();
    return (
        <>
            <div className="wrap">
                <Sidebar/>
                <Header/>
                <div className="main">
                    <div className="content">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout
