import React, { useState } from "react";
import Other_03 from "../assets/other_03.jpg";
import Safe_icon from '../assets/safe-icon.png'
const Wallet = () => {
  return (
    <>
      <div className="banner">
        <img src={Other_03} alt="" />
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
          <div className="px-8">
            <div className="frm_wrap border">
              <div className="frm_grp required">
                <input type="number" placeholder="ครุณาใส่รหัสถอนด้วยค่ะ" />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-[100%]">
            <button className="btn_b50">ถอน</button>
            
            <button className="btn_b50">ยกเลิก</button>
          </div>
        </div>
        <div className="windraw_des">
          <p className="tit_note">สถานะการกู้:</p>
          <p>คำเตือน:<br /></p>
          <p className="txt_note">
            <img src={Safe_icon} /> 
            <span>โปรดติดต่อฝ่ายบริการลูกค้าออนไลน์เพื่อขอรับรหัสถอนความปลอดภัยของเงินในบัญชีได้รับการประกันโดยธนาคาร</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Wallet;
