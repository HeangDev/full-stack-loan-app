import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from "react-router-dom";
import Swal from 'sweetalert2'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock, AiOutlineMoneyCollect, AiFillCreditCard } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import { MdOutlineAttachMoney } from "react-icons/md";
import { currencyFormat } from '../../utils/Formatter'


import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";


const Index = () => {
    const [customer, setCustomer] = useState([])
    let number = 1

    const fetchCustomer = async () => {
        await axios.get(`http://127.0.0.1:8000/api/customer`).then(({data}) => {
            setCustomer(data)
        })
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

    useEffect(() => {
        fetchCustomer()

        if (!$.fn.dataTable.isDataTable("#tblcustomer")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#tblcustomer").DataTable({
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
                            <Link to="/customer/create" className="btn btn_save">
                                <span>เพิ่มลูกค้าใหม่</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <div className="tbl_scroll">
                        <table className="table table-striped dataTable" id="tblcustomer">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ชื่อลูกค้า</th>
                                        <th>เบอร์โทร</th>
                                        <th>เครดิต</th>
                                        <th>ข้อมูลอื่น ๆ</th>
                                        <th>ลายเซ็น</th>
                                        <th>สถานะการกู้</th>
                                        <th>รหัสถอน</th>
                                        <th>แก้ไขข้อมูล</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                        customer && customer.length > 0 && (
                                            customer.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.name == null ? 'ไม่สมบูรณ์' : item.name}</td>
                                                    <td>
                                                    <Link to={`/customer/${item.id}`}>{item.tel}</Link>
                                                    </td>
                                                    <td>{currencyFormat(item.deposit_amount)}</td>
                                                    <td>
                                                    {item.status === 'complete' ?
                                                    <span className="status_green">กรอกข้อมูลแล้ว</span>
                                                    :
                                                    <span className="status_red">ไม่สมบูรณ์</span>}
                                                    </td>
                                                    <td>
                                                    {item.sign_status === '1' ? 
                                                    <span className="status_green">เซ็นชื่อเรียบร้อยแล้วค่ะ</span>
                                                    :
                                                    <span className="status_red">ยังไม่ได้เซ็นชื่อค่ะ</span>
                                                    }
                                                    </td>
                                                    <td>
                                                    <span className='status_orange'>{item.deposits_status}</span>
                                                    </td>
                                                    <td>
                                                    {item.withdraw_code === '' ?
                                                    <span className="status_red">ยังไม่มีรหัสถอนเงินค่ะ</span>
                                                    :
                                                    <span className="status_green">{item.withdraw_code}</span>
                                                    }
                                                    </td>
                                    
                                                    <td>
                                                        <div className="btn_action">
                                                        {item.status === 'complete' ?
                                                            <Link to={`/customer/edit/${item.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                                                            :
                                                            <Link to={`/customer/create/${item.id}`} className="btn_edit"><AiOutlineEdit/></Link>
                                                        } 
                                                            <Link to={`/customer/changepassword/${item.id}`} className="btn_change"><AiOutlineLock/></Link>
                                                            <Link to={`/customer/${item.id}`} className="btn_show"><BiShowAlt/></Link>
                                                            <Link to={`/customer/deposit/${item.id}`} className="btn_show"><MdOutlineAttachMoney/></Link>
                                                            <Link to={`/customer/withdraw/${item.id}`} className="btn_show"><AiOutlineMoneyCollect/></Link>
                                                            <Link to={`/customer/loan/${item.id}`} className="btn_show"><AiFillCreditCard/></Link>
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

export default Index
