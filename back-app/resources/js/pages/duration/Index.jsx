import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";

const Index = () => {
    const [editIsOpen, setEditIsOpen] = useState(false)
    const [duration, setDuration] = useState()

    const fetchDuration = async () => {
        await axios.get(`http://127.0.0.1:8000/api/duration`).then(({ data }) => {
            setDuration(data)
        })
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

        await axios.delete(`http://127.0.0.1:8000/api/duration/${id}`).then(({ data }) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchDuration()
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchDuration()

        if (!$.fn.dataTable.isDataTable("#tblduration")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#tblduration").DataTable({
                        pageLength: 10,
                        processing: true,
                        destroy: true,
                        "language": {
                            "lengthMenu": "แสดง _MENU_ แถวต่อหน้า",
                            "zeroRecords": "ไม่พบอะไร - ขอโทษ",
                            "info": "กำลังแสดงหน้า _PAGE_ ของ _PAGES_",
                            "infoEmpty": "ไม่มีระเบียนที่มีอยู่",
                            "infoFiltered": "(filtered from _MAX_ total records)",
                            "search": "ค้นหา:",
                            "searchPlaceholder": "ข้อมูลการค้นหา",
                            "paginate": {
                                "previous": "หน้าก่อนหน้า",
                                "next": "หน้าต่อไป"
                            }
                        },

                        fnRowCallback: function (
                            nRow,
                            aData,
                            iDisplayIndex,
                            iDisplayIndexFull
                        ) {
                            var index = iDisplayIndexFull + 1;
                            $("td:first", nRow).html(index);
                            return nRow;
                        },

                        lengthMenu: [
                            [10, 20, 30, 50, -1],
                            [10, 20, 30, 50, "All"],
                        ],
                    });
                }, 1000);
            });
        }
    }, [])

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
                            <table className="table" id="tblduration">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เดือน</th>
                                        <th>เปอร์เซ็นต์</th>
                                        <th>สถานะ</th>
                                        <th>ตัวเลือก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        duration && duration.length > 0 && (
                                            duration.map((row, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{row.month}</td>
                                                    <td>{row.percent}</td>
                                                    <td>{row.status == 'active' ? <span className="status_green">ใช้งาน</span> : <span className="status_red">ปิดการใช้งาน</span>}</td>
                                                    <td>
                                                        <div className="btn_action">
                                                            <Link to={`/duration/edit/${row.id}`} className="btn_edit"><AiOutlineEdit /></Link>
                                                            <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete /></button>
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
    )
}

export default Index