import React from 'react'
import Layout from '../layout/Layout';
import Card from '../components/Card'
import { AiOutlineTeam } from "react-icons/ai";
import { AiFillCreditCard } from "react-icons/ai";
import { AiFillDollarCircle } from "react-icons/ai";
import { AiOutlineUserAdd } from "react-icons/ai";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const labels = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

const options = {
    plugins: {
        legend: {
            position: "bottom",
        },
    },
};

export const data = {
    labels,
    datasets: [
        {
            label: "React",
            data: [32, 42, 51, 60, 51, 95, 100, 20, 10, 4, 50, 10],
            backgroundColor: "#2196F3",
            borderColor: "#2196F3",
        },
        {
            label: "Angular",
            data: [37, 42, 41, 37, 31, 44, 90, 20, 44, 87, 120, 20],
            backgroundColor: "#F44236",
            borderColor: "#F44236",
        },
    ],
  };

const Dashboard = () => {
    
    return (
        <>
            <Layout>
                <h3 className="main_tit">หน้าแรก</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="main_card_wrap grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        <Card
                            number="282"
                            title="ลูกค้าทั้งหมด"
                            icon={<AiFillDollarCircle className="icon" />}
                            bgcolor="bg-[#37bd5a]"
                        />
                    </div>
                    <div>
                        <div className="card">
                            <div className="card_body">
                                <h4 className="card_title"></h4>
                                <Line options={options} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Dashboard