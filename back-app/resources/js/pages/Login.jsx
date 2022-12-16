import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import http from '../services/api';
import Swal from 'sweetalert2'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        axios.get('/sanctum/csrf-cookie').then(response => {
            const formData = new FormData()
            formData.append('username', username)
            formData.append('password', password)

            if (username == '' || username == null) {
                Swal.fire({
                    title: 'คำเตือน!',
                    text: "ต้องระบุชื่อผู้ใช้!",
                    icon: "warning",
                    timer: '1500'
                })
            } else if (password == '' || password == null) {
                Swal.fire({
                    title: 'คำเตือน!',
                    text: "ต้องการรหัสผ่าน!",
                    icon: "warning",
                    timer: '1500'
                })
            } else {
                http.post('api/admin/login', formData).then(({data}) => {
                    localStorage.setItem('auth_token', data.token)
                    localStorage.setItem('auth_id', data.id)
                    localStorage.setItem('is_login', true)
                    navigate('/dashboard')
                }).catch(({err}) => {
                    console.log(err)
                })
            }
        });
    }
    return (
        <>
            <div className="login_wrap">
                <div className="login_card">
                    <div className="login_logo">
                        <span className="logo_tit">กู้เงิน</span>
                    </div>
                    <form autoComplete="off" onSubmit={handleLogin}>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label><span>ชื่อผู้ใช้</span></label>
                                <input type="text" autoFocus onChange={(e) => {setUsername(e.target.value)}}/>
                            </div>
                            <div className="frm_grp required">
                                <label><span>รหัสผ่าน</span></label>
                                <input type="password" onChange={(e) => {setPassword(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="btn_wrap mt-3">
                            <button type="submit" className="btn_b38">เข้าสู่ระบบ</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
