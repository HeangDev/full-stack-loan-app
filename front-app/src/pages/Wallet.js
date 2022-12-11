import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Other_03 from "../assets/other_03.jpg";
import Safe_icon from '../assets/safe-icon.png'

const Wallet = () => {
    const [checkCode, setCheckCode] = useState()
    const [withdrawCode, setWithdrawCode] = useState()
    const id = localStorage.getItem('auth_id')

    const fetchDeposit = async () => {
        await axios.get(`http://127.0.0.1:8000/api/deposit/${id}`).then(({data}) => {
            const { withdraw_code } = data
            setCheckCode(withdraw_code)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    const handleWithdraw = async (e) => {
        if (withdrawCode == '' || withdrawCode == null) {
            toast.warn('กรุณากรอกรหัสถอนเงินของคุณ', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (withdrawCode != checkCode) {
            toast.warn('รหัสถอนเงินของคุณไม่ถูกต้อง', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            console.log('success')
        }
    }

    useEffect(() => {
        fetchDeposit()
    }, [])

    return (
        <>
            <ToastContainer />
            <div className="banner">
                <img src={Other_03} alt="" />
            </div>
            <div className="windraw_wrap">
                <div className="head_windraw">
                    <div className="left">
                        <h4 className="tit">จำนวนเงินที่ดำเนินการถอน (บาท)</h4>
                        <h3 className="des">0.00</h3>
                    </div>
                    <div className="right">
                        <h4 className="tit">จำนวนเงินสด (บาท)</h4>
                        <h3 className="des">0.00</h3>
                    </div>
                </div>

                <div>
                <div className="px-8">
                    <div className="frm_wrap border">
                        <div className="frm_grp">
                            <input type="number" placeholder="ครุณาใส่รหัสถอนด้วยค่ะ" onChange={e => setWithdrawCode(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center w-[100%]">
                    <button className="btn_b50" onClick={handleWithdraw}>ถอน</button>
                    <button className="btn_b50">ยกเลิก</button>
                </div>
                </div>
                <div className="windraw_des">
                    <p className="tit_note">สถานะการกู้:</p>
                    <p>คำเตือน:<br /></p>
                    <p className="txt_note">
                        <img src={Safe_icon} /> 
                        <span>โปรดติดต่อฝ่ายบริการลูกค้าออนไลน์เพื่อขอรับรหัสถอนความปลอดภัยของเงินในบัญชีได้รับการประกันโดยธนาคาร</span>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Wallet;
