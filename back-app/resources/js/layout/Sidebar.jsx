import React from 'react'
import { sidebar } from '../data/sidebar'
import { Link, NavLink } from 'react-router-dom'

const Sidebar = () => {
    return (
        <>
            <div className="sidebar">
                <div className="side_logo">
                    <Link to="/dashboard"><h2 className="side_tit">โปรแกรมเงิน</h2></Link>
                </div>
                <nav className="side_nav">
                    {sidebar.map((item, index) => {
                        return (
                            <NavLink to={item.url} className={({ isActive }) => isActive ? "side_link active" : "side_link"} key={index}>
                                <item.icon/>
                                <span>{item.name}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
        </>
    )
}

export default Sidebar
