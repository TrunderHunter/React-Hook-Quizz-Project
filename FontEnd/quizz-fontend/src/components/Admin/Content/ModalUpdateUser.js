import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CiSquarePlus } from "react-icons/ci";
import "./ModalUpdateUser.scss";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../../services/apiService";
import _ from "lodash";

const ModalUpdateUser = (props) => {
  const {
    show,
    setShow,
    fetchUserList,
    userUpdate,
    setUserUpdate,
    currentPage,
  } = props;

  const handleClose = () => {
    setShow(false);
    setImg(null);
    setImgPreview(null);
    setEmail("");
    setPassword("");
    setUsername("");
    setRole("USER");
    setUserUpdate({});
  };

  const [userId, setUserId] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("ADMIN");

  useEffect(() => {
    if (!_.isEmpty(userUpdate)) {
      setUserId(userUpdate.id);
      setEmail(userUpdate.email);
      setPassword("**********");
      setUsername(userUpdate.username);
      setRole(userUpdate.role === "ADMIN" ? "ADMIN" : "USER");
      if (!_.isEmpty(userUpdate.image)) {
        setImgPreview(`data:image/png;base64,${userUpdate.image}`);
      }
    }
  }, [userUpdate]);

  const handleImageChange = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
      setImgPreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImg(null);
      setImgPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!username) {
      toast.error("Username is required");
      return;
    }

    try {
      let id = userId;
      const data = await putUpdateUser(id, username, role, img);
      if (data && data.EC === 0) {
        toast.success(data.EM);
        await fetchUserList(currentPage);
        setTimeout(() => {
          handleClose();
        }, 1000);
      } else {
        toast.error(data.EM);
      }
    } catch (error) {
      console.log(error);
      toast.error("Create user failed");
    }
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
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3">
            <div className="col-md-6">
              <label htmlFor="inputEmail4" className="form-label">
                Email
              </label>
              <input
                disabled
                value={email}
                type="email"
                className="form-control"
                id="inputEmail4"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputPassword4" className="form-label">
                Password
              </label>
              <input
                disabled
                value={password}
                type="password"
                className="form-control"
                id="inputPassword4"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputUsername4" className="form-label">
                Username
              </label>
              <input
                value={username}
                type="text"
                className="form-control"
                id="inputUsername4"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputRole" className="form-label">
                Role
              </label>
              <select
                id="inputRole"
                className="form-select"
                required
                onChange={(e) => setRole(e.target.value)}
                value={role}
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            {/* Upload image */}
            <div className="col-md-12 content-upload-avatar">
              <label htmlFor="formFile" className="form-label">
                <CiSquarePlus />
                Upload Avatar
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                hidden
                onChange={handleImageChange}
              />
            </div>
            {/* View image */}
            <div className="col-md-12 preview-avatar">
              <div className="avatar">
                {imgPreview ? (
                  <img
                    src={imgPreview}
                    alt="avatar"
                    style={{ width: "100%", height: "100%", margin: "auto" }}
                  />
                ) : (
                  <span>No Avatar</span>
                )}
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
