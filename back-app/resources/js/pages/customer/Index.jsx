import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";

const Index = () => {
    const [customer, setCustomer] = useState([])
    let number = 1

    const fetchCustomer = async () => {
        await axios.get(`http://127.0.0.1:8000/api/customer`).then(({data}) => {
            setCustomer(data)
        })
    }

    useEffect(() => {
        fetchCustomer()
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

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/customer/${id}`).then(({data}) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchCustomer()
        }).catch(({err}) => {
            console.log(err)
        })
    }

    return (
        <>
            <h3 className="main_tit">รายชื่อลูกค้า</h3>
            <div className="card_tbl">
                <div className="card_tbl_header">
                    <div className="btn_wrap mb-[10px]">
                        <Link to="/customer/create" className="btn btn_save">
                            <span>เพิ่มลูกค้าใหม่</span>
                        </Link>
                    </div>
                </div>
                <div className="card_tbl_body">
                    <div className="tbl_scroll">
                        <table className="tbl">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ชื่อลูกค้า</th>
                                    <th>ลูกค้าโทร</th>
                                    <th>เครดิต</th>
                                    <th>ข้อมูลอื่น ๆ</th>
                                    <th>ลายเซ็น</th>
                                    <th>ตัวเลือก</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    customer && customer.length > 0 && (
                                        customer.map((row, i) => (
                                            <tr key={i}>
                                                <td>{number++}</td>
                                                <td>{row.name}</td>
                                                <td>{row.tel}</td>
                                                <td>{row.credit}</td>
                                                <td>
                                                    {
                                                        row.status === 'complete' ?
                                                        <span className="status_green">กรอกข้อมูลแล้ว</span>
                                                        :
                                                        <span className="status_red">ไม่สมบูรณ์</span>
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        row.sign_status === '1' ?
                                                        <span className="status_green">เซ็นชื่อเรียบร้อยแล้วค่ะ</span>
                                                        :
                                                        <span className="status_red">ยังไม่ได้เซ็นชื่อค่ะ</span>
                                                    }
                                                </td>
                                                <td>
                                                    <div className="btn_action">
                                                        <Link to={`/customer/edit/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                                                        <Link to="" className="btn_change"><AiOutlineLock/></Link>
                                                        <Link to={`/customer/${row.id}`} className="btn_show"><BiShowAlt/></Link>
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
        </>
    )
}

export default Index
