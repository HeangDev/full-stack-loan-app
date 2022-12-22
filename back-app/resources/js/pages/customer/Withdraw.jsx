import React, { useState, useEffect, Fragment } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react'
import { currencyFormat } from '../../utils/Formatter'


import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";


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
            title: 'คุณต้องการที่จะลบ หรือไหม ?',
            text: "ถ้าลบแล้ว คุณจะเปลี่ยนกลับไม่ได้ นะค่ะ!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ลบข้อมูล !',
            cancelButtonText: 'ยกเลิกการลบ !'
        }).then((result) => {
            return result.isConfirmed
        })

        if (!isConfirm) {
            return;
        }

        await axios.delete(`http://127.0.0.1:8000/api/withdraw/${id}`).then(({data}) => {
            Swal.fire({
                title: 'Success!',
                text: "ลบข้อมูลสำเร็จ !",
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

        if (!$.fn.dataTable.isDataTable("#tblwithdraw")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#tblwithdraw").DataTable({
                        pageLength: 10,
                        processing: true,
                        destroy: true,
                        "language": {
                            "lengthMenu": "แสดง _MENU_ แถวต่อหน้า",
                            "zeroRecords": "ขอโทษค่ะ - ไม่พบข้อมูล",
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
                            <table className="table table-striped dataTable" id="tblwithdraw">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>รหัสถอนเงิน</th>
                                        <th>จำนวนเงิน</th>
                                        <th>ลักษณะ</th>
                                        <th>วันที่</th>
                                        <th>ตัวเลือก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        withdraw && withdraw.length > 0 && (
                                            withdraw.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td><Link to={`/customer/${item.id_user}`}>{item.withdraw_code}</Link></td>
                                                    <td>{currencyFormat(item.withdraw_amount)}</td>
                                                    <td>{item.w_status == null ? '-' : item.w_status}</td>
                                                    <td>{item.withdraw_date}</td>
                                                    <td>
                                                        <div className="btn_action">
       
                                                            <Link to={`/customer/editwithdraw/${item.id}`}  className="btn_edit"><AiOutlineEdit/></Link>
                                                            <button type="button" onClick={() => handleDelete(item.id)} className="btn_delete"><AiOutlineDelete/></button>
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

export default Withdraw