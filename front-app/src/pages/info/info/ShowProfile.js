import React, { useState, useEffect } from 'react'
import Header from '../../../components/Header'
import axios from 'axios'

const ShowProfile = () => {
    const [currentWork, setCurrentWork] = useState('')
    const [income, setIncome] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [otherContact, setOtherContact] = useState('')
    const [bankName, setBankName] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [name, setName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const id = localStorage.getItem('auth_id')

    const fetchCustomerInfo = async () => {
        await axios.get(`http://127.0.0.1:8000/api/user/${id}`).then(({data}) => {
            const { current_occupation, monthly_income, contact_number, current_address, emergency_contact_number, bank_name, bank_acc, name, id_number } = data[0]
            setCurrentWork(current_occupation)
            setIncome(monthly_income)
            setContactNumber(contact_number)
            setCurrentAddress(current_address)
            setOtherContact(emergency_contact_number)
            setBankName(bank_name)
            setBankAccount(bank_acc)
            setName(name)
            setIdNumber(id_number)
        }).catch (({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchCustomerInfo()
    }, [])
    return (
        <>
            <Header url="/info" title="ข้อมูลพื้นฐาน"/>
            <div className="content">
                <form autoComplete="off">
                    <div>
                        <div className="frm_info">
                            <p>กรอกข้อมูลจริงและถูกต้องการตรวจสอบจะผ่านไป</p>
                        </div>
                        <div className="frm_wrap">
                            <div className="frm_grp">
                                <label htmlFor="currentWork">อาชีพปัจจุบัน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={currentWork}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="income">รายได้ต่อเดือน</label>
                                <div className="frm_col">
                                    <input type="text" className="text-right" readOnly id="currentWork" value={income}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="contactNumber">เบอร์ติดต่อ</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={contactNumber}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="currentAddress">ที่อยู่ปัจจุบัน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={currentAddress}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="otherContact">เบอร์ติดต่อฉุกเฉิน</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="currentWork" value={otherContact}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="frm_info">
                            <p>คำเตือน:บัตรธนาคารที่คุณกรอกต้องเป็นตัวคุณเอง</p>
                        </div>
                        <div className="frm_wrap">
                            <div className="frm_grp">
                                <label htmlFor="">บัญชีธนาคาร</label>
                                <input type="text" readOnly id="currentWork" value={bankName}/>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="bankAccount">หมายเลขบัญชี</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="bankAccount" value={bankAccount}/>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div>
                        <p className="frm_info">กรอกข้อมูลจริงและถูกต้องรีวิวจะผ่าน ~</p>
                        <div className="frm_wrap">
                            <div className="frm_grp">
                                <label htmlFor="name">ชื่อ</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="name" value={name}/>
                                </div>
                            </div>
                            <div className="frm_grp">
                                <label htmlFor="idNumber">เลขประจำตัว</label>
                                <div className="frm_col">
                                    <input type="text" readOnly id="idNumber" value={idNumber}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div>
                        <p className="frm_info">
                            *ต้องใช้บัตรประชาชนและสามารถระบุเนื้อหาได้ชัดเจน<br/>
                            *โปรดยืนยันว่าได้เปิดใช้งานการอนุญาตกล้องแล้ว
                        </p>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={frontImageUrl} alt=""/></div>
                                <input type="file" accept="image/*" onChange={chooseFrontImage}/>
                                <div className="btn_upload"><img src={IconCamera} alt=""/></div>
                                <div className="txt_wrap">หน้าบัตรประชาชน</div>
                            </div>
                        </div>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={backImageUrl} alt=""/></div>
                                <input type="file" accept="image/*" onChange={chooseBackImage}/>
                                <div className="btn_upload"><img src={IconCamera} alt=""/></div>
                                <div className="txt_wrap">ด้านหลังบัตรประชาชน</div>
                            </div>
                        </div>
                        <div className="frm_upload_wrap">
                            <div className="file_input">
                                <div className="input_show_file"><img src={fullImageUrl} alt=""/></div>
                                <input type="file" accept="image/*" onChange={chooseFullImage}/>
                                <div className="btn_upload"><img src={IconCamera} alt=""/></div>
                                <div className="txt_wrap">ถือบัตรประชาชน</div>
                            </div>
                        </div>
                    </div> */}
                </form>
            </div>
        </>
    )
}

export default ShowProfile
