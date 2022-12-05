import React, { useState } from 'react'
import Other_03 from '../assets/other_03.jpg'

const Wallet = () => {
    return (
        <>
            <div className="banner">
                <img src={Other_03} alt=""/>
            </div>
            <div className="windraw_wrap">
                <div className="head_windraw">
                    <div className="left">
                        <h4 className="tit">จำนวนเงินที่ดำเนินการถอน (บาท)</h4>
                        <h3 className="des">0.00</h3>
                    </div>
                    <div className="right">
                        <h4 className="tit">จำนวนเงินสด (บาท)</h4>
                        <h3 className="des">0.00</h3>
                    </div>
                </div>
                <div>
                    <div>

                    </div>
                    <div>
                        <button>ถอน</button>
                        <button>ยกเลิก</button>
                    </div>
                </div>
                <div className="windraw_des">
                    <p className="tit_note">สถานะการกู้:</p>
                </div>
            </div>
        </>
    )
}

export default Wallet
