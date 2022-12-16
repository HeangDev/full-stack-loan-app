import React, { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import Avatar from '../assets/avatar.jpg'
import { BsBell } from "react-icons/bs";
import { dropmenu } from '../data/dropmenu';
import { Menu, Transition } from '@headlessui/react'
import DropAvatar from '../assets/avatar.png'
import { sidebar } from '../data/sidebar'
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
const events = [
    "load",
    "mousemove",
    "mousedown",
    "click",
    "scroll",
    "keypress",
];

const Header = () => {
    const [loanNotification, setLoanNotification] = useState()
    const [mobile, setMobile] = useState(false)
    const [adminName, setAdminName] = useState()
    const id = localStorage.getItem('auth_id')
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

    const fetchAdminInfo = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getadmininfo/${id}`).then(({data}) => {
            setAdminName(data.name)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        Object.values(events).forEach((item) => {
            window.addEventListener(item, () => {
                resetTimer()
                handleTimer()
            })
        })
        Pusher.logToConsole = false;
    
        var pusher = new Pusher('a770b33bb7dc1e1664f0', {
          cluster: 'ap1'
        });
    
        var channel = pusher.subscribe('my-channel');
        channel.bind('borrow-money', function(data) {
            console.log(JSON.stringify(data))
            setLoanNotification(JSON.stringify(data))
        });
        fetchAdminInfo()
    }, [])
    return (
        <>
            <div className="header">
                <div className="left"></div>
                <div className="right">
                    {/* <Menu as="div" className="notification">
                        {({ open }) => (
                            <>
                                <Menu.Button className="notification_action">
                                    <BsBell className="w-[20px] h-[20px]"/>
                                </Menu.Button>
                                <Transition as="ul" show={open} className="notification_drop_menu">
                                    <li>
                                        <div className="title">
                                            การแจ้งเตือน
                                            <span className="status_light">3</span>
                                        </div>
                                        <div className="list">
                                            <div className="notification_content">
                                                <ul>
                                                    {
                                                        loanNotification && loanNotification.length > 0 && (
                                                            loanNotification.map((item, i) => {
                                                                return (
                                                                    <li className="notification_item notification_unread">
                                                                        <Link to="">
                                                                            <div className="image">
                                                                                <img src={DropAvatar} alt="" />
                                                                            </div>
                                                                            <div className="notification_info">
                                                                                <div className="text">
                                                                                    <span className="user_name">Jessica Caruso </span>
                                                                                    วงเงินกู้ 3,000 บาท นาน 12 เดือน ดอกเบี้ย 1.2%
                                                                                </div>
                                                                                <span className="date">2 นาทีที่แล้ว</span>
                                                                            </div>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            })
                                                        )
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="footer">
                                            <Link to="">ดูการแจ้งเตือนทั้งหมด</Link>
                                        </div>
                                    </li>
                                </Transition>
                            </>
                        )}
                    </Menu> */}
                    <Menu as="div" className="profile_avatar">
                        {({ open }) => (
                            <>
                                <Menu.Button className="profile_avatar_action">
                                    <img src={Avatar} alt="" />
                                </Menu.Button>
                                <Transition as="div" show={open} className="profile_drop_menu">
                                    <Menu.Items>
                                        <div className="profile_user">
                                            <div className="profile_name">{adminName}</div>
                                            <div className="profile_active online">ออนไลน์</div>
                                        </div>
                                        {dropmenu.map(( item ) => {
                                            return (
                                                <button onClick={logout}>
                                                    <item.icon/>
                                                    <span>{item.name}</span>
                                                </button>
                                            )
                                        })}
                                    </Menu.Items>
                                </Transition>
                            </>
                        )}
                    </Menu>
                </div>
            </div>
            <div className="sub_header">
                <button className="sub_header_wrap" onClick={() => setMobile(!mobile)}>{mobile ? <AiOutlineClose/> : <AiOutlineMenu/>}</button>
                <div className={mobile ? "sub_header_content open" : "sub_header_content"}>
                    <ul>
                        {sidebar.map((item, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={item.url} className={({ isActive }) => isActive ? "active" : ""}>
                                        <item.icon/>
                                        <span>{item.name}</span>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Header
