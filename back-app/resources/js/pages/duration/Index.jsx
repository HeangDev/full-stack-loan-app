import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const Index = () => {
    const [duration, setDuration] = useState()

    const fetchDuration = async () => {
        await axios.get(`http://127.0.0.1:8000/api/duration`).then(({data}) => {
            setDuration(data)
        })
    }

    useEffect(() => {
        fetchDuration()
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

        await axios.delete(`http://127.0.0.1:8000/api/duration/${id}`).then(({data}) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchDuration()
        }).catch(({err}) => {
            console.log(err)
        })
    }

    const columns = [
        {
            name: 'เดือน',
            selector: (row) => row.month,
            sortable: true,
        },
        {
            name: 'เปอร์เซ็นต์',
            selector: (row) => row.percent,
            sortable: true,
        },
        {
            name: 'สถานะ',
            selector: (row) =>
            row.status === 'active' ?
            <span className="status_green">ใช้งาน</span>
            :
            <span className="status_red">ปิดการใช้งาน</span>,
            sortable: true,
        },
        {
            name: 'ตัวเลือก',
            selector: (row) => [
                <div className="btn_action">
                    <Link to={`/duration/edit/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                    <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete/></button>
                </div>
            ],
        },
    ]

    return (
        <>
            <Layout>
                <h3 className="main_tit">รายการระยะเวลา</h3>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/duration/create" className="btn btn_save">
                                <span>เพิ่มระยะเวลา</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <div className="tbl_scroll">
                            <DataTable
                                columns={columns}
                                data={duration}
                                pagination
                            />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Index