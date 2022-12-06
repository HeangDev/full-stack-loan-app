import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import http from '../services/api';

const Login = () => {
    
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    return (
        <>
            <div className="login_wrap">
                <div className="login_card">
                    <div className="login_logo">
                        <span className="logo_tit">กู้เงิน</span>
                    </div>
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(() => {
                            axios.get('/sanctum/csrf-cookie').then(response => {
                                const formData = new FormData()

                                formData.append('username', username)
                                formData.append('password', password)

                                http.post('api/admin/login', formData).then(({data}) => {
                                    // console.log(data)
                                    localStorage.setItem('auth_token', data.token)
                                    localStorage.setItem('is_login', true)
                                    navigate('/dashboard')
                                }).catch(({err}) => {
                                    console.log(err)
                                })
                            });
                        })}>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label><span>ชื่อผู้ใช้</span></label>
                                <input
                                    type="text"
                                    autoFocus
                                    {...register("username", { required: 'ต้องระบุชื่อผู้ใช้' })}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                />
                                <span className="msg_error">{errors.username?.message}</span>
                            </div>
                            <div className="frm_grp required">
                                <label><span>รหัสผ่าน</span></label>
                                <input
                                    type="password"
                                    {...register("password", { required: 'ต้องการรหัสผ่าน' })}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                />
                                <span className="msg_error">{errors.password?.message}</span>
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
