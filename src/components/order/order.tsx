import React, { useState } from "react";
import CUSTOM from "../customer/customer";
import EMPLOY from "../employee/employees";
import axiosClient from "../axiosClient";
import second from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "antd";
import dayjs from 'dayjs'

type Props = {};

interface OrdersUpdate {
  createdDate: Date;
  shippedDate: string;
  shippingAddress: string;
  shippingCity: string;
  paymentType: string;
  status: string;
  description: string;
  customerId: string;
  employeeId: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    birthday: string;
  };
  employee: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: string;
    birthday: string;
  };
}
interface OrderDetails {
  "id": 0,
  "createdDate": "string",
  "shippedDate": "string",
  "shippingAddress": "string",
  "shippingCity": "string",
  "paymentType": "string",
  "status": "string",
  "description": "string",
  "customerId": 0,
  "employeeId": 0,
  "customer": {
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "address": "string",
    "phoneNumber": "string",
    "birthday": "string"
  },
  "employee": {
    "id": 0,
    "firstName": "string",
    "lastName": "string",
    "email": "string",
    "address": "string",
    "phoneNumber": "string",
    "birthday": "string"
  },
  "orderDetails": [
    {
      "orderId": 0,
      "productId": 0,
      "quantity": 0,
      "price": 0,
      "discount": 0,
      "product": {
        "id": 0,
        "name": "string",
        "description": "string",
        "price": 0,
        "discount": 0,
        "stock": 0,
        "categoryId": 0,
        "supplierId": 0,
        "category": {
          "id": 0,
          "name": "string",
          "description": "string"
        },
        "supplier": {
          "id": 0,
          "name": "string",
          "email": "string",
          "address": "string",
          "phoneNumber": "string"
        }
      }
    }
  ]
}
export default function order({ }: Props) {
  //  eslint-disable-next-line react-hooks/rules-of-hooks
  const [refresh, setRefresh] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [idedit, setIdEdit] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [orders, setorders] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [orderDetaild, setorderDetaild] = useState<OrderDetails | null>(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [customer, setcustomer] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [employee, setemployee] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [order, setorder] = useState({
    createdDate: "",
    shippedDate: "",
    shippingAddress: "",
    shippingCity: "",
    paymentType: "",
    status: "",
    description: "",
    customer: "",
    employee: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [orderupdate, setorderUpdate] = useState({
    createdDate: "",
    shippedDate: "",
    shippingAddress: "",
    shippingCity: "",
    paymentType: "",
    status: "",
    description: "",
    customer: "",
    employee: "",
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [itemsPerPage] = useState(8); // You can adjust the number of items per page
  const totalPages = Math.ceil(orders.length / itemsPerPage);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [products, setProducts] = useState([]);
  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {


    const getData = async () => {
      try {
        setLoading(true);
        const response: any = await axiosClient.get("/online-shop/orders");
        setorders(response.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [refresh]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const response: any = await axiosClient.get("/online-shop/customers");
        setcustomer(response.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [refresh]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useEffect(() => {
      // Async / Await
  
      const getData = async () => {
        try {
          setLoading(true);
          const response: any = await axiosClient.get("/online-shop/products");
          setProducts(response.data);
        } catch (error) {
          console.log("Failed to fetch data: ", error);
        } finally {
          setLoading(false);
        }
      };
  
      getData();
    }, [refresh]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    // Async / Await

    const getData = async () => {
      try {
        setLoading(true);
        const response: any = await axiosClient.get("/online-shop/employees");
        setemployee(response.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [refresh]);
  const handleDelete = async (id: string) => {
    try {
      const response: any = await axiosClient.delete(
        `/online-shop/orders/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response);

      // Refresh state
      setRefresh(!refresh);
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  };
  // add order
  const addorder = async () => {
    console.log(order);
    try {
      const response = await axiosClient.post("/online-shop/orders", order, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setorder({
        createdDate: "",
        shippedDate: "",
        shippingAddress: "",
        shippingCity: "",
        paymentType: "",
        status: "",
        description: "",
        customer: "",
        employee: "",
      });
      setRefresh(!refresh);
      if (response.status === 201) {

      }
      console.log(response);
    } catch (err) {

    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;

    const newValue = ["customerId", "employeeId"].includes(name)
      ? parseFloat(value)
      : value;

    setorder((prevorder) => ({
      ...prevorder,
      [name]: newValue,
    }));
  };

  const handleInputChangeEdit = (e: any) => {
    const { name, value } = e.target;
    const newValue = ["customerId", "employeeId"].includes(name)
      ? parseFloat(value)
      : value;

    setorderUpdate((prevorder) => ({
      ...prevorder,
      [name]: newValue,
    }));
  };
  // edit order
  console.log(orders);
  const editorder = async () => {
    console.log(orderupdate);
    try {
      const response = await axiosClient.patch(
        "/online-shop/orders/" + idedit,
        orderupdate,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response);

      setRefresh(!refresh);
    } catch (err) {
      console.error(err);
    }
  };

  const orderDetail = (id: any) => {

    const newoke = orders.find((element) => element["id"] == id);
    if (newoke) {
      setorderDetaild(newoke);
    }
  }

  
  return (
    <>
      <div className="container">
        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Order Details
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="orderIcon" className="form-label">
                    Customer:
                  </label>
                  <select
                    className="form-select"
                    id="orderCustmer"
                    value={order.customer}
                    onChange={handleInputChange}
                    name="customerId"
                    required
                  >
                    <option value="" disabled>
                      Select customer
                    </option>
                    {customer.map((customer: any, index: number) => (
                      <option value={customer.id}>{customer.lastName}</option>
                    ))}

            
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="orderIcon" className="form-label">
                    Employee:
                  </label>
                  <select
                    className="form-select"
                    id="orderEmployee"
                    value={order.employee}
                    onChange={handleInputChange}
                    name="employeeId"
                    required
                  >
                    <option value="" disabled>
                      Select employee
                    </option>
                    {employee.map((employee: any, index: number) => (
                      <option value={employee.id}>{employee.lastName}</option>
                    ))}

           
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="orderIcon" className="form-label">
                    Description:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="orderDes"
                    value={order.description}
                    placeholder="Enter order des"
                    name="description"
                    onChange={handleInputChange}
                    required
                  />
                </div>


              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="submit"
                  onClick={addorder}
                  className="btn btn-success"
                >
                  Add order
                </button>
              </div>
            </div>
          </div>
        </div>

        <h1>List order</h1>
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add order
        </button>
        {loading && <div>Loading ...</div>}
        <div className="table-responsive mt-5">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>STT</th>
                <th>Ngày tạo</th>
                <th>Tên khách hàng</th>
                <th>Trạng thái</th>
                <th>Cart</th>
                <th>Total</th>
                <th>Mô tả</th>
                <th>Tên nhân viên</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order: any, index: number) => {
                return (
                  <tr key={index}>
                    <td>{index + 1 + currentPage * itemsPerPage}</td>
                    <td>{order.createdDate}</td>
                    <td>{order?.customer?.lastName}</td>
                    <td>{order.status} </td>
                    <td>{order?.orderDetails?.length}</td>

                    <td>
                      {order?.orderDetails?.map((detail: any) => {
                        var total = 0;
                        const { quantity, price, discount } = detail;
                        console.log(discount, quantity, price);
                        const discountedPrice = price - (price * discount / 100);
                        const totalProductPrice = discountedPrice * quantity;
                        total += totalProductPrice;
                        return Math.round(total);
                      })}
                    </td>

                    <td>{order.description} </td>
                    <td>{order?.employee?.lastName}</td>

                    <td>
                      <button
                        // onClick={() => orderEdit(order.id)}
                        type="button"
                        className="btn btn-outline-dark"
                        data-bs-toggle="modal"
                        data-bs-target="#orderdetail"
                        onClick={() => orderDetail(order.id)}
                      >
                        <i className="fa-solid fa-angle-right"></i>
                      </button>

                      <button
                        className="btn btn-danger ms-2"
                        type="button"
                        onClick={() => {
                          return (
                            window.confirm("Are you sure?") &&
                            handleDelete(order.id)
                          );
                        }}
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                aria-disabled="true"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="fa-solid fa-arrow-left"></i>
              </a>
            </li>
            {Array.from(
              { length: Math.ceil(orders.length / itemsPerPage) },
              (_, index) => (
                <li
                  className={`page-item ${currentPage === index ? "active" : ""
                    }`}
                  key={index}
                >
                  <a
                    className="page-link"
                    href="#"
                    onClick={() => paginate(index)}
                  >
                    {index + 1}
                  </a>
                </li>
              )
            )}
            <li
              className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""
                }`}
            >
              <a
                className="page-link"
                href="#"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      {/* modal */}
      <div className="modal fade" id="orderdetail" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Order Details</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Customer</th>
                    <th scope="col">Description</th>
                    <th scope="col">Status</th>
                    <th scope="col">Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetaild && (
                    <tr>
                      <th scope="row">{orderDetaild.id}</th>
                      <td>{orderDetaild?.customer?.lastName}</td>
                      <td>{orderDetaild.description}</td>
                      <td>{orderDetaild.status}</td>
                      <td>{orderDetaild?.employee?.lastName}</td>
                    </tr>
                  )}
                </tbody>
              </table>
              <h4>Products</h4>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Sum</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetaild && (
                    orderDetaild?.orderDetails.map((element) => (
                      <tr>
                        <th scope="row">{element?.product?.name}</th>
                        <td>{element?.price}</td>
                        <td>{element?.discount}</td>
                        <td>{element?.quantity}</td>
                        <td>{(element?.price - (element?.price * element?.discount / 100)) * element?.quantity}</td>
                        <td><button
                          className="btn btn-danger ms-2"
                          type="button"
                        >
                          <i className="fa-solid fa-trash-can"></i>
                        </button></td>
                      </tr>
                    ))

                  )}
                </tbody>
              </table>
              <label htmlFor="">Product</label>
              <select
                className="form-select"
                id="orderCustmer"
               
                name="customerId"
                required
              >
                <option value="" disabled>
                  Select customer
                </option>
                {products.map((product: any, index: number) => (
                  <option value={product.id}>{product.name}</option>
                ))}

                {/* Add more options as needed */}
              </select>
              <label htmlFor="">Quantity</label>
              <input
                    type="text"
                    className="form-control"
                    id="orderDes"
                    value={order.description}
                    placeholder="Enter order des"
                    name="description"
                    onChange={handleInputChange}
                    required
                  />
                  <button type="button" className="btn btn-primary mt-2">Save</button>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
