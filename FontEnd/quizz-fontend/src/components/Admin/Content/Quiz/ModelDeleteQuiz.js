import React from "react";
import { Modal, Button } from "react-bootstrap";
import { deleteQuizById } from "../../../../services/apiService";
import { toast } from "react-toastify";

const ModelDeleteQuiz = (props) => {
  const { show, setShow, quizDelete, setQuizDelete, fetchData } = props;

  const handleClose = () => {
    setQuizDelete({});
    setShow(false);
  };

  const handleDelete = async () => {
    let res = await deleteQuizById(quizDelete.id);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
    fetchData();
    setQuizDelete({});
    setShow(false);
  };

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
          Do you want to remove quiz with name: <b>{quizDelete?.name}</b> ?
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

export default ModelDeleteQuiz;
