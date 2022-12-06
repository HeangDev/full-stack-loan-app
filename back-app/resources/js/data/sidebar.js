import {
    AiOutlineDashboard,
    AiOutlineFieldTime,
    AiOutlineUser,
    AiOutlineMoneyCollect,
    AiOutlineUserAdd
} from "react-icons/ai";

export const sidebar = [
    { id: 1, name: 'หน้าแรก', icon: AiOutlineDashboard, url: '/dashboard'},
    { id: 2, name: 'ระยะเวลา', icon: AiOutlineFieldTime, url: '/duration'},
    { id: 3, name: 'ลูกค้า', icon: AiOutlineUser, url: '/customer'},
    { id: 4, name: 'เงินฝาก', icon: AiOutlineMoneyCollect, url: '/deposit'},
    { id: 5, name: 'ผู้ใช้', icon: AiOutlineUserAdd, url: '/user'},
]