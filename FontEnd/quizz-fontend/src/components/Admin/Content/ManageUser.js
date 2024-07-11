import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaCirclePlus } from "react-icons/fa6";
import { React, useState, useEffect } from "react";
import { getParticipantsWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [userChooses, setUserChooses] = useState({});
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const LIMIT_USER = 5;

  const [userList, setUserList] = useState([]);

  // const fetchUserList = async () => {
  //   try {
  //     const data = await getParticipants();
  //     setUserList(data.DT);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const fetchUserListWithPaginate = async (page) => {
    try {
      const data = await getParticipantsWithPaginate(page, LIMIT_USER);
      setUserList(data.DT.users);
      setPageCount(data.DT.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBtnUser = (user, modal) => {
    if (modal === "view") {
      setUserChooses(user);
      setShowModalViewUser(true);
    } else if (modal === "update") {
      setUserChooses(user);
      setShowModalUpdateUser(true);
    } else {
      setUserChooses(user);
      setShowModalDeleteUser(true);
    }
  };

  useEffect(() => {
    fetchUserListWithPaginate(1);
  }, []);

  return (
    <>
      <div className="manage-user-container">
        <div className="title">
          <h3>Mange Users</h3>
        </div>
        <div className="user-content">
          <div className="add-new-user">
            <button
              className="btn btn-primary"
              onClick={() => setShowModalCreateUser(true)}
            >
              <FaCirclePlus />
              Add New User
            </button>
          </div>

          <div className="user-list">
            <TableUserPaginate
              userList={userList}
              handleClickBtnUser={handleClickBtnUser}
              fetchUserList={fetchUserListWithPaginate}
              pageCount={pageCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchUserList={fetchUserListWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          userUpdate={userChooses}
          setUserUpdate={setUserChooses}
          fetchUserList={fetchUserListWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          user={userChooses}
          setUser={setUserChooses}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          userDelete={userChooses}
          setUserDelete={setUserChooses}
          fetchUserList={fetchUserListWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </>
  );
};

export default ManageUser;
