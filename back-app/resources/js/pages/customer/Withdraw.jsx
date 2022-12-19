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
    const [editIsOpen, setEditIsOpen] = useState(false)

    const [withdraw, setWithdraw] = useState()

    
    const [withdrawAmount, setWithdrawAmount] = useState('')
    const [withdrawStatus, setWithdrawStatus] = useState('')
    const [idwithdraw, setIdWithdraw] = useState('')
    const { id } = useParams();

    const fetchWithdraw = async () => {
        await axios.get(`http://127.0.0.1:8000/api/withdraw/${id}`).then(({ data }) => {
            setWithdraw(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }

    const handleEdit = async (id) => {
        const idwithdraw = id;
        setEditIsOpen(true)
        axios.get(`http://127.0.0.1:8000/api/withdraw/${id}`).then((data) => {
            console.log(data)
            const { withdraw_amount, status} = data
            setWithdrawAmount(withdraw_amount);
            setWithdrawStatus(status);
            setIdWithdraw(idwithdraw);
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    const handleupdate = async (e) => {
        e.preventDefault();
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
                                                    <td><Link to={`/customer/${item.id_user}`}>{item.tel}</Link></td>
                                                    <td>{currencyFormat(item.withdraw_amount)}</td>
                                                    <td>{item.status == null ? '-' : item.status}</td>
                                                    <td>{item.withdraw_date}</td>
                                                    <td>
                                                        <div className="btn_action">
                                                            <button type="button" onClick={() => handleEdit(item.id)} className="btn_edit"><AiOutlineEdit/></button>
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
                <Transition appear show={editIsOpen} as={Fragment}>
                    <Dialog as="div" className="modal" onClose={() => setEditIsOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>
                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="modal_dialog">
                                        <form autoComplete="off" onSubmit={handleupdate}>
                                            <div className="modal_header">
                                                <Dialog.Title
                                                    as="h4"
                                                    className="modal_title"
                                                >
                                                    แก้ไขยอดเติม
                                                </Dialog.Title>
                                                <button type="button" className="btn_close" onClick={() => setEditIsOpen(false)}><AiOutlineClose /></button>
                                            </div>
                                            <div className="modal_body">
                                                <div className="frm_wrap">
                                                    <div className="frm_grp">
                                                        <label>รหัสถอนเงิน</label>
                                                        <input type="number" placeholder="รหัสถอนเงิน 4 หลัก" value={withdrawAmount} onChange={(e) => { setWithdrawAmount(e.target.value) }} />
                                                    </div>
                                                    <div className="frm_grp">
                                                        <label>จำนวนเงิน</label>
                                                        <input type="number" placeholder="ระบุจำนวนเงินกู้ให้กับลูกค้า" value={withdrawStatus} onChange={(e) => { setWithdrawStatus(e.target.value) }} />
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                            <input type="hidden" value={idwithdraw} onChange={(e) => { setIdWithdraw(e.target.value) }} />
                                            <div className="modal_footer">
                                                <button type="button" className="btn_close" onClick={() => setEditIsOpen(false)}>ออกจาก</button>
                                                <button type="submit" className="btn_save">ยืนยัน</button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
                
            </Layout>
        </>
    )
}

export default Withdraw