import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

const DepositDatatable = () => {
    const [deposit, setDeposit] = useState()

    const [depositAmount, setDepositAmount] = useState('')
    const [iddeposit, setIdDeposit] = useState('')
    const [updatewithdrawCode, setUpdateWithDrawCode] = useState('')
    const [updatedescription, setUpdateDescription] = useState('')

    const fetchDepositById = async () => {
        await axios.get(`http://127.0.0.1:8000/api/getdepositbyid/${id}`).then(({ data }) => {
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
            // console.log(data)
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

    const editDeposit = async (id) => {
        const iddeposit = id;
        setEditDepIsOpen(true)
        axios.get(`http://127.0.0.1:8000/api/deposit/${iddeposit}`).then((data) => {
            // console.log(data)
            const { deposit_amount, withdraw_code, description, id } = data.data
            setDepositAmount(deposit_amount);
            setUpdateWithDrawCode(withdraw_code);
            setUpdateDescription(description);
            setIdDeposit(id);
            console.log(data.data)

        }).catch(({ err }) => {
            console.log(err)
        })

    }

    const updateDeposit = async (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('_method', 'PATCH')
        formData.append('iddeposit', iddeposit)
        formData.append('updatewithdrawCode', updatewithdrawCode)
        formData.append('depositAmount', depositAmount)
        formData.append('updatedescription', updatedescription)

        axios.put(`http://127.0.0.1:8000/api/updatedepositbyid/${iddeposit}`, formData).then((data) => {
            console.log(data)
            Swal.fire({
                title: 'Success!',
                text: "แก้ไขสำเร็จ!",
                icon: "success",
                timer: '1500'
            })
            setEditDepIsOpen(false)
        }).catch(({err}) => {
            console.log(err)
        })
    }

    useEffect(() => {
        fetchDepositById()
    }, [])

    return (
        <>
            <div className="tbl_scroll">
                <table className="tbl">
                    <thead>
                        <tr>
                            <th>รหัสถอนเงิน</th>
                            <th>จำนวนเงิน</th>
                            <th>ลักษณะ</th>
                            <th>วันที</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            deposit && deposit.length > 0 && (
                                deposit.map((row, i) => (
                                    <tr key={i}>
                                        <td>{row.withdraw_code == null ? '-' : row.withdraw_code}</td>
                                        <td>{row.deposit_amount == null ? '-' : row.deposit_amount}</td>
                                        <td>{row.description == null ? '-' : row.description}</td>
                                        <td>{row.deposit_date == null ? 'ไม่มีข้อมูล' : row.deposit_date}</td>
                                        <td>
                                            <button className="btn_edit mx-2" onClick={() => editDeposit(row.id)} ><AiOutlineEdit /></button>
                                            <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete /></button>
                                        </td>

                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default DepositDatatable