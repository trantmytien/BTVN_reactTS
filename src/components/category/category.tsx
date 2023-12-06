import React, {useState} from "react";
import axiosClient from "../axiosClient";
type Props = {};

interface CategoryUpdate {
  name: string;
  description: string;
}

export default function category({}: Props) {
  // Refresh state

   // eslint-disable-next-line react-hooks/rules-of-hooks
   const [refresh, setRefresh] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, setLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [idedit, setIdEdit] = useState(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [category, setCategory] = useState({
    name: "",
    description: ""
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categoryupdate, setCategoryupdate] = useState({
    name: "",
    description: ""
  });
  // Chạy 1 lần duy nhất khi component được render lần đầu tiên
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // Pagination state
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(0);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [itemsPerPage] = useState(8); // You can adjust the number of items per page
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  // Pagination logic
  const indexOfLastItem = (currentPage + 1) * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    // Async / Await

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

  const handleDelete = async (id: string) => {
    try {
      const response: any = await axiosClient.delete(
        `/online-shop/categories/${id}`,
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
  // add category
  const addCategory = async () => {
    try {
      const response = await axiosClient.post("/online-shop/categories", category, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setCategory({
        name: "",
        description: ""
      });
      setRefresh(!refresh);
      if (response.status === 201) {
        // message.success('Insert successfully');
      }
      console.log(response);
    } catch (err) {
      // console.error(err.response.data.message[0]);
      //   message.error(err.response.data.message[0]);
    }
  };

  const handleInputChange = (e : any) => {

    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
    
};

const handleInputChangeEdit = (e : any) => {

  const { name, value } = e.target;
  // Kiểm tra nếu name không phải là "id" thì mới cập nhật state
    setCategoryupdate({ ...categoryupdate, [name]: value });
};
// edit category 



const editCategory = async () => {
  console.log(categoryupdate);
    try {
      const response = await axiosClient.patch('/online-shop/categories/' + idedit, categoryupdate, {
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

  const categoryEdit = (id: any) => {
    setIdEdit(id);
    const oldCategory = categories.find((category) => category['id'] === id);
    if (oldCategory) {
      const { id, ...newObj } = oldCategory as { id: any, [key: string]: any };
      setCategoryupdate(newObj as CategoryUpdate);
    } else {
      // Handle the case where no category with the specified ID is found
      console.error(`Category with ID ${id} not found`);
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
                  <label htmlFor="categoryName" className="form-label">
                    Name Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Enter category name"
                    name="name"
                    value={category.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categoryIcon" className="form-label">
                  Description Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryIcon"
                    value={category.description}
                    placeholder="Enter category description"
                    name='description'
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
                  onClick={addCategory}
                  className="btn btn-success"
                >
                  Add Category
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
                  <label htmlFor="categoryName" className="form-label">
                    Name Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryName"
                    placeholder="Enter category name"
                    name="name"
                    value={categoryupdate.name}
                    onChange={handleInputChangeEdit}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="categoryIcon" className="form-label">
                  Description Category:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="categoryIcon"
                    value={categoryupdate.description}
                    placeholder="Enter category description"
                    name='description'
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
                        onClick={editCategory}
                        className="btn btn-success"
                      >
                        Update Category
                      </button>
            
              </div>
            </div>
          </div>
        </div>
        <h1>List Categories</h1>
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Category
        </button>
        {loading && <div>Loading ...</div>}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên danh mục</th>
              <th>Mô tả</th>
              <th>Hàng động</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((category: any, index: number) => {
              return (
                <tr key={index}>
                  <td>{index + 1 + currentPage * itemsPerPage}</td>
                  <td>{category.name}</td>
                  {/* Truncate 100 characters */}
                  <td>{category.description?.slice(0, 100)} ...</td>
                  <td>
                    <button onClick={() => categoryEdit(category.id)} type="button" className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#update">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      className="btn btn-danger ms-2"
                      type="button"
                      onClick={() => {
                        return (
                          window.confirm("Are you sure?") &&
                          handleDelete(category.id)
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
              { length: Math.ceil(categories.length / itemsPerPage) },
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
