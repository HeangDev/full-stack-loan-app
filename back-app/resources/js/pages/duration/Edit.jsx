import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const [month, setMonth] = useState('')
    const [percent, setPercent] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate();
    const { id } = useParams()

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/duration/${id}`).then(({data}) => {
            const { month, percent, status } = data
            setMonth(month)
            setPercent(percent)
            setStatus(status)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const updateDuration = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('month', month)
        formData.append('percent', percent)
        formData.append('status', status)

        axios.post(`http://127.0.0.1:8000/api/duration/${id}`, formData).then(({data}) => {
            navigate("/duration")
        }).catch(({err}) => {
            console.log(err)
        })
    }
    return (
        <>
            <Layout>
                <h5 className="main_tit">อัปเดตระยะเวลา</h5>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/duration" className="btn btn_back">
                                <span>กลับ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form autoComplete="off" onSubmit={updateDuration}>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label htmlFor="month">เดือน</label>
                                    <input
                                        type="number" placeholder="กรุณากรอกเดือนเป็นตัวเลข" id="month"
                                        value={month}
                                        onChange={(e) => {setMonth(e.target.value)}}
                                    />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="percent">เปอร์เซ็นต์</label>
                                    <input
                                        type="text" placeholder="กรุณาใส่เปอร์เซ็นต์" id="percent"
                                        value={percent}
                                        onChange={(e) => {setPercent(e.target.value)}}
                                    />
                                </div>
                                <div className="frm_grp required">
                                    <label htmlFor="status">สถานะ</label>
                                    <select value={status} onChange={(e) => {setStatus(e.target.value)}}>
                                        <option value="active">ใช้งาน</option>
                                        <option value="unactive">ปิดการใช้งาน</option>
                                    </select>
                                </div>
                            </div>
                            <div className="btn_wrap mt-3">
                                <button type="submit" className="btn btn_save">
                                    <span>ประหยัด</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Edit