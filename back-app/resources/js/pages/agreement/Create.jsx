import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Create = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [description, setDescription] = useState('')

    return (
        <>
            <Layout>
                <h3 className="main_tit">สร้างข้อตกลงใหม่</h3>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/agreement" className="btn btn_back">
                                <span>กลับ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <form
                            autoComplete="off"
                            onSubmit={handleSubmit(() => {
                                const formData = new FormData()

                                formData.append('description', description)
                                

                                axios.post(`http://127.0.0.1:8000/api/agreement`, formData).then(({data}) => {
                                    console.log(data)
                                    Swal.fire({
                                        title: 'Success!',
                                        text: "User has been inserted!",
                                        icon: "success",
                                        timer: '1500'
                                    })
                                    setDescription('')
                                }).catch(({err}) => {
                                    console.log(err)
                                })
                            })}>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label htmlFor="description">คำอธิบาย</label>
                                    <textarea col="5"
                                        {...register("description", { required: 'กรุณาระบุรายละเอียด.' })}
                                        type="text" placeholder="กรุณาระบุรายละเอียด" id="description" value={description}
                                        onChange={(e) => {setDescription(e.target.value)}}
                                    />
                                    {errors.description && <span className="msg_error">{errors.description?.message}</span>}
                                    
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
};

export default Create;