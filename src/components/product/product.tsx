import React, { useState } from "react";
import axiosClient from "../axiosClient";
import CATEGORY from "../category/category";
import SUPPLIER from "../supplier/suppiler";
import numeral from "numeral";
type Props = {};
interface ProductUpdate {
  name: string;
  price: string;
  discount: string;
  stock: string;
  categoryId: string;
  supplierId: string;
  category: {
    id: string;
    name: string;
    description: string;
  };
  supplier: {
    id: string;
    name: string;
    email: string;
    address: string;
    phoneNumber: string;
  };
  orderDetails:{
    orderId: string;
    productId: string;
    quantity: string;
    price: string;
    discount:string;
  }

}
export default function product({}: Props) {


  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [refresh, setRefresh] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [idedit, setIdEdit] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [suppliers, setSuppliers] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [product, setProduct] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    categoryId: "",
    supplierId: "",
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [productupdate, setProductUpdate] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    categoryId: "",
    supplierId: "",
  });



  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [itemsPerPage] = useState(8); // You can adjust the number of items per page
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {


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
    const getData = async () => {
      try {
        setLoading(true);
        const response: any = await axiosClient.get("/online-shop/suppliers");
        setSuppliers(response.data);
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
        const response: any = await axiosClient.get("/online-shop/categories");
        setCategories(response.data);
      } catch (error) {
        console.log("Failed to fetch data: ", error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [refresh]);
  const handleDelete = async (id: any) => {
    try {
      const response: any = await axiosClient.delete(
        `/online-shop/products/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      console.log(response);

      
      setRefresh(!refresh);
    } catch (error) {
      console.log("Failed to fetch data: ", error);
    }
  };
  // add Product
  const addProduct = async () => {
    console.log(product);
    try {
      const response = await axiosClient.post(
        "/online-shop/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("access_token"),
          },
        }
      );
      setProduct({
        name: "",
        price: "",
        discount: "",
        stock: "",
        categoryId: "",
        supplierId: "",
      });
      setRefresh(!refresh);
      if (response.status === 201) {
      
      }
      console.log(response);
    } catch (err) {
    
    }
  };

  const handleInputChange = (e : any) => {
    const { name, value } = e.target;
  
 
    const newValue = ["price", "discount", "categoryId", "supplierId", "stock"].includes(name) ? parseFloat(value) : value;
  
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: newValue,
    }));
  };

  const handleInputChangeEdit = (e: any) => {
    const { name, value } = e.target;
 
     const newValue = ["price", "discount", "categoryId", "supplierId", "stock"].includes(name) ? parseFloat(value) : value;
  
     setProductUpdate((prevProduct) => ({
       ...prevProduct,
       [name]: newValue,
     }));
  };
  // edit product

  const editProduct = async () => {
    console.log(productupdate);
    try {
      const response = await axiosClient.patch(
        "/online-shop/products/" + idedit,
        productupdate,
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
  const productEdit = (id: any) => {
    setIdEdit(id);
    const oldProduct = products.find((product) => product["id"] === id);
    if (oldProduct) {
      const { id, ...newObj } = oldProduct as { id: any; [key: string]: any };
      setProductUpdate(newObj as ProductUpdate);
    } else {
  
      console.error(`Product with ID ${id} not found`);
    }
  };

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
                  Modal title
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
                  <label htmlFor="productName" className="form-label">
                    Name Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productName"
                    placeholder="Enter product name"
                    name="name"
                    value={product.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Price Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productPrice"
                    value={product.price}
                    placeholder="Enter product price"
                    name="price"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Discount Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productDiscount"
                    value={product.discount}
                    placeholder="Enter product discount"
                    name="discount"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Stock Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="productStock"
                    value={product.stock}
                    placeholder="Enter product stock"
                    name="stock"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Category Product:
                  </label>
                  <select
                    className="form-select"
                    id="productCategory"
                    value={product.categoryId}
                    onChange={handleInputChange}
                    name="categoryId"
                    required
                  >
                    <option value="" disabled>
                      Select product category
                    </option>
                    {categories.map((category : any, index : number) => (
                      <option value={category.id}>{category.name}</option>
                    ))}

                
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Supplier Product:
                  </label>
                  <select
                    className="form-select"
                    id="productSupplier"
                    value={product.supplierId}
                    onChange={handleInputChange}
                    name="supplierId"
                    required
                  >
                    <option value="" disabled>
                      Select product supplier
                    </option>
                    {suppliers.map((supplier : any, index : number) => (
                      <option value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
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
                  onClick={addProduct}
                  className="btn btn-success"
                >
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="update"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Modal title
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
                  <label htmlFor="ProductName" className="form-label">
                    Name Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProductName"
                    placeholder="Enter Product name"
                    name="name"
                    value={productupdate.name}
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Price Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProductPrice"
                    value={productupdate.price}
                    placeholder="Enter Product price"
                    name="price"
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Discount Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProductDiscount"
                    value={productupdate.discount}
                    placeholder="Enter Product discount"
                    name="discount"
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Stock Product:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ProductStock"
                    value={productupdate.stock}
                    placeholder="Enter Product stock"
                    name="stock"
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Category Product:
                  </label>
                  <select
                    className="form-select"
                    id="productCategory"
                    value={productupdate.categoryId}
                    onChange={handleInputChangeEdit}
                    name="categoryId"
                    required
                  >
                    <option value="" disabled>
                      Select product category
                    </option>
                    {categories.map((category : any, index : number) => (
                      <option value={category.id}>{category.name}</option>
                    ))}

                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="ProductIcon" className="form-label">
                    Supplier Product:
                  </label>
                  <select
                    className="form-select"
                    id="productSupplier"
                    value={productupdate.supplierId}
                    onChange={handleInputChangeEdit}
                    name="supplierId"
                    required
                  >
                    <option value="" disabled>
                      Select product supplier
                    </option>
                    {suppliers.map((supplier : any, index : number) => (
                      <option value={supplier.id}>{supplier.name}</option>
                    ))}
                  </select>
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
                  onClick={editProduct}
                  className="btn btn-success"
                >
                  Update Product
                </button>
              </div>
            </div>
          </div>
        </div>
        <h1>List products</h1>
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Product
        </button>
        {loading && <div>Loading ...</div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sản phẩm</th>
              <th>Giá cả</th>
              <th>Giảm giá</th>
              <th>Số lượng</th>
              <th>Loại sản phẩm</th>
              <th>Nhà cung cấp</th>
              <th>Hàng động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((product: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{product.name}</td>

                  <td>{numeral(product.price).format("0,0")}</td>
                  <td>{numeral(product.discount).format("0,0.00")}%</td>
                  <td>{product.stock} </td>
                  <td>{product?.category?.name}</td>
                  <td>{product?.supplier?.name}</td>

                  <td>
                    <button
                      onClick={() => productEdit(product.id)}
                      type="button"
                      className="btn btn-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#update"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      className="btn btn-danger ms-2"
                      type="button"
                      onClick={() => {
                        return (
                          window.confirm("Are you sure?") &&
                          handleDelete(product.id)
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
              { length: Math.ceil(products.length / itemsPerPage) },
              (_, index) => (
                <li
                  className={`page-item ${
                    currentPage === index ? "active" : ""
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
              className={`page-item ${
                currentPage === totalPages - 1 ? "disabled" : ""
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
    </>
  );
}
