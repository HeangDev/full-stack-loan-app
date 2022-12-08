import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Agreement = () => {
    const [agreement, setAgreement] = useState()
    let number = 1
    
    const fetchAgreement = async () => {
        await axios.get(`http://127.0.0.1:8000/api/agreement`).then(({data}) => {
            setAgreement(data)
            console.log(data)
        })
    } 

    useEffect(() => {
        fetchAgreement()
    }, [])


    const [showModal, setShowModal] = React.useState(false)

    return (
        <>
           {showModal ? (
                 <div className="pop_wrap msg_wrap flexCenter">
                 <div className="pop_inn mgbox_inn">
                     <div className="pop_content">
                         <div className="pop_msg">
                            { agreement && agreement.length > 0 && (
                                agreement.map((item, i ) => {
                                    return(
                                        <p>{item.description}แน่ใจไหมว่าต้องการออกจากระบบบัญชีปัจจุบัน</p>
                                    )
                                })
                             )
                            }
                         </div>
                     </div>
                     <div className="pop_footer">
                         <Link to="" className="btn_g100" onClick={() => setShowModal(false)}>ยกเลิก</Link>
                     </div>
                 </div>
             </div>
           ): null}
        </>
    )
}

export default Agreement
