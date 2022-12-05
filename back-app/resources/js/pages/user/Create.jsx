import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Create = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')
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
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(() => {
                            const formData = new FormData()

                            formData.append('name', name)
                            formData.append('username', username)
                            formData.append('password', password)

                            axios.post(`http://127.0.0.1:8000/api/admin/admin_user`, formData).then(({data}) => {
                                Swal.fire({
                                    title: 'Success!',
                                    text: "User has been inserted!",
                                    icon: "success",
                                    timer: '1500'
                                })
                                setName('')
                                setUsername('')
                                setpassword('')
                            }).catch(({err}) => {
                                console.log(err)
                            })
                        })}>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label htmlFor="name">ชื่อ</label>
                                <input
                                    {...register("name", { required: 'ต้องระบุชื่อ.' })}
                                    type="text" placeholder="ใส่ชื่อ" id="name"
                                    value={name}
                                    onChange={(e) => {setName(e.target.value)}}
                                />
                                {errors.name && <span className="msg_error">{errors.name?.message}</span>}
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="uname">ชื่อผู้ใช้</label>
                                <input
                                    {...register("username", { required: 'ต้องระบุชื่อผู้ใช้.' })}
                                    type="text" placeholder="ป้อนชื่อผู้ใช้" id="uname"
                                    value={username}
                                    onChange={(e) => {setUsername(e.target.value)}}
                                />
                                {errors.username && <span className="msg_error">{errors.username?.message}</span>}
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="password">รหัสผ่าน</label>
                                <input
                                    {...register("password", {
                                        required: 'ต้องการรหัสผ่าน.',
                                        minLength: {
                                            value: 6,
                                            message: "รหัสผ่านควรมีอย่างน้อย 6 ตัวอักษร."
                                        }
                                    })}
                                    type="password" placeholder="ใส่รหัสผ่าน" id="password"
                                    value={password}
                                    onChange={(e) => {setpassword(e.target.value)}}
                                />
                                {errors.password && <span className="msg_error">{errors.password?.message}</span>}
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

export default Create