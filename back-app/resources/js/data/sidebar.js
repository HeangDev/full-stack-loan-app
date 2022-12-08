import {
    AiOutlineDashboard,
    AiOutlineFieldTime,
    AiOutlineUser,
    AiOutlineMoneyCollect,
    AiOutlineUserAdd,
} from "react-icons/ai";

import {MdOutlineEditNote} from 'react-icons/md'

export const sidebar = [
    { id: 1, name: 'หน้าแรก', icon: AiOutlineDashboard, url: '/dashboard'},
    { id: 2, name: 'ระยะเวลา', icon: AiOutlineFieldTime, url: '/duration'},
    { id: 3, name: 'ลูกค้า', icon: AiOutlineUser, url: '/customer'},
    { id: 4, name: 'เงินฝาก', icon: AiOutlineMoneyCollect, url: '/deposit'},
    { id: 5, name: 'ผู้ดูแล่', icon: AiOutlineUserAdd, url: '/user'},
    { id: 6, name: 'ข้อตกลงกู้เงิน', icon: MdOutlineEditNote, url: '/agreement'},
]