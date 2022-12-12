import React from 'react'
import Layout from '../../layout/Layout'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import axios from 'axios'
import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock } from "react-icons/ai";
import { BiShowAlt } from "react-icons/bi";
import DataTableCustomer from '../../components/DataTableCustomer';


const Index = () => {

    const getCustomer = async () => {
        try {
            const response = await axios.get("http://127.0.0.1:8000/api/customer");
            setCustomers(response.data);
            setFilteredCustomers(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    
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

        await axios.delete(`http://127.0.0.1:8000/api/customer/${id}`).then(({data}) => {
            Swal.fire({
                title: 'Success!',
                text: "User has been deleted!",
                icon: "success",
                timer: '1500'
            })
            fetchCustomer()
        }).catch(({err}) => {
            console.log(err)
        })
    }

    return (
        <>
            <Layout>
                <DataTableCustomer />
            </Layout>
        </>
    )
}

export default Index
