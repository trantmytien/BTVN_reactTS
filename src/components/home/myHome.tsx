import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "./myHome.css";
import dataArray1 from "./dataAdmin";
import NavBAR from "../navBar/navBar";
import Category from "../category/category";
import Order from '../order/order'
import Product from '../product/product'
import Supplier from '../supplier/suppiler'
import Customer from '../customer/customer'
import Dash from '../dashBoard/dashboard'
import Employee from '../employee/employees'

type Props = {};

export default function myHome({}: Props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [hidden, setHidden] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [clickedLinkId, setClickedLinkId] = useState(1);
  return (
    <BrowserRouter>
      <div className="container-fluid admin">
        <div className="admin_left">
          <div className="left_laptop">
            <div className="header_admin_left">
              <h1 className={hidden ? "" : "hidden"}>TIEN</h1>
              <h1 className={hidden ? "hidden" : ""}>T</h1>
              <div className="icon" onClick={() => setHidden(!hidden)}>
                <i className={`fa-solid fa-bars ${hidden ? "" : "hidden"}`}></i>
                <i
                  className={`fa-solid fa-hand-point-right ${
                    hidden ? "hidden" : ""
                  }`}
                ></i>
              </div>
            </div>
            <hr />
            {dataArray1.map((item) => (
              <Link
                key={item.id}
                className={`group ${
                  clickedLinkId === item.id ? "clicked" : ""
                }`}
                to={item.link}
                onClick={() => setClickedLinkId(item.id)}
              >
                <i className={item.icon}></i>
                <p className={hidden ? "" : "hidden"}>{item.name}</p>
              </Link>
            ))}
          </div>
          <div className="left_mobile">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <a className="navbar-brand" href="#">
                  Sufee Admin
                </a>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler">
                    <i className="fa-solid fa-bars"></i>
                  </span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    {dataArray1.map((item) => (
                      <Link
                        key={item.id}
                        className={`nav-item ${
                          clickedLinkId === item.id ? "clicked" : ""
                        }`}
                        to={item.link}
                        onClick={() => setClickedLinkId(item.id)}
                      >
                        <i className={item.icon}></i>
                        <a
                          className={`nav-link ${
                            clickedLinkId === item.id ? "clicked" : ""
                          }`}
                          href="#"
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
        <div className="admin_right">
          <NavBAR />
          <Routes>
            <Route path="/" element={<Dash></Dash>} />
            <Route  path="/categories" element={<Category></Category>} />
            <Route path="/products" element={<Product></Product>} />
            <Route path="/orders" element={<Order></Order>} />
           <Route path="/customers" element={<Customer></Customer>}/>
           <Route path="/employeers" element={<Employee></Employee>}/>
            <Route path="/suppliers" element={<Supplier></Supplier>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
