import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar.jpg'
import { BsBell } from "react-icons/bs";
import { dropmenu } from '../data/dropmenu';
import { Menu, Transition } from '@headlessui/react'
import DropAvatar from '../assets/avatar.png'
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
            <div className="header">
                <div className="left"></div>
                <div className="right">
                    <Menu as="div" className="notification">
                        {({ open }) => (
                            <>
                                <Menu.Button className="notification_action">
                                    <BsBell className="w-[20px] h-[20px]"/>
                                </Menu.Button>
                                <Transition show={open}>
                                    <ul className="notification_drop_menu">
                                        <li>
                                            <div className="title">
                                                การแจ้งเตือน
                                                <span className="status_light">3</span>
                                            </div>
                                            <div className="list">
                                                <div className="notification_content">
                                                    <ul>
                                                        <li className="notification_item notification_unread">
                                                            <Link to="">
                                                                <div className="image">
                                                                    <img src={DropAvatar} alt="" />
                                                                </div>
                                                                <div className="notification_info">
                                                                    <div className="text">
                                                                        <span className="user_name">Jessica Caruso </span>
                                                                        accepted your invitation to join the team.
                                                                    </div>
                                                                    <span className="date">2 นาทีที่แล้ว</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                        <li className="notification_item">
                                                            <Link to="">
                                                                <div className="image">
                                                                    <img src={DropAvatar} alt="" />
                                                                </div>
                                                                <div className="notification_info">
                                                                    <div className="text">
                                                                        <span className="user_name">Joel King </span>
                                                                        is now following you
                                                                    </div>
                                                                    <span className="date">2 วันที่ผ่านมา</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                        <li className="notification_item">
                                                            <Link to="">
                                                                <div className="image">
                                                                    <img src={DropAvatar} alt="" />
                                                                </div>
                                                                <div className="notification_info">
                                                                    <div className="text">
                                                                        <span className="user_name">John Doe </span>
                                                                        is watching your main repository
                                                                    </div>
                                                                    <span className="date">2 วันที่ผ่านมา</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="footer">
                                                <Link to="">ดูการแจ้งเตือนทั้งหมด</Link>
                                            </div>
                                        </li>
                                    </ul>
                                </Transition>
                            </>
                        )}
                    </Menu>
                    <Menu as="div" className="profile_avatar">
                        {({ open }) => (
                            <>
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
                            </>
                        )}
                    </Menu>
                </div>
            </div>
            <button className="sub_header"></button>
        </>
    )
}

export default Header
