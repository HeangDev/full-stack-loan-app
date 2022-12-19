import React, { useState, useEffect, Fragment } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from "react-router-dom";
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2'
import axios from 'axios'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react'

const Deposit = () => {
    const [editIsOpen, setEditIsOpen] = useState(false)

    const [deposit, setDeposit] = useState()

    const [depositAmount, setDepositAmount] = useState('')
    const [withdrawCode, setWithDrawCode] = useState('')
    const [description, setDescription] = useState('')
    const [idDeposit, setIdDeposit] = useState('')
    const { id } = useParams();

    const fetchDeposit = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getdepositbyid/${id}`).then(({ data }) => {
            setDeposit(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }

    const handleEdit = async (id) => {
        const iddeposit = id;
        setEditIsOpen(true)
        axios.get(`http://127.0.0.1:8000/api/deposit/${id}`).then((data) => {
            const { deposit_amount, withdraw_code, description } = data.data
            setDepositAmount(deposit_amount);
            setWithDrawCode(withdraw_code);
            setDescription(description);
            setIdDeposit(iddeposit);
        }).catch(({err}) => {
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

        await axios.post(`http://127.0.0.1:8000/api/updatedepositbyid/${id_deposit}`, formData).then((data) => {
            Swal.fire({
                title: 'Success!',
                text: "แก้ไขสำเร็จ!",
                icon: "success",
                timer: '1500'
            })
            setEditIsOpen(false)
        }).catch(({err}) => {
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

        await axios.delete(`http://127.0.0.1:8000/api/deposit/${id}`).then(({data}) => {
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
        fetchDeposit()
    }, [])

    const columns = [
        {
            name: '#',
            selector: row => row.id,
        },
        {
            name: "รหัสถอนเงิน",
            selector: (row) => 
            row.withdraw_code === '' || row.withdraw_code === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.withdraw_code}</>,
            sortable: true,
        },
        {
            name: "จำนวนเงิน",
            selector: (row) => 
            row.deposit_amount === '' || row.deposit_amount === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.deposit_amount}</>,
            sortable: true,
        },
        {
            name: "ลักษณะ",
            selector: (row) => 
            row.description === '' || row.description === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.description}</>,
            sortable: true,
        },
        {
            name: "ลักษณะ",
            selector: (row) => 
            row.deposit_date === '' || row.deposit_date === null ?
            <>ไม่สมบูรณ์</>
            :
            <>{row.deposit_date}</>,
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
                                data={deposit}
                                pagination
                                keyField='id'
                            />
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
                                        <button type="button" className="btn_close" onClick={() => setEditIsOpen(false)}><AiOutlineClose/></button>
                                    </div>
                                    <div className="modal_body">
                                        <div className="frm_wrap">
                                            <div className="frm_grp">
                                                <label>รหัสถอนเงิน</label>
                                                <input type="number" placeholder="รหัสถอนเงิน 4 หลัก" value={withdrawCode} onChange={(e) => {setWithDrawCode(e.target.value)}}  /> 
                                            </div>
                                            <div className="frm_grp">
                                                <label>จำนวนเงิน</label>
                                                <input type="number" placeholder="ระบุจำนวนเงินกู้ให้กับลูกค้า" value={depositAmount} onChange={(e) => {setDepositAmount(e.target.value)}} /> 
                                            </div>
                                            <div className="frm_grp">
                                                <label>คำอธิบาย</label>
                                                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)}/>
                                            </div>
                                        </div>
                                    </div>
                                    <input type="hidden" value={idDeposit} onChange={(e) => {setIdDeposit(e.target.value)}} />
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