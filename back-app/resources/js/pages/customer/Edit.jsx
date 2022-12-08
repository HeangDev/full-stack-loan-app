import React, { useState, useEffect } from 'react'
import Layout from '../../layout/Layout'
import { Link, useParams } from 'react-router-dom'
import { Tab } from '@headlessui/react'
import Swal from 'sweetalert2'

const Edit = () => {
    const [currentWork, setCurrentWork] = useState('')
    const [income, setIncome] = useState('')
    const [contactNumber, setContactNumber] = useState('')
    const [currentAddress, setCurrentAddress] = useState('')
    const [otherContact, setOtherContact] = useState('')
    const [bankName, setBankName] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [name, setName] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [frontImage, setFrontImage] = useState()
    const [backImage, setBackImage] = useState()
    const [fullImage, setFullImage] = useState()
    const { id } = useParams()

    const chooseFrontImage = (e) => {
        setFrontImage(e.target.files[0])
    }

    const chooseBackImage = (e) => {
        setBackImage(e.target.files[0])
    }

    const chooseFullImage = (e) => {
        setFullImage(e.target.files[0])
    }

    const fetchUser = async () => {
        await axios.get(`http://127.0.0.1:8000/api/customer/${id}`).then(({data}) => {
            //console.log(data)
            const { current_occupation, monthly_income, contact_number, current_address, emergency_contact_number, bank_name, bank_acc, name, id_number, front, back, full} = data
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
        fetchUser()
    }, [])

    const updateCustomer = async (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('currentWork', currentWork)
        formData.append('income', income)
        formData.append('contactNumber', contactNumber)
        formData.append('currentAddress', currentAddress)
        formData.append('otherContact', otherContact)
        formData.append('bankName', bankName)
        formData.append('bankAccount', bankAccount)
        formData.append('name', name)
        formData.append('idNumber', idNumber)
        formData.append('frontImage', frontImage)
        formData.append('backImage', backImage)
        formData.append('fullImage', fullImage)

        axios.post(`http://127.0.0.1:8000/api/customer/${id}`, formData).then(({data}) => {
            console.log(data)
            navigate("/customer")
        }).catch(({err}) => {
            console.log(err)
        })
    }
    return (
        <>
            <Layout>
                <h3 className="main_tit">สร้างระยะเวลา</h3>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <Link to="/customer" className="btn btn_back">
                                <span>กลับ</span>
                            </Link>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        
                        <form autoComplete="off" onSubmit={updateCustomer}>
                            <fieldset>
                                <legend>กรอกข้อมูลจริงและถูกต้องการตรวจสอบจะผ่านไป</legend>
                                <div className="frm_wrap">
                                    <div className="frm_grp required">
                                        <label>อาชีพปัจจุบัน</label>
                                        <input type="text" placeholder="กรุณากรอกอาชีพปัจจุบันของคุณ" value={currentWork} onChange={e => setCurrentWork(e.target.value)}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>รายได้ต่อเดือน</label>
                                        <input type="text" placeholder="กรุณากรอกรายได้ต่อเดือนจากการทำงานเงินบาท" value={income} onChange={e => setIncome(e.target.value)}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>เบอร์ติดต่อ</label>
                                        <input type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ของคุณ" value={contactNumber} onChange={e => setContactNumber(e.target.value)}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>ที่อยู่ปัจจุบัน</label>
                                        <input type="text" placeholder="กรุณากรอกข้อมูลที่อยู่ปัจจุบัน" value={currentAddress} onChange={e => setCurrentAddress(e.target.value)}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>เบอร์ติดต่อฉุกเฉิน</label>
                                        <input type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ติดต่อฉุกเฉิน" value={otherContact} onChange={e => setOtherContact(e.target.value)}/>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>คำเตือน:บัตรธนาคารที่คุณกรอกต้องเป็นตัวคุณเอง</legend>
                                <div className="frm_wrap">
                                    <div className="frm_grp">
                                        <label>บัญชีธนาคาร</label>
                                        <select className="combobox" value={bankName} onChange={e => setBankName(e.target.value)}>
                                            <option value="ธนาคารไทยพาณิชย์ （SCB）">ธนาคารไทยพาณิชย์ （SCB）</option>
                                            <option value="ธนาคาร กสิกรไทย （KBANK  )">ธนาคาร กสิกรไทย （KBANK  )</option>
                                            <option value="ธนาคาร กรุงศรีอยุธยา （ BAY )">ธนาคาร กรุงศรีอยุธยา （ BAY )</option>
                                            <option value="ธนาคาร กรุงไทย （KTB  )">ธนาคาร กรุงไทย （KTB  )</option>
                                            <option value=" ธนาคาร กรุงเทพ（ BBL )"> ธนาคาร กรุงเทพ（ BBL )</option>
                                            <option value="ธนาคาร ทหารไทย （TTB )">ธนาคาร ทหารไทย （TTB )</option>
                                            <option value="ธนาคาร ธนชาติ（ TBANK )">ธนาคาร ธนชาติ（ TBANK )</option>
                                            <option value="ธนาคาร ออมสิน( GSB)">ธนาคาร ออมสิน( GSB)</option>
                                            <option value="ธนาคาร ยูโอบี (UOB )">ธนาคาร ยูโอบี (UOB )</option>
                                            <option value="ธนาคาร ไอซีบีซี( ICBC)">ธนาคาร ไอซีบีซี( ICBC)</option>
                                            <option value=" ธนาคาร การเกษตรและสหกรณ์ ธ ก ส（BAAC）"> ธนาคาร การเกษตรและสหกรณ์ ธ ก ส（BAAC）</option>                
                                            <option value="ธนาคาร ซีไอเอ็มบี ไทย(CIMB)">ธนาคาร ซีไอเอ็มบี ไทย(CIMB)</option>
                                            <option value="ธนาคาร อื่นๆ">ธนาคาร อื่นๆ</option>
                                        </select>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>หมายเลขบัญชี</label>
                                        <input type="text" placeholder="กรุณากรอกหมายเลขบัตรธนาคาร" value={bankAccount} onChange={e => setBankAccount(e.target.value)}/>
                                    </div>
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend>กรอกข้อมูลจริงและถูกต้องรีวิวจะผ่าน</legend>
                                <div className="frm_wrap">
                                    <div className="frm_grp required">
                                        <label>ชื่อ</label>
                                        <input type="text" placeholder="กรุณากรอกชื่อจริงของคุณ" value={name} onChange={e => setName(e.target.value)}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>เลขประจำตัว</label>
                                        <input type="text" placeholder="กรุณากรอกหมายเลขบัตรประจำตัวจริง" value={idNumber} onChange={e => setIdNumber(e.target.value)}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>ใส่รูปบัตรประชาชนข้างหน้า</label>
                                        <input type="file" accept="image/*" onChange={chooseFrontImage}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>ใส่รูปบัตรประชาชนข้างหลัง</label>
                                        <input type="file" accept="image/*" onChange={chooseBackImage}/>
                                    </div>
                                    <div className="frm_grp required">
                                        <label>ใส่รูปบัตรประชาชนคู่กับใบหน้า</label>
                                        <input type="file" accept="image/*" onChange={chooseFullImage}/>
                                    </div>
                                </div>
                            </fieldset>
                            
                            <div className="btn_wrap mt-3">
                                <button type="submit" className="btn btn_save">
                                    <span>ประหยัด</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Edit