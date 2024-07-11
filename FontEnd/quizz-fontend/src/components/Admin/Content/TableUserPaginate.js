import ReactPaginate from "react-paginate";
import { React } from "react";

const TableUserPaginate = (props) => {
  const {
    userList,
    handleClickBtnUser,
    pageCount,
    setCurrentPage,
    currentPage,
  } = props;

  const handlePageClick = (event) => {
    props.fetchUserList(event.selected + 1);
    setCurrentPage(event.selected + 1);
  };
  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {!userList || userList.length === 0 ? (
            <tr>
              {/* Center the text */}
              <td colSpan="5" className="text-center">
                No user found
              </td>
            </tr>
          ) : (
            userList
              .sort((a, b) => a.id - b.id)
              .map((user, index) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="d-flex justify-content-center">
                    <button
                      className="btn btn-secondary"
                      onClick={() => handleClickBtnUser(user, "view")}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning mx-3"
                      onClick={() => handleClickBtnUser(user, "update")}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger "
                      onClick={() => handleClickBtnUser(user, "delete")}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel=" > "
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=" < "
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage - 1}
        />
      </div>
    </>
  );
};

export default TableUserPaginate;
