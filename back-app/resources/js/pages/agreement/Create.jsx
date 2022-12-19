import React, { useState } from 'react';
import Layout from '../../layout/Layout';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


const Create = () => {
    const [description, setDescription] = useState('')
    const navigate = useNavigate()
    const handleChange = (e, editor) => {
        const data = editor.getData()
        setDescription(data)
        console.log(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('description', description)

        axios.post(`http://127.0.0.1:8000/api/agreement`, formData).then(({data}) => {
            console.log(data)
            navigate("/agreement")
            Swal.fire({
                title: 'Success!',
                text: "สร้างสำเร็จ...!!",
                icon: "success",
                timer: '1500'
            })
            setDescription('')
        }).catch(({err}) => {
            console.log(err)
        })
    }
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
                        <form autoComplete="off">
                            <div>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data={description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="btn_wrap mt-3">
                                <button type="button" className="btn btn_save" onClick={handleSubmit}>
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