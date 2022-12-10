import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

const Modal = () => {
    return (
        <>
            <div className="modal show">
                <div className="modal_dialog modal_top">
                    <div className="modal_content">
                        <div className="modal_header">
                            <h4 className="modal_title">Modal Heading</h4>
                            <button type="button" className="btn_close"><AiOutlineClose/></button>
                        </div>
                        <div className="modal_body">

                        </div>
                        <div className="modal_footer">
                            <button type="button" className="btn_close">ออกจาก</button>
                            <button type="button" className="btn_save">ประหยัด</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal