import React, { useState, useEffect, Fragment } from "react";
import Layout from "../../layout/Layout";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../assets/avatar.jpg";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'
import { currencyFormat } from '../../utils/Formatter'
import axios from "axios";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock, AiOutlineMoneyCollect } from "react-icons/ai";


import "jquery/dist/jquery.min.js";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";


const Show = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [customerStatus, setCustomerStatus] = useState('')
    const [currentWork, setCurrentWork] = useState("");
    const [income, setIncome] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [otherContact, setOtherContact] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [name, setName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [frontImage, setFrontImage] = useState('')
    const [backImage, setBackImage] = useState('')
    const [fullImage, setFullImage] = useState('')
    const { id } = useParams();

    const [isOpen, setIsOpen] = useState(false)
    const [editIsOpen, setEditIsOpen] = useState(false)

    const [credit, setCredit] = useState('')
    const [withdrawCode, setWithDrawCode] = useState('')
    const [description, setDescription] = useState('')

    const [deposit, setDeposit] = useState()
    const [withdraw, setWithdraw] = useState()
    const [loan, setLoan] = useState('') 


    const fetchCustomer = async () => {
        await axios.get(`http://127.0.0.1:8000/api/customer/${id}`).then(({ data }) => {
            // console.log(data)
            const { status, current_occupation, monthly_income, contact_number, current_address, emergency_contact_number, bank_name, bank_acc, name, id_number, front, back, full, credit, withdrawCode, description } = data
            setCustomerStatus(status)
            setCurrentWork(current_occupation)
            setIncome(monthly_income)
            setContactNumber(contact_number)
            setCurrentAddress(current_address)
            setOtherContact(emergency_contact_number)
            setBankName(bank_name)
            setBankAccount(bank_acc)
            setName(name)
            setIdNumber(id_number)
            setFrontImage(front)
            setBackImage(back)
            setFullImage(full)
        }).catch(({ err }) => {
            console.log(err);
        });
    };

    const fetchDepositById = async () => {
        await axios.get(`http://127.0.0.1:8000/api/deposit/${id}`).then(({ data }) => {
            setDeposit(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }

    const createDeposit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('id', id)
        formData.append('withdrawCode', withdrawCode)
        formData.append('credit', credit)
        formData.append('description', description)
        axios.post(`http://127.0.0.1:8000/api/deposit/${id}`, formData).then((data) => {
            Swal.fire({
                title: 'Success!',
                text: "คุณได้ให้เครดิตแก่ลูกค้าของคุณเรียบร้อยแล้ว",
                icon: "success",
                timer: '1500'
            })
            setWithDrawCode('')
            setCredit('')
            setDescription('')
            setIsOpen(false)
            fetchDepositById()
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    const handleEdit = async (id) => {
        const iddeposit = id;
        setEditIsOpen(true)
        axios.get(`http://127.0.0.1:8000/api/getdepositbyid/${id}`).then((data) => {
            console.log(data)
            const { deposit_amount, withdraw_code, description } = data.data
            setCredit(deposit_amount);
            setWithDrawCode(withdraw_code);
            setDescription(description);
            setIdDeposit(iddeposit);
        }).catch(({ err }) => {
            console.log(err)
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('id', id)
        formData.append('withdrawCode', withdrawCode)
        formData.append('credit', credit)
        formData.append('description', description)

        axios.post(`http://127.0.0.1:8000/api/deposit/${id}`, formData).then((data) => {
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


    const fetchDocumentById = async () => {
        await axios.get(`http://127.0.0.1:8000/api/documentid/${id}`).then(({ data }) => {
            setFrontImage(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }
    
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


    const fetchLoanById = async () => {
        await axios.get(`http://127.0.0.1:8000/api/loan/${id}`).then(({ data }) => {
            console.log(data)
            setLoan(data)
        }).catch(({ err }) => {
            console.log(err);
        });
    }

    useEffect(() => {
        fetchCustomer();
        fetchDepositById();
        fetchWithdraw();
        fetchLoanById();
        fetchDocumentById();
        //Deposit
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
                            "infoEmpty": "",
                            "infoFiltered": "(filtered from _MAX_ total records)",
                            "search": "ค้นหา:",
                            "searchPlaceholder": "ค้นหาข้อมูล",
                            "paginate": {
                                "previous": "หน้าก่อนหน้า",
                                "next": "หน้าถัดไป"
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
                }, 100);
                
            });
            
        }
        //Edn Deposit

         //Withdraw
         if (!$.fn.dataTable.isDataTable("#tblshow")) {

            $(document).ready(function () {
   
                setTimeout(function () {
                  
                    $("#tblwithdraw").DataTable({
                        pageLength: 10,
                        processing: true,
                        destroy: true,
                        "language": {
                            "lengthMenu": "แสดง _MENU_ แถวต่อหน้า",
                            "zeroRecords": "ไม่พบอะไร - ขอโทษ",
                            "info": "กำลังแสดงหน้า _PAGE_ ของ _PAGES_",
                            "infoEmpty": "",
                            "infoFiltered": "(filtered from _MAX_ total records)",
                            "search": "ค้นหา:",
                            "searchPlaceholder": "ค้นหาข้อมูล",
                            "paginate": {
                                "previous": "หน้าก่อนหน้า",
                                "next": "หน้าถัดไป"
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
                }, 100);
                
            });
            
        }
        //Edn Withdraw

        // Table Loan
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
                            "infoEmpty": "",
                            "infoFiltered": "(filtered from _MAX_ total records)",
                            "search": "ค้นหา:",
                            "searchPlaceholder": "ค้นหาข้อมูล",
                            "paginate": {
                                "previous": "หน้าก่อนหน้า",
                                "next": "หน้าถัดไป"
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
    // End Table Loan

    }, []);
    return (
        <>
            <Layout>
                <div className="btn_wrap mb-[10px]">
                    <Link to="/customer" className="btn btn_back">
                        <span>กลับ</span>
                    </Link>
                </div>
                <h3 className="main_tit">สร้างระยะเวลา</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div className="grid grid-cols-1">
                        <div className="card">
                            <div className="card_body card_profile_box">
                                <div className="flex items-start justify-center flex-col sm:justify-between sm:flex-row">
                                    <div className="left col-auto sm:col-span-2">
                                        <div className="avatar_lg">
                                            <img src={Avatar} alt="" />
                                        </div>
                                        <div className="profile_info">
                                            {
                                                name == null ? (
                                                    <h4>ไม่มีข้อมูล</h4>
                                                ) : (
                                                    <h4>{name}</h4>
                                                )
                                            }
                                            <p>กำหลังดำเนินการ</p>
                                            <ul className="inline-block">
                                                <li>
                                                    <h5>{currencyFormat(25000)}</h5>
                                                    <h6>เงินกู้รวม</h6>
                                                </li>
                                                <li>
                                                    <h5>2</h5>
                                                    <h6>จำนวนเงินกู้</h6>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="right flex items-center justify-center w-full sm:w-1/3 sm:justify-end">
                                        <div className="text-center text-sm-end mt-[15px] sm:mt-0">
                                            {
                                                customerStatus === 'incomplete' ? (
                                                    <></>
                                                ) : (
                                                    <button type="button" className="btn btn_light" onClick={() => setIsOpen(true)}>
                                                        <MdAttachMoney />
                                                        <span>ใส่เครดิต</span>
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-y-4 sm:gap-4">
                        <div className="row-span-3">
                            <div className="grid gap-y-4 sm:gap-4">
                                <div className="card">
                                    <div className="card_body">
                                        <h4 className="card_title">ข้อมูลลูกค้า</h4>
                                        <div className="card_info">
                                            <p>
                                                <strong>อาชีพปัจจุบัน :</strong>
                                                {
                                                    currentWork == null ? (
                                                        <span>ไม่มีข้อมูล</span>
                                                    ) : (
                                                        <span>{currentWork}</span>
                                                    )
                                                }
                                            </p>
                                            <p>
                                                <strong>รายได้ต่อเดือน :</strong>
                                                <span>{currencyFormat(income)}</span>
                                            </p>
                                            <p>
                                                <strong>เบอร์ติดต่อ :</strong>
                                                {
                                                    contactNumber == null ? (
                                                        <span>ไม่มีข้อมูล</span>
                                                    ) : (
                                                        <span>{contactNumber}</span>
                                                    )
                                                }
                                            </p>
                                            <p>
                                                <strong>ที่อยู่ปัจจุบัน :</strong>
                                                {
                                                    currentAddress == null ? (
                                                        <span>ไม่มีข้อมูล</span>
                                                    ) : (
                                                        <span>{currentAddress}</span>
                                                    )
                                                }
                                            </p>
                                            <p>
                                                <strong>บัญชีธนาคาร :</strong>
                                                {
                                                    bankName == null ? (
                                                        <span>ไม่มีข้อมูล</span>
                                                    ) : (
                                                        <span>{bankName}</span>
                                                    )
                                                }
                                            </p>
                                            <p>
                                                <strong>หมายเลขบัญชี :</strong>
                                                {
                                                    bankAccount == null ? (
                                                        <span>ไม่มีข้อมูล</span>
                                                    ) : (
                                                        <span>{bankAccount}</span>
                                                    )
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card bg_indigo">
                                    <div className="card_body">
                                        <div className="profile_tel">
                                            {
                                                otherContact == null ? (
                                                    <h4>ไม่มีข้อมูล</h4>
                                                ) : (
                                                    <h4>เบอร์ติดต่อฉุกเฉิน : {otherContact}</h4>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="card">
                                    <div className="card_body">
                                        <h4 className="card_title">รายการเติมเงิน</h4>
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
                                <div className="card">
                                    <div className="card_body">
                                        <h4 className="card_title">รายการถอนเงิน</h4>
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
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="card">
                            <div className="card_body">
                                <h4 className="card_title">รายการสินเชื่อ</h4>
                                <div className="tbl_scroll">
                                    <table className="table table-striped dataTable" id="tblloan">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>เดือน</th>
                                                <th>จำนวนเงินกู้</th>
                                                <th>ดอกเบี้ย</th>
                                                <th>เงินกู้รวมดอกเบี้ย</th>
                                                <th>อัตราจ่ายต่อเดือน</th>
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
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="card">
                            <div className="card_body">
                                <div className="frm_upload_wrap">
                                    <div className="file_input">
                                        <div className="input_show_file"><img src={`http://localhost:8000/storage/customer/${frontImage}`} alt=""/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card_body">
                                <div className="frm_upload_wrap">
                                    <div className="file_input">
                                        <div className="input_show_file"><img src={`http://localhost:8000/storage/customer/${backImage}`} alt=""/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card_body">
                                <div className="frm_upload_wrap">
                                    <div className="file_input">
                                        <div className="input_show_file"><img src={`http://localhost:8000/storage/customer/${fullImage}`} alt=""/></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="modal" onClose={() => setIsOpen(false)}>
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
                                        <form autoComplete="off" onSubmit={createDeposit}>
                                            <div className="modal_header">
                                                <Dialog.Title
                                                    as="h4"
                                                    className="modal_title"
                                                >
                                                    สมัครขอสินเชื่อ
                                                </Dialog.Title>
                                                <button type="button" className="btn_close" onClick={() => setIsOpen(false)}><AiOutlineClose /></button>
                                            </div>
                                            <div className="modal_body">
                                                <div className="frm_wrap">
                                                    <div className="frm_grp">
                                                        <label>รหัสถอนเงิน</label>
                                                        <input type="number" placeholder="รหัสถอนเงิน 4 หลัก" value={withdrawCode} onChange={(e) => setWithDrawCode(e.target.value)} />
                                                    </div>
                                                    <div className="frm_grp">
                                                        <label>จำนวนเงิน</label>
                                                        <input type="number" placeholder="ระบุจำนวนเงินกู้ให้กับลูกค้า" value={credit} onChange={(e) => setCredit(e.target.value)} />
                                                    </div>
                                                    <div className="frm_grp">
                                                        <label>คำอธิบาย</label>
                                                        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal_footer">
                                                <button type="button" className="btn_close" onClick={() => setIsOpen(false)}>ออกจาก</button>
                                                <button type="submit" className="btn_save">ยืนยัน</button>
                                            </div>
                                        </form>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>

                {/* // Edit  */}
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
                                                        <input type="number" placeholder="ระบุจำนวนเงินกู้ให้กับลูกค้า" value={credit} onChange={(e) => { setCredit(e.target.value) }} />
                                                    </div>
                                                    <div className="frm_grp">
                                                        <label>คำอธิบาย</label>
                                                        <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} />
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="modal_footer">
                                                <button type="button" className="btn_close" onClick={(e) => setEditIsOpen(false)}>ออกจาก</button>
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
    );
};

export default Show;
