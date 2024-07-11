import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteParticipant } from "../../../services/apiService";
import { toast } from "react-toastify";

const ModalDeleteUser = (props) => {
  const {
    show,
    setShow,
    userDelete,
    setUserDelete,
    fetchUserList,
    setCurrentPage,
  } = props;

  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  const handleClose = async () => {
    setCurrentPage(1);
    await fetchUserList(1);
    setUserDelete({});
    setShow(false);
  };

  const handleDelete = async () => {
    try {
      const res = await deleteParticipant(userId);
      console.log(res);
      toast.success("Delete user successfully");
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userDelete) {
      setEmail(userDelete.email);
      setUserId(userDelete.id);
    }
  }, [userDelete]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to remove user with email: <b>{email}</b> ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteUser;
