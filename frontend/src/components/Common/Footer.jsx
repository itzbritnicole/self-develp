import React from 'react'
import logo from "../../assets/img/Hunger-icon.png"

const Footer = ({price,showCartList, setShowCartList}) => {
  return (
    <div>
        <div className="quality-button">
            {showCartList ? (
                <button onClick={()=>setShowCartList(false)}>
             Back to Home
            </button>
            ):(
            <button onClick={()=>setShowCartList(true)}>
                Check Cart
            </button>
            )
            }
           
           
            <p>Total Cost : ${price}</p>

        </div>

        <div className="contact">
            <img src={logo} alt=""/>
            <p>Premium Quality food at the best and most affordable price. <br/>
        we have a new offer every day for 365 days</p>
            <h1>contact</h1>
            <h6>E-mail : quickfood@Hungercaptian.com | Hotline: +1 131 138 138</h6>
        </div>
        <footer>
            <p>DESIGN BY HUNGER CAPTIAN - © 2022. ALL RIGHTS RESERVED.</p>
        </footer>
      
    </div>
  )
}

export default Footer
