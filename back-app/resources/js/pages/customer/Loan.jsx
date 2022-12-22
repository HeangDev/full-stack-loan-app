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


const Loan = () => {

    const [loan, setLoan] = useState()
    const { id } = useParams();

    const fetchLoan = async() => {
        await axios.get(`http://127.0.0.1:8000/api/loan/${id}`).then(({ data }) => {
            console.log(data)
            setLoan(data)
        }).catch(({ err }) => {
            console.log( err )
        });
    }

    useEffect(() => {
        fetchLoan()
        
        if (!$.fn.dataTable.isDataTable("#tblloan")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#tblloan").DataTable({
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
                            <table className="table table-striped dataTable" id="tblloan">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>เดือน</th>
                                        <th>จำนวนเงินกู้</th>
                                        <th>ดอกเบี้ย</th>
                                        <th>เงินกู้รวมดอกเบี้ย</th>
                                        <th>อัตราจ่ายต่อเดือน</th>d
                                        <th>วันที</th>
                                        <th>แก้ไขข้อมูล</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    loan && loan.length > 0 && (
                                        loan.map((row, i) => (
                                            <tr key={i}>
                                                <td>{i}</td>
                                                <td>{row.month == null ? '-' : row.month} เคือน</td>
                                                <td>{currencyFormat(row.amount == null ? 'ไม่มีข้อมูล' : row.amount)}</td>
                                                <td>{currencyFormat(row.interest == null ? '-' : row.interest)}</td>
                                                <td>{currencyFormat(row.total == null ? '-' : row.total)}</td>
                                                <td>{currencyFormat(row.pay_month == null ? '-' : row.pay_month)}</td>
                                                <td>{row.date == null ? '-' : row.date}</td>
                                                <td>
                                                <Link to={`/customer/editloan/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                                                <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete/></button>
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

export default Loan