import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const EditLoan = () => {
    const navigate = useNavigate()
   
    const [durationId, setDurationId] = useState('')
    const [amount, setAmount] = useState('')
    const [interest, setInerest] = useState('')
    const [total, setTotal] = useState('')
    const [payMonthly, setpayMonthly] = useState('')
    const [status, setStatus] = useState('')
    const [idloan, setIdLoan] = useState('')
    const { id } = useParams()


    const [durationlist, setDurationList] = useState([{'month':'', 'id':''}])



    const fetchDuration = async () => {
        await axios.get(`http://127.0.0.1:8000/api/duration`).then(({data}) => {
            // console.log(data)
            setDurationList(data)
        }).catch (({ err }) => {
            console.log( err )
        })
    }

    


    const fetchEditLoan = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getloanbyid/${id}`).then(({data}) => {
            // console.log( data )
            const { id_duration, amount, interest, total, pay_month, status} = data
            setDurationId(id_duration)
            setAmount(amount)
            setInerest(interest)
            setTotal(total)
            setpayMonthly(pay_month)
            setStatus(status)
            setIdLoan(id)
        }).catch (({ err }) => {
            console.log( err )
        })
    }

    const updateLoan = async (e) => {
        e.preventDefault();
        const idloan = id
        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('durationId', durationId)
        formData.append('amount', amount)
        formData.append('interest', interest)
        formData.append('total', total)
        formData.append('payMonthly', payMonthly)
        formData.append('status', status)

        axios.post(`http://127.0.0.1:8000/api/loan/${id}`, formData).then(({data}) => {
            console.log( data )
            navigate(-1)
            Swal.fire({
                title: 'Success!',
                text: "แก้ไขข้อมูลสำเร็จ!",
                icon: "success",
                timer: '1500'
            })
        }).catch(({err}) => {
            console.log(err)
        })

    }

    useEffect(() => {
        fetchEditLoan()
        fetchDuration()
       
    }, [])

  return (
    <>
    <Layout>
            <h5 className="main_tit">แก้ไขข้อมูลเงินกู้</h5>
            <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <button type='button' className="btn btn_back" onClick={() => navigate(-1)}>กลับ</button>
                            
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form autoComplete="off" onSubmit={updateLoan}>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label htmlFor="description">เดือน</label>
                                    <select className="combobox" value={durationId} onChange={e => setDurationId(e.target.value)}>
                                        <option>เดื่อน</option>
                                        {durationlist.map( item => (
                                            <option value={item.id} key={item.id}>{item.month}</option>

                                            ))
                                            
                                        }
                                    </select>
                                </div>

                                <div className="frm_grp required">
                                    <label htmlFor="description">จำนวนเงินกู้</label>
                                    <input type="text" id="description" value={amount} onChange={e => setAmount(e.target.value)} />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="description">ดอกเบี้ย</label>
                                    <input type="text" id="description" value={interest} onChange={e => setInerest(e.target.value)} />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="description">เงินกู้รวมดอกเบี้ย</label>
                                    <input type="text" id="description" value={total} onChange={e => setInerest(e.target.value)} />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="description">อัตราจ่ายต่อเดือน</label>
                                    <input type="text" id="description" value={payMonthly} onChange={e => setpayMonthly(e.target.value)} />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="status">สถานะ</label>
                                    <select value={status} id="status" onChange={e => setStatus(e.target.value)}>
                                        <option value="1">กู้เงินผ่าน</option>
                                        <option value="0">กู้เงินไม่ผ่าน</option>
                                    </select>
                                </div>
                            </div>
                            
                            
                            <input type="hidden" value={idloan} />
                            <div className="btn_wrap mt-3">
                                <button type="submit" className="btn btn_save">
                                    <span>ยืนยัน</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
    </Layout>
    </>
  )
}

export default EditLoan