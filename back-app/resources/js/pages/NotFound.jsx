import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../layout/Layout'

const NotFound = () => {
    return (
        <>
            <Layout>
                <div className="not_found_wrap">
                    <h1 className="tit">404</h1>
                    <h4 className="sub_tit">ไม่พบหน้านี้</h4>
                    <p className="des">ดูเหมือนว่าคุณอาจจะเลี้ยวผิด อย่ากังวล... มันเกิดขึ้นกับสิ่งที่ดีที่สุดของเรา ต่อไปนี้เป็นเคล็ดลับเล็กๆ น้อยๆ ที่อาจช่วยให้คุณกลับมาสู่เส้นทางเดิมได้</p>
                    <Link to="/admin/dashboard">กลับบ้าน</Link>
                </div>
            </Layout>
        </>
    )
}

export default NotFound
