import React, {useState} from "react";
import axiosClient from "../axiosClient";
type Props = {};

interface SupplyUpdate {
  name: string;
  phoneNumber: string;
  email: string;
  address:string

}

export default function suppiler({}: Props) {
  // Refresh state

   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [refresh, setRefresh] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [idedit, setIdEdit] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [suppliers, setSuppliers] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Supply, setSupply] = useState({
    name: "",
    phoneNumber: "",
    email:"",
    address:""
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [Supplyupdate, setSupplyUpdate] = useState({
    name: "",
    phoneNumber: "",
    email:"",
    address:""
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [itemsPerPage] = useState(8); 
  const totalPages = Math.ceil(suppliers.length / itemsPerPage);

  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = suppliers.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

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
  const handleDelete = async (id: string) => {
    try {
      const response: any = await axiosClient.delete(
        `/online-shop/suppliers/${id}`,
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
  // add Supply
  const addSupply = async () => {
    try {
      const response = await axiosClient.post("/online-shop/suppliers", Supply, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setSupply({
        name: "",
        phoneNumber: "",
        email:"",
        address:""
      });
      setRefresh(!refresh);
      if (response.status === 201) {
  
      }
    } catch (err) {
   
    }
  };

  const handleInputChange = (e : any) => {

    const { name, value } = e.target;
    setSupply({ ...Supply, [name]: value });
    
};

const handleInputChangeEdit = (e : any) => {

  const { name, value } = e.target;

    setSupplyUpdate({ ...Supplyupdate, [name]: value });
};
// edit Supply 



const editSupply = async () => {
  console.log(Supplyupdate);
    try {
      const response = await axiosClient.patch('/online-shop/suppliers/' + idedit, Supplyupdate, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        },
      });
      console.log(response);

      setRefresh(!refresh);
    } catch (err: any) {
      console.error(err);
    }
  };

  const SupplyEdit = (id: any) => {
    setIdEdit(id);
    const oldSupply = suppliers.find((Supply) => Supply['id'] === id);
    if (oldSupply) {
      const { id, ...newObj } = oldSupply as { id: any, [key: string]: any };
      setSupplyUpdate(newObj as SupplyUpdate);
    } else {

      console.error(`Supply with ID ${id} not found`);
    }
  };

//   const schema = yup.object().shape({
//     name: yup.string().required('Tên không được bỏ trống'),
//     price: yup.number().required('Giá không được bỏ trống'),
//     discount: yup.number().required('Giảm giá không được bỏ trống'),
//     stock: yup.number().required('Số lượng tồn kho không được bỏ trống'),
//     description: yup.string().required('Mô tả không được bỏ trống'),
//     categoriesId: yup.number().required('ID danh mục không được bỏ trống'),
//     supplierId: yup.number().required('ID nhà cung cấp không được bỏ trống'),
// });
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
                  <label htmlFor="SupplyName" className="form-label">
                    Supplier Name :
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyName"
                    placeholder="Enter Supplier Name"
                    name="name"
                    value={Supply.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="SupplyIcon" className="form-label">
                   Supplier PhoneNumber:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyIcon"
                    value={Supply.phoneNumber}
                    placeholder="Enter Supplier Phonenumber"
                    name='phoneNumber'
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="SupplyIcon" className="form-label">
                  Supplier Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyIcon"
                    value={Supply.email}
                    placeholder="Enter Email Supplier"
                    name='email'
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="SupplyIcon" className="form-label">
                  Supplier Address:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyIcon"
                    value={Supply.address}
                    placeholder="Enter Address Supplier"
                    name='address'
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
                  onClick={addSupply}
                  className="btn btn-success"
                >
                  Add Supplier
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
                  <label htmlFor="SupplyName" className="form-label">
                    Supplier Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyName"
                    placeholder="Enter Supplier Name"
                    name="name"
                    value={Supplyupdate.name}
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="SupplyIcon" className="form-label">
                  Supplier PhoneNumber:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyIcon"
                    value={Supplyupdate.phoneNumber}
                    placeholder="Enter Phonenumber Supplier"
                    name='phoneNumber'
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="SupplyIcon" className="form-label">
                 Supplier Email:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyIcon"
                    value={Supplyupdate.email}
                    placeholder="Enter Email Supplier"
                    name='email'
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="SupplyIcon" className="form-label">
                  Supplier Addres:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="SupplyIcon"
                    value={Supplyupdate.address}
                    placeholder="Enter Address Supplier"
                    name='address'
                    onChange={handleInputChangeEdit}
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
                        onClick={editSupply}
                        className="btn btn-success"
                      >
                        Update Supplier
                      </button>
            
              </div>
            </div>
          </div>
        </div>
        <h1>List suppliers</h1>
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Supplier
        </button>
        {loading && <div>Loading ...</div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên nhà cung cấp</th>
              <th>Số điện thoại</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((Supply: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{Supply.name}</td>
                  {/* Truncate 100 characters */}
                  <td>{Supply.phoneNumber}</td>
                  <td>{Supply.email}</td>
                  <td>{Supply.address}</td>
                  <td>
                    <button onClick={() => SupplyEdit(Supply.id)} type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      className="btn btn-danger ms-2"
                      type="button"
                      onClick={() => {
                        return (
                          window.confirm("Are you sure?") &&
                          handleDelete(Supply.id)
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
              { length: Math.ceil(suppliers.length / itemsPerPage) },
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
  )
}