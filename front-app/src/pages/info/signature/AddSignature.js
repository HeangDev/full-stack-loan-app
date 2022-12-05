import React, { useState, useRef } from 'react'
import Header from '../../../components/Header'
import axios from 'axios'
import { useNavigate} from 'react-router-dom'
import SignaturePad from 'react-signature-canvas'

const AddSignature = () => {
    const [signature, setSignature] = useState()
    const sigCanvas = useRef({})
    const id_user = localStorage.getItem('auth_id')

    const navigate = useNavigate();

    const handleSignature = () => {
        const currentSignature = sigCanvas.current.getTrimmedCanvas().toDataURL("image/png")
        setSignature(currentSignature)
        
        const formData = new FormData()
        formData.append('id_user', id_user)
        formData.append('signature', currentSignature)

        axios.post(`http://127.0.0.1:8000/api/signature`, formData).then((data) => {
            //console.log(data)
            navigate('/info')
        }).catch(({err}) => {
            console.log(err)
        })
    }
    return (
        <>
            <Header url="/info" title="ลายเซ็นที่เขียนด้วยลายมือ"/>
            <div className="content">
                <form encType="multipart/form-data">
                    <div className="sign_wrap">
                        <SignaturePad canvasProps={{width: 380, height: 200, className: 'sigCanvas'}} ref={sigCanvas}/>
                        <p className="info">กรุณาลงชื่อด้านบน</p>
                    </div>
                    <div className="btn_wrap mt-10">
                        <button type="button" className="btn_b40" onClick={handleSignature}>ส่ง</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddSignature