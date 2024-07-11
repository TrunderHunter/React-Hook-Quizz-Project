import { set } from "lodash";
import { React, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ViewUser = (props) => {
  const { show, setShow, user, setUser } = props;

  const [imgPreview, setImgPreview] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
      setRole(user.role);
      if (user.image) {
        setImgPreview(`data:image/png;base64,${user.image}`);
      }
    }
  }, [user]);

  const handleClose = () => {
    setImgPreview(null);
    setUser({});
    setShow(false);
  };
  return (
    <>
      <Modal
        size="xl"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Show user details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">User name : {username} </div>
            <div className="col-md-6">Email : {email}</div>
            <div className="col-md-6">Role : {role}</div>
            {/* View image */}
            <div className="col-md-12 preview-avatar">
              <div className="avatar">
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="avatar"
                    style={{ width: "80%", height: "80%", margin: "auto" }}
                  />
                ) : (
                  <span>No Avatar Here</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ViewUser;
