import React, { useState, useEffect, Fragment } from "react";
import Layout from "../../layout/Layout";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../assets/avatar.jpg";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { Dialog, Transition } from '@headlessui/react'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Show = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [currentWork, setCurrentWork] = useState("");
    const [income, setIncome] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [currentAddress, setCurrentAddress] = useState("");
    const [otherContact, setOtherContact] = useState("");
    const [bankName, setBankName] = useState("");
    const [bankAccount, setBankAccount] = useState("");
    const [name, setName] = useState("");
    const [idNumber, setIdNumber] = useState("");
    const [frontImage, setFrontImage] = useState();
    const [backImage, setBackImage] = useState();
    const [fullImage, setFullImage] = useState();
    const { id } = useParams();

    const [isOpen, setIsOpen] = useState(false)
    const [withdrawCode, setWithDrawCode] = useState('')
    const [credit, setCredit] = useState('')
    const [description, setDescription] = useState('')

    function closeModal() {
        setIsOpen(false)
      }
    
      function openModal() {
        setIsOpen(true)
      }

    const fetchCustomer = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/customer/${id}`)
            .then(({ data }) => {
                console.log(data)
                const {
                    current_occupation,
                    monthly_income,
                    contact_number,
                    current_address,
                    emergency_contact_number,
                    bank_name,
                    bank_acc,
                    name,
                    id_number,
                    front,
                    back,
                    full,
                } = data;
                setCurrentWork(current_occupation);
                setIncome(monthly_income);
                setContactNumber(contact_number);
                setCurrentAddress(current_address);
                setOtherContact(emergency_contact_number);
                setBankName(bank_name);
                setBankAccount(bank_acc);
                setName(name);
                setIdNumber(id_number);
            })
            .catch(({ err }) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchCustomer();
    }, []);
    return (
        <>
            <Layout>
                <h3 className="main_tit">สร้างระยะเวลา</h3>
                <div className="card_profile_box">
                    <div className="card_profile_wrap">
                        <div className="left">
                            <div className="avatar_lg">
                                <img src={Avatar} alt="" />
                            </div>
                            <div className="profile_info">
                                <h4>{name}</h4>
                                <p>กำหลังดำเนินการ</p>
                                <ul>
                                    <li>
                                        <h5>$ 25,184</h5>
                                        <p>เงินกู้รวม</p>
                                    </li>
                                    <li>
                                        <h5>5,482</h5>
                                        <p>จำนวนเงินกู้</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="right">
                            <div className="text-center text-sm-end">
                                <button type="button" className="btn btn_light" onClick={() => setIsOpen(true)}>
                                    <MdAttachMoney/>
                                    <span>ใส่เครดิต</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card_row">
                    <div className="card_left">
                        <div className="card">
                            <div className="card_body">
                                <h4 className="card_title">ข้อมูลลูกค้า</h4>
                                <div>
                                    <p>
                                        <strong>อาชีพปัจจุบัน :</strong>
                                        <span>{currentWork}</span>
                                    </p>
                                    <p>
                                        <strong>รายได้ต่อเดือน :</strong>
                                        <span>{income}</span>
                                    </p>
                                    <p>
                                        <strong>เบอร์ติดต่อ :</strong>
                                        <span>{contactNumber}</span>
                                    </p>
                                    <p>
                                        <strong>ที่อยู่ปัจจุบัน :</strong>
                                        <span>{currentAddress}</span>
                                    </p>
                                    <p>
                                        <strong>เบอร์ติดต่อฉุกเฉิน :</strong>
                                        <span>{otherContact}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card_right">
                        <div className="card_row">
                            <div className="card_col_4">
                                <div className="card">
                                    <div className="card_body">

                                    </div>
                                </div>
                            </div>
                            <div className="card_col_4">
                                <div className="card">
                                    <div className="card_body">
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="card_col_4">
                                <div className="card">
                                    <div className="card_body">
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card_body">
                                <h4 className="card_title">ข้อมูลลูกค้า</h4>
                                <div className="tbl_scroll">
                                    <table className="tbl">
                                        <thead>
                                            <tr>
                                                <th>รหัสถอนเงิน</th>
                                                <th>เครดิต</th>
                                                <th>รายละเอียด</th>
                                                <th>ตัวเลือก</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                        </tbody>
                                    </table>
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
                                <form
                                    autoComplete="off"
                                    onSubmit={handleSubmit(() => {
                                        const formData = new FormData()
                                        formData.append('id', id)
                                        formData.append('withdrawCode', withdrawCode)
                                        formData.append('credit', credit)
                                        formData.append('description', description)
                                        axios.post(`http://127.0.0.1:8000/api/deposit`, formData).then((data) => {
                                            console.log(data)
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
                                        }).catch(({err}) => {
                                            console.log(err)
                                        })
                                    })}>
                                    <div className="modal_header">
                                        <Dialog.Title
                                            as="h4"
                                            className="modal_title"
                                        >
                                            สมัครขอสินเชื่อ
                                        </Dialog.Title>
                                        <button type="button" className="btn_close" onClose={() => setIsOpen(false)}><AiOutlineClose/></button>
                                    </div>
                                    <div className="modal_body">
                                        <div className="frm_wrap">
                                            <div className="frm_grp required">
                                                <label>รหัสถอนเงิน</label>
                                                <input
                                                    {...register("withdrawCode", { required: 'ต้องระบุหมายเลขโทรศัพท์.' })}
                                                    type="number" placeholder="รหัสถอนเงิน 4 หลัก" value={withdrawCode}
                                                    onChange={(e) => setWithDrawCode(e.target.value)}
                                                />
                                                {errors.withdrawCode && <span className="msg_error">{errors.withdrawCode?.message}</span>}
                                            </div>
                                            <div className="frm_grp required">
                                                <label>จำนวนเงิน</label>
                                                <input
                                                    {...register("credit", { required: 'ต้องระบุหมายเลขโทรศัพท์.' })}
                                                    type="number" placeholder="ระบุจำนวนเงินกู้ให้กับลูกค้า" value={credit}
                                                    onChange={(e) => setCredit(e.target.value)}
                                                />
                                                {errors.credit && <span className="msg_error">{errors.credit?.message}</span>}
                                            </div>
                                            <div className="frm_grp required">
                                                <label>คำอธิบาย</label>
                                                <textarea rows={2}
                                                    {...register("description", { required: 'ต้องระบุหมายเลขโทรศัพท์.' })}
                                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                                />
                                                {errors.description && <span className="msg_error">{errors.description?.message}</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal_footer">
                                        <button type="button" className="btn_close" onClick={() => setIsOpen(false)}>ออกจาก</button>
                                        <button type="submit" className="btn_save">ประหยัด</button>
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
