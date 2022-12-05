import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const Edit = () => {
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate();
    const { id } = useParams()

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/admin/admin_user/${id}`).then(({data}) => {
            //console.log(data)
            const { name, username, status } = data
            setName(name)
            setUsername(username)
            setStatus(status)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const updateUser = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('name', name)
        formData.append('username', username)
        formData.append('status', status)

        axios.post(`http://127.0.0.1:8000/api/admin/admin_user/${id}`, formData).then(({data}) => {
            navigate("/admin/user")
        }).catch(({err}) => {
            console.log(err)
        })
    }
    return (
        <>
            <h3 className="main_tit">สร้างผู้ใช้</h3>
            <div className="card_tbl">
                <div className="card_tbl_header">
                    <div className="btn_wrap mb-[10px]">
                        <Link to="/user" className="btn btn_back">
                            <span>กลับ</span>
                        </Link>
                    </div>
                </div>
                <div className="card_tbl_body">
                    <form autoComplete="off" onSubmit={updateUser}>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label htmlFor="name">ชื่อ</label>
                                <input
                                    type="text" placeholder="ใส่ชื่อ" id="name"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                />
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="uname">ชื่อผู้ใช้</label>
                                <input
                                    type="text" placeholder="ป้อนชื่อผู้ใช้" id="uname"
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                />
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="status">สถานะ</label>
                                <select value={status} onChange={(e) => {setStatus(e.target.value)}}>
                                    <option value="active">Active</option>
                                    <option value="unactive">Unactive</option>
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
        </>
    )
}

export default Edit