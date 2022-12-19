import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock, AiOutlineMoneyCollect } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";

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

    const columns = [
        {
            id: 'ชื่อลูกค้า',
            name: "ชื่อลูกค้า",
            selector: (row) => 
            row.name === '' || row.name === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.name}</>,
            sortable: true,
        },
        {
            id: "ลูกค้าโทร",
            name: "ลูกค้าโทร",
            selector: (row) => row.tel,
            sortable: true,
        },
        {
            id: "เครดิต",
            name: "เครดิต",
            selector: (row) => row.deposit_amount,
            sortable: true,
        },
        {
            id: "ข้อมูลอื่น ๆ",
            name: "ข้อมูลอื่น ๆ",
            selector: (row) =>
            row.status === 'complete' ?
            <span className="status_green">กรอกข้อมูลแล้ว</span>
            :
            <span className="status_red">ไม่สมบูรณ์</span>,
            sortable: true,
        },
        {
            id: "ลายเซ็น",
            name: "ลายเซ็น",
            selector: (row) =>
            row.sign_status === '1' ?
            <span className="status_green">เซ็นชื่อเรียบร้อยแล้วค่ะ</span>
            :
            <span className="status_red">ยังไม่ได้เซ็นชื่อค่ะ</span>,
            sortable: true,
        },
        {
            id: "สถานะการกู้",
            name: "สถานะการกู้",
            selector: (row) => <span className='status_orange'>{row.deposits_status}</span>,
        },
        {
            id: "รหัสถอน",
            name: "รหัสถอน",
            selector: (row) =>
            row.withdraw_code === '' ?
            <span className="status_red">ยังไม่มีรหัสถอนเงินค่ะ</span>
            :
            <span className="status_green">{row.withdraw_code}</span>,
            sortable: true,
        },
        {
            id: "ตัวเลือก",
            name: "ตัวเลือก",
            cell: (row) => [
                row.status == 'complete' ?
                    <Link to={`/customer/edit/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                    :
                    <Link to={`/customer/create/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>,
                
                    <Link to={`/customer/changepassword/${row.id}`} className="btn_change"><AiOutlineLock/></Link>,
                    <Link to={`/customer/${row.id}`} className="btn_show"><BiShowAlt/></Link>,
                    <Link to={`/customer/deposit/${row.id}`} className="btn_show"><MdOutlineAttachMoney/></Link>,
                    <Link to={`/customer/withdraw/${row.id}`} className="btn_show"><AiOutlineMoneyCollect/></Link>,
                    <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete/></button>
           ]
        },
    ]

    return (
        <>
            <Layout>
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
                            <DataTable
                                columns={columns}
                                data={customer}
                                pagination
                                fixedHeader
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Index
