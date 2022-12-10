import React, { useState, useEffect } from 'react';
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const index = () => {
    const [agreement, setAgreement] = useState()
    let number = 1
    
    const fetchAgreement = async () => {
        await axios.get(`http://127.0.0.1:8000/api/agreement`).then(({data}) => {
            setAgreement(data)
        })
    } 

    useEffect(() => {
        fetchAgreement()
    }, [])

    const handleDelete = async (id) => {
        const isConfirm = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            return result.isConfirmed
        })

        if(!isConfirm){
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/agreement/${id}`).then(({data}) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchAgreement()
        }).catch(({err}) => {
            console.log(err)
        })

    }

    return (
        <>
           <Layout>
            <h3 className="main_tit">ข้อตกลงกู้เงิน</h3>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/agreement/create" className="btn btn_save">
                                <span>ส้างใหม่</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <div className="tbl_scroll">
                            <table className="tbl">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Description</th>
                                        <th>สถานะ</th>
                                        <th>ตัวเลือก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        agreement && agreement.length > 0 && (
                                            agreement.map((row, i) => (
                                              <tr key={i}>  
                                                <td>{number++}</td>
                                                <td>{row.description}</td>
                                                <td>
                                                    {
                                                        row.status === '1' ?
                                                        <span className="status_green">ใช้งาน</span>
                                                        :
                                                        <span className="status_red">ปิดการใช้งาน</span>
                                                    }
                                                </td>
                                                <td>
                                                    <div className="btn_action">
                                                        <Link to={`/agreement/edit/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                                                        <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete/></button>
                                                    </div>
                                                </td>
                                              </tr>  
                                            ))
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>  
        </>
    );
};

export default index;