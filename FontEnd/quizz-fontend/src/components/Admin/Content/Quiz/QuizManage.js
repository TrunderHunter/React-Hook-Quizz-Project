import { React, useState, useEffect } from "react";
import "./QuizManage.scss";
import Select from "react-select";
import {
  postCreateNewQuiz,
  getQuizList,
  putUpdateQuiz,
} from "../../../../services/apiService";
import { toast } from "react-toastify";
import TableQuiz from "./TableQuiz";
import { Accordion } from "react-bootstrap";
import ModelDeleteQuiz from "./ModelDeleteQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const QuizManage = (props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("EASY");
  const [image, setImage] = useState(null);
  const [quizSelected, setQuizSelected] = useState(null);
  const [showModelDelete, setShowModelDelete] = useState(false);
  const [listQuiz, setListQuiz] = useState([]);
  const [updating, setUpdating] = useState(false);

  const setFieldUpdating = (quiz) => {
    setUpdating(true);
    setName(quiz?.name ?? "");
    setDescription(quiz?.description ?? "");
    setDifficulty(quiz?.difficulty ?? "EASY");
    setImage(quiz?.image ?? null);
    setQuizSelected(quiz);
  };

  const handleCencelUpdate = () => {
    setUpdating(false);
    setName("");
    setDescription("");
    setDifficulty("EASY");
    setImage(null);
  };

  const handleUpdateQuiz = async () => {
    if (!name || !description || !difficulty) {
      toast.error("Please fill all field");
      return;
    }
    console.log(difficulty);
    let res = await putUpdateQuiz(
      quizSelected.id,
      name,
      description,
      difficulty,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setUpdating(false);
      setName("");
      setDescription("");
      setDifficulty("EASY");
      setImage(null);
      fetchData();
    } else {
      toast.error(res.EM);
    }
  };

  const fetchData = async () => {
    let res = await getQuizList();
    if (res && res.EC === 0) {
      setListQuiz(res.DT);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeImage = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleChangeOption = (selectedOption) => {
    setDifficulty(selectedOption);
  };

  const handleAddQuiz = async () => {
    if (!name || !description || !difficulty) {
      toast.error("Please fill all field");
      return;
    }
    let res = await postCreateNewQuiz(
      name,
      description,
      difficulty?.value,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      setName("");
      setDescription("");
      setDifficulty("EASY");
      setImage(null);
      fetchData();
    } else {
      toast.error(res.EM);
    }
  };

  const handleConfirmDelete = (quiz) => {
    setQuizSelected(quiz);
    setShowModelDelete(true);
  };

  return (
    <>
      <div className="quiz-container">
        <Accordion defaultActiveKey="0">
          <Accordion.Item eventKey="0" className="accordion-item mt-3">
            <Accordion.Header>Manage Quiz</Accordion.Header>
            <Accordion.Body>
              <hr />
              <div className="quiz-content">
                <div className="add-new-quiz">
                  <fieldset className="border p-2">
                    <legend className="float-none w-auto p-2">
                      Add New Quiz
                    </legend>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      <label htmlFor="floatingName">Name </label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingDescription"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <label htmlFor="floatingDescription">Description</label>
                    </div>
                    <div className="">
                      <Select
                        value={difficulty}
                        onChange={handleChangeOption}
                        selectedOption={difficulty}
                        defaultValue={options[0]}
                        options={options}
                      />
                    </div>
                    <div className="form-group my-3">
                      <label htmlFor="exampleFormControlFile1" className="mb-2">
                        Upload Image
                      </label>
                      <input
                        type="file"
                        className="form-control-file form-control"
                        id="exampleFormControlFile1"
                        onChange={handleChangeImage}
                      />
                    </div>
                    {updating ? (
                      <div>
                        <button
                          type="button"
                          className="btn btn-primary mt-3"
                          onClick={handleUpdateQuiz}
                        >
                          Update Quiz
                          <i className="fas fa-plus-circle ms-2"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger mt-3 ms-3"
                          onClick={handleCencelUpdate}
                        >
                          Cancel
                          <i className="fas fa-times-circle ms-2"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-primary mt-3"
                        onClick={handleAddQuiz}
                      >
                        Add Quiz
                        <i className="fas fa-plus-circle ms-2"></i>
                      </button>
                    )}
                  </fieldset>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <div className="row">
          <TableQuiz
            handleConfirmDelete={handleConfirmDelete}
            listQuiz={listQuiz}
            setFieldUpdating={setFieldUpdating}
          />
        </div>
        <ModelDeleteQuiz
          show={showModelDelete}
          setShow={setShowModelDelete}
          quizDelete={quizSelected}
          setQuizDelete={setQuizSelected}
          fetchData={fetchData}
        />
      </div>
    </>
  );
};

export default QuizManage;
