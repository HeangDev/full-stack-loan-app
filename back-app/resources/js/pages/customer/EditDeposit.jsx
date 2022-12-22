import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const EditDeposit = () => {
    const navigate = useNavigate()
   
    const [deposit, setDeposit] = useState()

    const [depositAmount, setDepositAmount] = useState('')
    const [withdrawCode, setWithDrawCode] = useState('')
    const [description, setDescription] = useState('')
    const { id } = useParams()

    const fetchEditDeposit = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getdepositbyid/${id}`).then(({data}) => {
            console.log( data )
            const { deposit_amount, withdraw_code, description } = data
            setDepositAmount(deposit_amount);
            setWithDrawCode(withdraw_code);
            setDescription(description);
        }).catch (({ err }) => {
            console.log( err )
        })
    }

    const updateDeposit = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('withdrawCode', withdrawCode)
        formData.append('depositAmount', depositAmount)
        formData.append('description', description)

        axios.post(`http://127.0.0.1:8000/api/deposit/${id}`, formData).then(({data}) => {
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
        fetchEditDeposit()
    }, [])

  return (
    <>
    <Layout>
            <h5 className="main_tit">แก้ไขข้อเติมเงิน</h5>
            <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <button type='button' className="btn btn_back" onClick={() => navigate(-1)}>กลับ</button>
                            
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form autoComplete="off" onSubmit={updateDeposit}>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label htmlFor="description">รหัสถอน</label>
                                    <input
                                        type="text" placeholder="กรุณากรอกรหัสถอนเป็นตัวเลข" id="withdrawCode"
                                        value={withdrawCode}
                                        onChange={(e) =>{setWithDrawCode(e.target.value)}}
                                    />
                                </div>

                                <div className="frm_grp required">
                                    <label htmlFor="description">จำนวนเงิน</label>
                                    <input
                                        type="text" placeholder="กรุณากรอกจำนวนเงินตัวเลข" id="depositAmount"
                                        value={depositAmount}
                                        onChange={(e) =>{setDepositAmount(e.target.value)}}
                                    />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="description">ลักษณะ:</label>
                                    <input
                                        type="text" placeholder="กรุณากรอกลักษณะ" id="description"
                                        value={description}
                                        onChange={(e) =>{setDescription(e.target.value)}}
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

export default EditDeposit