import React, { useState, useEffect } from 'react'
import Layout from '../layout/Layout';
import Card from '../components/Card'
import axios from 'axios'
import { AiOutlineTeam } from "react-icons/ai";
import { AiFillCreditCard } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";

const Dashboard = () => {
    const [countCustomer, setCountCustomer] = useState()
    const [countAdmin, setCountAdmin] = useState()
    
    const handleCountCustomer = async () => {
        await axios.get(`http://127.0.0.1:8000/api/countcustomer`).then(({data}) => {
            setCountCustomer(data)
        })
    }

    const handleCountAdmin= async () => {
        await axios.get(`http://127.0.0.1:8000/api/countadminuser`).then(({data}) => {
            setCountAdmin(data)
        })
    }

    useEffect(() => {
        handleCountCustomer()
        handleCountAdmin()
    }, [])
    return (
        <>
            <Layout>
                <h3 className="main_tit">หน้าแรก</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Card
                        number={countAdmin === '0' ? 0 : countAdmin}
                        title="ผู้ใช้ทั้งหมด"
                        icon={<AiOutlineTeam className="icon" />}
                        bgcolor="bg-[#7b74ec]"
                    />
                    <Card
                        number="200,521"
                        title="จำนวนผู้ลงทะเบียน"
                        icon={<AiFillCreditCard className="icon" />}
                        bgcolor="bg-[#f58b40]"
                    />
                    <Card
                        number={countCustomer === '0' ? 0 : countCustomer}
                        title="ลูกค้าทั้งหมด"
                        icon={<AiOutlineUserAdd className="icon" />}
                        bgcolor="bg-[#37bd5a]"
                    />
                </div>
            </Layout>
        </>
    )
}

export default Dashboard