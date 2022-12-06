import React from 'react'
import Layout from '../layout/Layout';
import Card from '../components/Card'
import { AiOutlineTeam } from "react-icons/ai";
import { AiFillCreditCard } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";

const Dashboard = () => {
    return (
        <>
            <Layout>
                <h3 className="main_tit">หน้าแรก</h3>
                <div className="main_card_wrap">
                    <Card
                        number="8,282"
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
                        number="282"
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