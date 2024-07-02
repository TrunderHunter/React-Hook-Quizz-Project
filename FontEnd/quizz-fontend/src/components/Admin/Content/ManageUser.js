import ModalCreateUser from "./ModalCreateUser";
import "./ManageUser.scss";
import { FaCirclePlus } from "react-icons/fa6";
import TableUser from "./TableUser";
import { React, useState, useEffect } from "react";
import { getParticipants } from "../../../services/apiService";
import ModalUpdateUser from "./ModalUpdateUser";
import ViewUser from "./ViewUser";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [showModalViewUser, setShowModalViewUser] = useState(false);
  const [userChooses, setUserChooses] = useState({});

  const [userList, setUserList] = useState([]);

  const fetchUserList = async () => {
    try {
      const data = await getParticipants();
      setUserList(data.DT);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickBtnUser = (user, modal) => {
    if (modal === "view") {
      setUserChooses(user);
      setShowModalViewUser(true);
    } else {
      setUserChooses(user);
      setShowModalUpdateUser(true);
    }
  };

  useEffect(() => {
    fetchUserList();
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
            <TableUser
              userList={userList}
              handleClickBtnUser={handleClickBtnUser}
            />
          </div>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchUserList={fetchUserList}
        />
        <ModalUpdateUser
          show={showModalUpdateUser}
          setShow={setShowModalUpdateUser}
          fetchUserList={fetchUserList}
          userUpdate={userChooses}
          setUserUpdate={setUserChooses}
        />
        <ViewUser
          show={showModalViewUser}
          setShow={setShowModalViewUser}
          user={userChooses}
          setUser={setUserChooses}
        />
      </div>
    </>
  );
};

export default ManageUser;
