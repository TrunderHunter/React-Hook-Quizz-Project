import { React, useState } from "react";
import "./QuizManage.scss";
import Select from "react-select";

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

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChangeOption = (selectedOption) => {
    setDifficulty(selectedOption);
  };

  return (
    <>
      <div className="quiz-container">
        <div className="quiz-header">
          <h2>Manage Quiz</h2>
        </div>
        <hr />
        <div className="quiz-content">
          <div className="add-new-quiz">
            <fieldset className="border p-2">
              <legend className="float-none w-auto p-2">Add New Quiz</legend>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingName"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label for="floatingName">Name </label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingDescription"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label for="floatingDescription">Description</label>
              </div>
              <div className="">
                <Select
                  value={difficulty}
                  onChange={handleChangeOption}
                  placeholder="Select Difficulty"
                  options={options}
                />
              </div>
              <div className="form-group my-3">
                <label for="exampleFormControlFile1" className="mb-2">
                  Upload Image
                </label>
                <input
                  type="file"
                  class="form-control-file form-control"
                  id="exampleFormControlFile1"
                  onChange={handleChangeImage}
                />
              </div>
            </fieldset>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizManage;
