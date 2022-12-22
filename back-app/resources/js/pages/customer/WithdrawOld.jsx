import React, { useState, useEffect, Fragment } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from "react-router-dom";
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react'

const Withdraw = () => {
    const [withdraw, setWithdraw] = useState()

    const { id } = useParams();

    const fetchWithdraw = async () => {
        await axios.get(`http://127.0.0.1:8000/api/withdraw/${id}`).then(({ data }) => {
            setWithdraw(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }

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

        await axios.delete(`http://127.0.0.1:8000/api/withdraw/${id}`).then(({data}) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchDeposit()
        }).catch(({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchWithdraw()
    }, [])

    const columns = [
        {
            name: "จำนวนเงิน",
            selector: (row) => 
            row.withdraw_amount === '' || row.withdraw_amount === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.withdraw_amount}</>,
            sortable: true,
        },
        {
            name: "ลักษณะ",
            selector: (row) => 
            row.status === '' || row.status === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.status}</>,
            sortable: true,
        },
        {
            name: "วันที",
            selector: (row) => 
            row.withdraw_date === '' || row.withdraw_date === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.withdraw_date}</>,
            sortable: true,
        },
        {
            name: "ตัวเลือก",
            cell: (row) => [
                <button type="button" onClick={() => handleEdit(row.id)} className="btn_edit"><AiOutlineEdit/></button>,
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
                            <Link to="/customer" className="btn btn_back">
                                <span>กลับ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <div className="tbl_scroll">
                            <DataTable
                                columns={columns}
                                data={withdraw}
                                pagination
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Withdraw