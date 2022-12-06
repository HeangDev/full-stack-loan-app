import React from 'react'
import Layout from '../../layout/Layout'

const Index = () => {
    return (
        <>
            <Layout>
            <h3 className="main_tit">เงินฝาก</h3>
                <div className="card_tbl">
                    <div className="card_tbl_header">
                        <div className="btn_wrap mb-[10px]">
                            <button type="button" className="btn btn_save">
                                <span>เบิกเงิน</span>
                            </button>
                        </div>
                    </div>
                    <div className="card_tbl_body">
                        <div className="tbl_scroll">
                            <table className="tbl">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ชื่อ</th>
                                        <th>ชื่อผู้ใช้</th>
                                        <th>สถานะ</th>
                                        <th>ตัวเลือก</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Index
