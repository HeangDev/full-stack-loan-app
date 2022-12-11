import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Swal from 'sweetalert2'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";


const DataTableCustomer = () => {

    
    const [search, setSearch] = useState([])
    const [customers, setCustomers] = useState([])
    const [filteredCustomers, setFilteredCustomers] = useState([])
    let number = 1

    const getCustomer = async () => {
       try {
        const response = await axios.get("http://127.0.0.1:8000/api/customer");
        setCustomers(response.data);
        setFilteredCustomers(response.data);
       } catch (err) {
            console.log(err);
       }
    };

    const columns = [
        {
            name: "#",
            selector: (row) => number++,
        },
        {
            name: "ลูกค้าโทร",
            selector: (row) => row.tel,
        },
        {
            name: "เครดิต",
            selector: (row) => row.credit,
        },
        {
            name: "ข้อมูลอื่น",
            selector: (row) => 
            row.status === 'complete' ?
            <span className="status_green">กรอกข้อมูลแล้ว</span>
            :
            <span className="status_red">ไม่สมบูรณ์</span>,
        },
        {
            name: "ลายเซ็น",
            selector: (row) => 
            row.sign_status === '1' ?
            <span className="status_green">เซ็นชื่อเรียบร้อยแล้วค่ะ</span>
            :
            <span className="status_red">ยังไม่ได้เซ็นชื่อค่ะ</span>,
        },
        {
            name: "สถานะการกู้",
            selector: (row) => <span className='status_orange'>กำหลังดำเนินการ</span>,
        },
        {
            name: "รหัสถอน",
            selector: (row) => <span className='status_green'>6587</span>,
        },
        {
            name: "ตัวเลือก",
           cell: (row) => [
            row.status == 'complete' ?
            <Link to={`/customer/edit/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>
            :
            <Link to={`/customer/create/${row.id}`} className="btn_edit"><AiOutlineEdit/></Link>,
           
            <Link to={`/customer/changepassword/${row.id}`} className="btn_change"><AiOutlineLock/></Link>,
            <Link to={`/customer/${row.id}`} className="btn_show"><BiShowAlt/></Link>,
            <button type="button" onClick={() => handleDelete(row.id)} className="btn_delete"><AiOutlineDelete/></button>
           ]
        },

    ];

    useEffect(() => {
        getCustomer()
    }, []);

    useEffect(() => {
        const result = customers.filter(customer => {
            return customer.tel.toLowerCase().match(search.toLowerCase());
        });
        setFilteredCustomers(result);
    }, [search]);

  return (< DataTable
    title="รายชื่อลูกค้า" 
    columns={columns}
    data={filteredCustomers}
    pagination
    highlightOnHover
    actions={
        <Link to='/customer/create' className='btn btn_save'>
            <span>เพิ่มลูกค้าใหม่</span>
        </Link>
    }
    subHeader
    subHeaderComponent={
        <input type='text'
            placeholder='Search here'
            className="w-2/5 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outlinel"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
    }
    noDataComponent="กำสังโหลดข้อมูล"
    
  />
);
};

export default DataTableCustomer
