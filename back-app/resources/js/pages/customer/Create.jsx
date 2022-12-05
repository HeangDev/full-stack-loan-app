import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2'

const Create = () => {
    const { register, handleSubmit, formState: {errors} } = useForm();
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
    return (
        <>
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
                    <form
                        autoComplete="off"
                        onSubmit={handleSubmit(() => {
                            
                        })}>
                        <fieldset>
                            <legend>กรอกข้อมูลจริงและถูกต้องการตรวจสอบจะผ่านไป</legend>
                            <div className="frm_wrap">
                                <div className="frm_grp required">
                                    <label>อาชีพปัจจุบัน</label>
                                    <input
                                        {...register("currentWork", { required: "อาชีพปัจจุบันต้องไม่ว่างเปล่า." })}
                                        type="text" placeholder="กรุณากรอกอาชีพปัจจุบันของคุณ"
                                        onChange={e => setCurrentWork(e.target.value)}
                                    />
                                    {errors.currentWork && <span className="msg_error">{errors.currentWork?.message}</span>}
                                </div>
                                <div className="frm_grp required">
                                    <label>รายได้ต่อเดือน</label>
                                    <input
                                        {...register("income", { required: "รายได้ต่อเดือนไม่ว่างเปล่า." })}
                                        type="text" placeholder="กรุณากรอกรายได้ต่อเดือนจากการทำงานเงินบาท"
                                        onChange={e => setIncome(e.target.value)}
                                    />
                                    {errors.income && <span className="msg_error">{errors.income?.message}</span>}
                                </div>
                                <div className="frm_grp required">
                                    <label>เบอร์ติดต่อ</label>
                                    <input
                                        {...register("contactNumber", { required: "เบอร์ติดต่อไม่ว่างเปล่า." })}
                                        type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ของคุณ"
                                        onChange={e => setContactNumber(e.target.value)}
                                    />
                                    {errors.contactNumber && <span className="msg_error">{errors.contactNumber?.message}</span>}
                                </div>
                                <div className="frm_grp required">
                                    <label>ที่อยู่ปัจจุบัน</label>
                                    <input
                                        {...register("currentAddress", { required: "ที่อยู่ปัจจุบันไม่ว่างเปล่า." })}
                                        type="text" placeholder="กรุณากรอกข้อมูลที่อยู่ปัจจุบัน"
                                        onChange={e => setCurrentAddress(e.target.value)}
                                    />
                                    {errors.currentAddress && <span className="msg_error">{errors.currentAddress?.message}</span>}
                                </div>
                                <div className="frm_grp required">
                                    <label>เบอร์ติดต่อฉุกเฉิน</label>
                                    <input
                                        {...register("otherContact", { required: "ที่อยู่ปัจจุบันไม่ว่างเปล่า." })}
                                        type="text" placeholder="โปรดป้อนหมายเลขโทรศัพท์ติดต่อฉุกเฉิน"
                                        onChange={e => setOtherContact(e.target.value)}
                                    />
                                    {errors.otherContact && <span className="msg_error">{errors.otherContact?.message}</span>}
                                </div>
                            </div>
                        </fieldset>

                        <fieldset>
                            <legend>คำเตือน:บัตรธนาคารที่คุณกรอกต้องเป็นตัวคุณเอง</legend>
                            <div className="frm_wrap">
                                <div className="frm_grp">
                                    <label>บัญชีธนาคาร</label>
                                    <select className="combobox" onChange={e => setBankName(e.target.value)}>
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
                                    <input
                                        {...register("bankAccount", { required: "จำเป็นต้องมีบัญชีธนาคาร." })}
                                        type="text" placeholder="กรุณากรอกหมายเลขบัตรธนาคาร"
                                        onChange={e => setBankAccount(e.target.value)}
                                    />
                                    {errors.bankAccount && <span className="msg_error">{errors.bankAccount?.message}</span>}
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
        </>
    )
}

export default Create