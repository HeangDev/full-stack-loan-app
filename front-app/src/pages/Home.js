import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Banner from '../assets/banner.jpg'
import Other_01 from '../assets/other_01.jpg'
import Other_02 from '../assets/other_02.jpg'
import UserLoan from '../components/UserLoan'
import InputRange from 'react-input-range'
import 'react-input-range/lib/css/index.css'
import IconMinus from '../assets/icon/ic_minus.png'
import IconPlus from '../assets/icon/ic_plus.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { currencyFormat } from '../utils/Formatter'
import axios from 'axios'
import Agreement from '../components/Agreement'

const Home = () => {
    const [checked, setChecked] = useState(false);
    const [amount, setAmount] = useState(50000)
    const [month, setMonth] = useState(12)
    const [percent, setPercent] = useState(1.2)
    const [durations, setDurations] = useState([])
    const [interest, setInterest] = useState()
    const [totalAmount, setTotalAmount] = useState()
    const [active, setActive] = useState(1)
    const navigate = useNavigate()
    const checkedRef = useRef(null)
    const amountRef = useRef(50000)

    const handleChange = () => {
        setChecked(!checked);
    };

    const minusAmount = () => {
        const currentAmount = amount
        if (currentAmount >= 5000) {
            setAmount(currentAmount - 1000)
            const totalInterest = currentAmount * (percent / 100)
            const totalAmount = currentAmount + totalInterest
            const totalPayMonthly = totalAmount / month

            setInterest(currencyFormat(totalInterest))
            setTotalAmount(currencyFormat(totalPayMonthly))
        } else {
            toast.warn('คุณไม่สามารถน้อยกว่า จำนวนเงิน ที่น้อย ที่สุด', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        
    }

    const plusAmount = () => {
        const currentAmount = amount
        if (currentAmount <= 1000000) {
            setAmount(currentAmount + 1000)
            const totalInterest = currentAmount * (percent / 100)
            const totalAmount = currentAmount + totalInterest
            const totalPayMonthly = totalAmount / month

            setInterest(currencyFormat(totalInterest))
            setTotalAmount(currencyFormat(totalPayMonthly))
        } else {
            toast.warn('ไม่สามารถอยู่เหนือจำนวนเงิน ที่มาก ที่สุดได้', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const selectMonth = (id, month, percent) => {
        setMonth(month)
        setPercent(percent)

        const totalInterest = amount * (percent / 100)
        const totalAmount = amount + totalInterest
        const totalPayMonthly = totalAmount / month

        setPercent(percent)
        setInterest(currencyFormat(totalInterest))
        setTotalAmount(currencyFormat(totalPayMonthly))
        setActive(id)
    }

    const fetchDuration = async () => {
        await axios.get(`http://127.0.0.1:8000/api/duration`).then(({data}) => {
            setMonth(data[0].month)
            setPercent(data[0].percent)
            setDurations(data)
            
            const totalInterest = amount * (data[0].percent / 100)
            const totalAmount = amount + totalInterest
            const totalPayMonthly = totalAmount / data[0].month

            setInterest(currencyFormat(totalInterest))
            setTotalAmount(currencyFormat(totalPayMonthly))
        })
    }

    const updateAmount = (value) => {
        setAmount(value)
        setActive(1)

        const totalInterest = value * (percent / 100)
        const totalAmount = value + totalInterest
        const totalPayMonthly = totalAmount / month

        setInterest(currencyFormat(totalInterest))
        setTotalAmount(currencyFormat(totalPayMonthly))
    }

    useEffect(() => {
        fetchDuration()
    }, [])

    const handleBorrow = async (e) => {
        const id_user = localStorage.getItem('auth_id')
        await axios.get(`http://127.0.0.1:8000/api/user/${id_user}`).then(({data}) => {
            const status = data.status
            if (!localStorage.getItem('auth_token')) {
                navigate('/login')
            } else if (status == 'incomplete') {
                toast.warn('โปรดกรอกข้อมูลให้ครบค่ะ', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if (!checkedRef.current.checked) {
                toast.warn('โปรคลิกเห็นด้วยเพื่อยืนยันว่าคุณได้ตกลงที่จะกู้เงิน', {
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
        })
        
    }

    return (
        <>
            <ToastContainer />
            <div className="banner">
                <img src={Banner} alt=""/>
            </div>
            <div className="content">
                <div className="amount_warp">
                    <div className="amount_tit">จำนวนเงินที่ขอสินเชื่อ (ไทย/บาท)</div>
                    <div className="new_amount">{currencyFormat(amount)}</div>
                    <div className="amount_slide">
                        <span className="ic_minus" onClick={minusAmount}>
                            <img src={IconMinus} alt=""/>
                        </span>
                        <InputRange
                            minValue={50000}
                            maxValue={1000000}
                            step={1000}
                            value={amount}
                            onChange={value => updateAmount(value)}
                        />
                        <span className="ic_plus" onClick={plusAmount}>
                            <img src={IconPlus} alt=""/>
                        </span>
                    </div>
                </div>
                <div className="duration_wrap">
                    <h3>ระยะเวลาการกู้ยืม</h3>
                    <div className="duration">
                        {
                            durations && durations.length > 0 && (
                                durations.map((item, i) => {
                                    return (
                                        <button id={item.month} className={active === item.id ? 'btn_duration active': 'btn_duration'} key={i} onClick={() => selectMonth(item.id, item.month, item.percent)}>
                                            <span className="duration_value">{item.month}</span>
                                            เดือน
                                        </button>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
                <div className="total_wrap">
                    <h3 className="total_text">ผ่อนต่องวด</h3>
                    <div className="total_loan">
                        <span className="monthly_pay">{totalAmount}</span> ฿
                        <span className="total_sub">
                            (ด้วยอัตราดอกเบี้ย
                            <span> {percent}</span>%
                            <span> {interest}</span> ฿)
                        </span>
                    </div>
                </div>
                <div className="agr_wrap">
                    <div className="chkBx_control">
						<label>
                            <input type="checkbox" ref={checkedRef} onChange={handleChange}/><i></i>
                            <span className="agre">
                                เห็นด้วย
                                <span className="txt_link">《ข้อตกลงการใช้บริการผู้ใช้》</span>
                            </span>
						</label>
					</div>
                </div>
                <div className="btn_wrap">
                    <button className="btn_b40" onClick={(e) => handleBorrow()}>สมัครทันที</button>
                </div>
                <>
                    <UserLoan/>
                </>
                <div className="other"><img src={Other_01} alt=""/></div>
                <div className="other"><img src={Other_02} alt=""/></div>
            </div>
        </>
    )
}

export default Home
