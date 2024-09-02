import React, { useState, useEffect } from "react";
import {
  getQuizList,
  getParticipants,
  postAssignQuiz,
} from "../../../../services/apiService";
import Select from "react-select";
import { toast } from "react-toastify";

const AssignQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [listUser, setListUser] = useState([]);
  const [selectedOptionQuiz, setSelectedOptionQuiz] = useState(null);
  const [selectedOptionUser, setSelectedOptionUser] = useState(null);

  const fetchData = async () => {
    let res = await getQuizList();
    if (res && res.EC === 0) {
      let listQuiz = res.DT.map((quiz) => {
        return {
          value: quiz.id,
          label: `${quiz.id} - ${quiz.name}(${quiz.difficulty})`,
        };
      });
      // sort list quiz by id
      listQuiz.sort((a, b) => a.value - b.value);
      setListQuiz(listQuiz);
    }
  };

  const fetchUser = async () => {
    let res = await getParticipants();
    if (res && res.EC === 0) {
      let listUser = res.DT.map((user) => {
        return {
          value: user.id,
          label: `${user.id} - ${user.username} - ${user.email}`,
        };
      });
      // sort list user by id
      listUser.sort((a, b) => a.value - b.value);
      setListUser(listUser);
    }
  };

  useEffect(() => {
    fetchData();
    fetchUser();
  }, []);

  const handleAssignQuiz = async () => {
    if (selectedOptionQuiz && selectedOptionUser) {
      let res = await postAssignQuiz(
        selectedOptionQuiz.value,
        selectedOptionUser.value
      );
      console.log(">>>> Check res from postAssignQuiz", res);
      if (res && res.EC === 0) {
        toast.success("Assign quiz to user successfully");
      } else {
        toast.error(res.EM);
      }
    } else {
      toast.error("Please select quiz and user");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-6">
            <Select
              defaultValue={selectedOptionQuiz}
              onChange={setSelectedOptionQuiz}
              options={listQuiz}
            />
          </div>
          <div className="col-6">
            <Select
              defaultValue={selectedOptionUser}
              onChange={setSelectedOptionUser}
              options={listUser}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-12">
            <button
              className="btn btn-primary"
              onClick={() => handleAssignQuiz()}
            >
              Assign
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignQuiz;
