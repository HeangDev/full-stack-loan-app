import React from 'react'
import { BiMenuAltLeft } from "react-icons/bi";
import { Link } from 'react-router-dom'
import Avatar from '../assets/avatar.jpg'
import { dropmenu } from '../data/dropmenu';
import { Menu, Transition } from '@headlessui/react'

const Header = () => {
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
                                                        <Link to={item.url}>
                                                            <item.icon/>
                                                            <span>{item.name}</span>
                                                        </Link>
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
