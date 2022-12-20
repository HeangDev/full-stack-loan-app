import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const EditWithdraw = () => {
    const navigate = useNavigate()
   
    const [durationId, setDurationId] = useState('')
    const [amount, setAmount] = useState('')
    const [interest, setInerest] = useState('')
    const [total, setTotal] = useState('')
    const [payMonthly, setpayMonthly] = useState('')
    const [status, setStatus] = useState('')
    const { id } = useParams()

    const fetchEditLoan = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getloanbyid/${id}`).then(({data}) => {
            console.log( data )
            const { id_duration, amount, interest, total, pay_month, status } = data
            setDurationId(id_duration)
            setAmount(amount)
            setInerest(interest)
            setTotal(total)
            setpayMonthly(pay_month)
            setStatus(status)
        }).catch (({ err }) => {
            console.log( err )
        })
    }

    const updateWithdraw = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('withdrawamount', withdrawamount)
        formData.append('withdrawstatus', withdrawstatus)

        axios.post(`http://127.0.0.1:8000/api/loan/${id}`, formData).then(({data}) => {
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
    }, [])

  return (
    <>
    <Layout>
            <h5 className="main_tit">แก้ไขข้อตกลงกู้เงิน</h5>
            <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <button type='button' className="btn btn_back" onClick={() => navigate(-1)}>กลับ</button>
                            
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form autoComplete="off" onSubmit={updateWithdraw}>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label htmlFor="description">เดือน</label>
                                    <input
                                        type="text" placeholder="กรุณากรอกเดือนเป็นตัวเลข" id="description"
                                        value={withdrawamount}
                                        onChange={(e) =>{setWithdrawAmount(e.target.value)}}
                                    />
                                </div>

                                <div className="frm_grp required">
                                    <label htmlFor="description">สถานะ</label>
                                    <input
                                        type="text" placeholder="กรุณากรอกเดือนเป็นตัวเลข" id="description"
                                        value={withdrawstatus}
                                        onChange={(e) =>{setWithdrawStatus(e.target.value)}}
                                    />
                                </div>
                               
                                
                            </div>
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

export default EditWithdraw