import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ url, title }) => {
    return (
        <>
            <header className="bar bar_blue">
                <Link to={url} className="bar_action_back"></Link>
                <h1 className="bar_title">{title}</h1>
            </header>
        </>
    )
}

export default Header
