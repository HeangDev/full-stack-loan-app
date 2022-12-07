import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

const Edit = () => {
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    const { id } = useParams()

    const fetchUser = async () =>{
        await axios.get(`http://127.0.0.1:8000/api/agreement/${id}`).then(({data}) => {
            const { description, status } = data
            setDescription(description)
            setStatus(status)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const updateAgreement = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('description', description)
        formData.append('status', status)
        
        axios.post(`http://127.0.0.1:8000/api/agreement/${id}`, formData).then(({data}) => {
            navigate("/agreement")
            Swal.fire({
                title: 'Success!',
                text: "แก้ไขข้อตกลงสำเร็จ!",
                icon: "success",
                timer: '1500'
            })
        }).catch(({err}) => {
            console.log(err)
        })
    }

    return (
        <>
        <Layout>
            <h5 className="main_tit">แก้ไขข้อตกลงกู้เงิน</h5>
            <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/agreement" className="btn btn_back">
                                <span>กลับ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form autoComplete="off" onSubmit={updateAgreement}>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label htmlFor="description">เดือน</label>
                                    <input
                                        type="text" placeholder="กรุณากรอกเดือนเป็นตัวเลข" id="description"
                                        value={description}
                                        onChange={(e) =>{setDescription(e.target.value)}}
                                    />
                                </div>
                               
                                <div className="frm_grp required">
                                    <label htmlFor="status">สถานะ</label>
                                    <select value={status} id="status" onChange={(e) => {setStatus(e.target.value)}}>
                                        <option value="1">ใช้งาน</option>
                                        <option value="0">ปิดการใช้งาน</option>
                                    </select>
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
    );
};

export default Edit;