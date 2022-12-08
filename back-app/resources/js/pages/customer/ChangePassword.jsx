import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ChangePassword = () => {
    const { register, handleSubmit, watch, formState: {errors} } = useForm();
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState()
    const { id } = useParams()
    const npassword = watch('newPassword')
    const navigate = useNavigate()
    const [isRevealPwd, setIsRevealPwd] = useState(false)

    const fetchCustomer = async () => {
        await axios.get(`http://127.0.0.1:8000/api/customer/${id}`).then(({data}) => {
            setOldPassword(data.plain_password)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchCustomer()
    }, [])

    const generatePassword = () => {
        // Create a random password
        const randomPassword = Math.random().toString(36).slice(-4) + Math.random().toString(36).slice(-4)

        // Set the generated password as state
        setNewPassword(randomPassword)

        // Copy the password to the clipboard
        navigator.clipboard.writeText(randomPassword)
    }
    return (
        <>
            <Layout>
                <h3 className="main_tit">เปลี่ยนรหัสผ่าน</h3>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/customer" className="btn btn_back">
                                <span>กลับ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(() => {
                                const formData = new FormData()
                                formData.append('id', id)
                                formData.append('oldPassword', oldPassword)
                                formData.append('newPassword', newPassword)
                                axios.post(`http://127.0.0.1:8000/api/customer/changepassword`, formData).then((data) => {
                                    navigate('/customer')
                                }).catch(({err}) => {
                                    console.log(err)
                                })
                            })}>
                            <div className="frm_wrap">
                                <div className="frm_grp">
                                    <label>รหัสผ่านเก่า</label>
                                    <input type="password" placeholder="" value={oldPassword} onChange={e => setOldPassword(e.target.value)}/>
                                </div>
                                <div className="frm_grp required">
                                    <div className="frm_lbl">
                                        <label>รหัสผ่านใหม่</label>
                                        <span className="btn_generate" onClick={generatePassword}>สร้างรหัสผ่านอัตโนมัติ</span>
                                    </div>
                                    <div className="input_grp">
                                        <input
                                            {...register("newPassword",{
                                                required: "ต้องใช้รหัสผ่านใหม่",
                                                minLength:{
                                                    value:6,
                                                    message:'กรุณาตั้งรหัสผ่าน 6-16 หลัก'
                                                },
                                            })}
                                            type={isRevealPwd ? "text" : "password"} placeholder="กรุณาตั้งรหัสผ่าน 6-16 หลัก" name="newPassword" value={newPassword}
                                            onChange={e => setNewPassword(e.target.value)}
                                        />
                                        <span className="input_text" onClick={() => setIsRevealPwd(prevState => !prevState)}>{isRevealPwd ? <AiOutlineEye/> : <AiOutlineEyeInvisible/>}</span>
                                    </div>
                                    {errors.newPassword && <span className="msg_error">{errors.newPassword?.message}</span>}
                                </div>
                                <div className="frm_grp required">
                                    <label>ยืนยันรหัสผ่านใหม่</label>
                                    <input
                                        {...register("confirmPassword",{
                                            required: "ต้องยืนยันรหัสผ่าน.",
                                            validate: (value) =>
                                                value === npassword || "รหัสผ่านใหม่ของคุณไม่ตรงกัน.",
                                        })}
                                        type="password" placeholder="ยืนยันรหัสผ่านใหม่" name="confirmPassword"
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {errors.confirmPassword && <span className="msg_error">{errors.confirmPassword?.message}</span>}
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

export default ChangePassword
