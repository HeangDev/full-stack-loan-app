import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Other_03 from '../assets/other_03.jpg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineUser, AiOutlineLock } from "react-icons/ai";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://127.0.0.1:8000";

const Login = () => {
    const [tel, setTel] = useState('')
    const [password, setPassword] = useState('')
    const [isRevealPwd, setIsRevealPwd] = useState(false)
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()
        if (tel === '') {
            toast.warn('ต้องระบุหมายเลขโทรศัพท์', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (password === '') {
            toast.warn('ต้องการรหัสผ่าน', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else {
            axios.get('/sanctum/csrf-cookie').then(response => {
                //console.log(response);
                const formData = new FormData()

                formData.append('tel', tel)
                formData.append('password', password)

                axios.post('/api/login', formData).then(({data}) => {
                    //console.log(data)
                    localStorage.setItem('auth_id', data.id)
                    localStorage.setItem('auth_token', data.token)
                    navigate('/')
                }).catch(({err}) => {
                    console.log(err)
                })
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <Header url="/" title="เข้าสู่ระบบ"/>
            <div className="banner pt-[44px]">
                <img src={Other_03} alt=""/>
            </div>
            <form autoComplete="off" onSubmit={handleLogin}>
                <div className="frm_wrap">
                    <div className="frm_grp">
                        <label style={{width: '40px'}}>
                            <span className="icon"><AiOutlineUser/></span>
                        </label>
                        <input type="text" placeholder="กรุณาใส่หมายเลขโทรศัพท์" autoFocus onChange={e => setTel(e.target.value)}/>
                    </div>
                    <div className="frm_grp">
                        <label style={{width: '40px'}}>
                            <span className="icon"><AiOutlineLock/></span>
                        </label>
                        <div className="frm_ic_grp">
                            <input type={isRevealPwd ? "text" : "password"} placeholder="กรุณาใส่รหัสผ่าน" onChange={e => setPassword(e.target.value)}/>
                            <span className="input_text" onClick={() => setIsRevealPwd(prevState => !prevState)}>{isRevealPwd ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
                        </div>
                    </div>
                </div>
                <div className="btn_wrap">
                    <button type="submit" className="btn_b40">เข้าสู่ระบบ</button>
                    <Link to="/register" className="btn_b40">ลงทะเบียน</Link>
                </div>
            </form>
        </>
    )
}

export default Login