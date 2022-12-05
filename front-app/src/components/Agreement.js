import React from 'react'
import { Link } from 'react-router-dom'

const Agreement = () => {
    return (
        <>
            <div className="pop_wrap msg_wrap flexCenter">
                <div className="pop_inn mgbox_inn">
                    <div className="pop_content">
                        <div className="pop_msg">
                            <p>แน่ใจไหมว่าต้องการออกจากระบบบัญชีปัจจุบัน</p>
                        </div>
                    </div>
                    <div className="pop_footer">
                        <Link to="" className="btn_g100">ยกเลิก</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Agreement
