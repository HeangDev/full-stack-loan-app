import React, { useState, useEffect } from "react";
import Layout from "../../layout/Layout";
import { Link, useParams } from "react-router-dom";
import Avatar from "../../assets/avatar.jpg";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";

const Show = () => {
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

    const fetchCustomer = async () => {
        await axios
            .get(`http://127.0.0.1:8000/api/customer/${id}`)
            .then(({ data }) => {
                //console.log(data)
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
                                <button type="button" className="btn btn_light">
                                    <MdAttachMoney/>
                                    <span>ใส่เครดิต</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card_profile_box_info mt-10">
                    <div className="card_profile_wrap">

                    </div>
                </div>
                <div className="modal show">
                    <div className="modal_dialog modal_top">
                        <div className="modal_content">
                            <div className="modal_header">
                                <h4 className="modal_title">สมัครขอสินเชื่อ</h4>
                                <button type="button" className="btn_close"><AiOutlineClose/></button>
                            </div>
                            <div className="modal_body">

                            </div>
                            <div className="modal_footer">
                                <button type="button" className="btn_close">ออกจาก</button>
                                <button type="button" className="btn_save">ประหยัด</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Show;
