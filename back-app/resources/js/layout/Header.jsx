import React, { useEffect } from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar.jpg'
import { dropmenu } from '../data/dropmenu';
import { Menu, Transition } from '@headlessui/react'
const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];

const Header = () => {
    let timer;

    const logout = () => {
        localStorage.clear();
        window.location.pathname = '/'
    }

    const resetTimer = () => {
        if (timer) clearTimeout(timer)
    }

    const handleTimer = () => {
        timer = setTimeout(() => {
            resetTimer()
            Object.values(events).forEach((item) => {
                window.removeEventListener(item, resetTimer)
            })
            logout()
        }, 600000)
    }

    useEffect(() => {
        Object.values(events).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer()
                handleTimer()
            })
        })
    }, [])
    return (
        <>
            <Menu as="div" className="header">
                {({ open }) => (
                    <>
                        <div className="left">
                            <button type="button">
                                <BiMenuAltLeft className="w-6 h-6 fill-gray-400"/>
                            </button>
                        </div>
                        <div className="right">
                            <div className="profile_avatar">
                                <Menu.Button className="profile_avatar_action">
                                    <img src={Avatar} alt="" />
                                </Menu.Button>
                                <Transition show={open}>
                                    <Menu.Items>
                                        <div className="drop_menu">
                                            {dropmenu.map(( item ) => {
                                                return (
                                                    <Menu.Item key={item.id}>
                                                        <button type="button" onClick={logout}>
                                                            <item.icon/>
                                                            <span>{item.name}</span>
                                                        </button>
                                                    </Menu.Item>
                                                )
                                            })}
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </div>
                        </div>
                    </>
                )}
            </Menu>
        </>
    )
}

export default Header
