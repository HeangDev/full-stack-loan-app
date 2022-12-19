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

const Deposit = () => {
    const [editIsOpen, setEditIsOpen] = useState(false)

    const [deposit, setDeposit] = useState()

    const [depositAmount, setDepositAmount] = useState('')
    const [withdrawCode, setWithDrawCode] = useState('')
    const [description, setDescription] = useState('')
    const [idDeposit, setIdDeposit] = useState('')
    const { id } = useParams();

    const fetchDeposit = async () => {
        await axios.get(`http://127.0.0.1:8000/api/deposit/${id}`).then(({ data }) => {
            setDeposit(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }

    const handleEdit = async (id) => {
        const iddeposit = id;
        setEditIsOpen(true)
        axios.get(`http://127.0.0.1:8000/api/deposit/${id}`).then((data) => {
            console.log(data)
            const { deposit_amount, withdraw_code, description } = data
            setDepositAmount(deposit_amount);
            setWithDrawCode(withdraw_code);
            setDescription(description);
            setIdDeposit(iddeposit);
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        const id_deposit = idDeposit
        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('withdrawCode', withdrawCode)
        formData.append('depositAmount', depositAmount)
        formData.append('description', description)

        axios.post(`http://127.0.0.1:8000/api/updatedepositbyid/${id_deposit}`, formData).then((data) => {
            console.log(data)
            Swal.fire({
                title: 'Success!',
                text: "แก้ไขสำเร็จ!",
                icon: "success",
                timer: '1500'
            })
            setEditIsOpen(false)
        }).catch(({ err }) => {
            console.log(err)
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

        await axios.delete(`http://127.0.0.1:8000/api/deposit/${id}`).then(({ data }) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchDeposit()
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchDeposit()

        if (!$.fn.dataTable.isDataTable("#tbldeposit")) {
            $(document).ready(function () {
                setTimeout(function () {
                    $("#tbldeposit").DataTable({
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
                            <table className="table table-striped dataTable" id="tbldeposit">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>รหัสถอนเงิน</th>
                                        <th>จำนวนเงิน</th>
                                        <th>ลักษณะ</th>
                                        <th>ลักษณะ</th>
                                        <th>ตัวเลือก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        deposit && deposit.length > 0 && (
                                            deposit.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.withdraw_code}</td>
                                                    <td>{currencyFormat(item.deposit_amount)}</td>
                                                    <td>{item.description == null ? '-' : item.description}</td>
                                                    <td>{item.deposit_date}</td>
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
                                        <form autoComplete="off" onSubmit={handleUpdate}>
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
                                                        <input type="number" placeholder="รหัสถอนเงิน 4 หลัก" value={withdrawCode} onChange={(e) => { setWithDrawCode(e.target.value) }} />
                                                    </div>
                                                    <div className="frm_grp">
                                                        <label>จำนวนเงิน</label>
                                                        <input type="number" placeholder="ระบุจำนวนเงินกู้ให้กับลูกค้า" value={depositAmount} onChange={(e) => { setDepositAmount(e.target.value) }} />
                                                    </div>
                                                    <div className="frm_grp">
                                                        <label>คำอธิบาย</label>
                                                        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="hidden" value={idDeposit} onChange={(e) => { setIdDeposit(e.target.value) }} />
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

export default Deposit