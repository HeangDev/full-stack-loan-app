import React from 'react'

const Card = ({number, title, icon, bgcolor}) => {
    return (
        <>
            <div className="card">
                <div className="card_item">
                    <div className={`card_icon ${bgcolor}`} >                
                        {icon}
                    </div>
                    <div className="card_header">
                       <h4>{number}</h4>
                       <p>{title}</p> 
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
