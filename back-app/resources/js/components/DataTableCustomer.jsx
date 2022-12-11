import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios'
import Swal from 'sweetalert2'

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
            name: "ชื่อลูกค้า",
            selector: (row) => row.name,
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
            selector: (row) => row.tel,
        },
        {
            name: "ลายเซ็น",
            selector: (row) => row.tel,
        },
        {
            name: "สถานะการกู้",
            selector: (row) => row.tel,
        },
        {
            name: "รหัสถอน",
            selector: (row) => row.tel,
        },
        {
            name: "ตัวเลือก",
            selector: (row) => row.tel,
        },

    ];

    useEffect(() => {
        getCustomer()
    }, []);


  return (<DataTable
  title="รายชื่อลูกค้า" 
  columns={columns}
  data={customers}
  />
);
};

export default DataTableCustomer
