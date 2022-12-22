import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'


const EditWithdraw = () => {
    const navigate = useNavigate()
    const [ withdrawamount, setWithdrawAmount] = useState('')
    const [ withdrawstatus, setWithdrawStatus] = useState('')
    const [ idwithdraw, setIdWithdraw ] = useState('')
    const { id } = useParams()

    const fetchEditWithdraw = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getwithdrawbyid/${id}`).then(({data}) => {
            console.log( data )
            const { withdraw_amount, w_status } = data
            setWithdrawAmount(withdraw_amount)
            setWithdrawStatus(w_status)
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

        axios.post(`http://127.0.0.1:8000/api/withdraw/${id}`, formData).then(({data}) => {
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
        fetchEditWithdraw()
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