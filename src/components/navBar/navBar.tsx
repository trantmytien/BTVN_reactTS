import React from 'react'
import "./navBar.css"
type Props = {}

export default function navBar({ }: Props) {
    return (
        <header>
            <div className="header_left">
                <i className="fa-solid fa-magnifying-glass"></i>
                <i className="fa-solid fa-bell"></i>
                <i className="fa-regular fa-envelope"></i>
            </div>
            <div className="header_right">
                <div className="logo">
                    <img src="https://investone-law.com/wp-content/uploads/2019/06/quoc-ky-viet-nam.jpg" alt="" />
                </div>
                <div className="avatar">
                    <img src="img.jpg" alt="" />
                </div>
            </div>
        </header>
    )
}