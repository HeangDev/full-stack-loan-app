import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

const Show = () => {
    const { id } = useParams()
    return (
        <>
            <h3 className="main_tit">สร้างระยะเวลา</h3>
            <div className="card_tbl">
                <div className="card_tbl_header">
                    <div className="btn_wrap mb-[10px]">
                        <Link to="/customer" className="btn btn_back">
                            <span>กลับ</span>
                        </Link>
                    </div>
                </div>
                <div className="card_tbl_body">
                    
                </div>
            </div>
        </>
    )
}

export default Show