import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Create = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [month, setMonth] = useState('')
    const [percent, setPercent] = useState('')
    return (
        <>
            <h3 className="main_tit">สร้างระยะเวลา</h3>
            <div className="card_tbl">
                <div className="card_tbl_header">
                    <div className="btn_wrap mb-[10px]">
                        <Link to="/duration" className="btn btn_back">
                            <span>กลับ</span>
                        </Link>
                    </div>
                </div>
                <div className="card_tbl_body">
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(() => {
                            const formData = new FormData()

                            formData.append('month', month)
                            formData.append('percent', percent)

                            axios.post(`http://127.0.0.1:8000/api/duration`, formData).then(({data}) => {
                                console.log(data)
                                Swal.fire({
                                    title: 'Success!',
                                    text: "User has been inserted!",
                                    icon: "success",
                                    timer: '1500'
                                })
                                setMonth('')
                                setPercent('')
                            }).catch(({err}) => {
                                console.log(err)
                            })
                        })}>
                        <div className="frm_wrap">
                            <div className="frm_grp required">
                                <label htmlFor="month">เดือน</label>
                                <input
                                    {...register("month", { required: 'จำเป็นต้องระบุเดือน.' })}
                                    type="number" placeholder="กรุณากรอกเดือนเป็นตัวเลข" id="month"
                                    onChange={(e) => {setMonth(e.target.value)}}
                                />
                                {errors.month && <span className="msg_error">{errors.month?.message}</span>}
                            </div>
                            <div className="frm_grp required">
                                <label htmlFor="percent">เปอร์เซ็นต์</label>
                                <input
                                    {...register("percent", { required: 'ต้องระบุเปอร์เซ็นต์.' })}
                                    type="text" placeholder="กรุณาใส่เปอร์เซ็นต์" id="percent"
                                    onChange={(e) => {setPercent(e.target.value)}}
                                />
                                {errors.percent && <span className="msg_error">{errors.percent?.message}</span>}
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