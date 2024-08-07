import React from "react";
import "./TableQuiz.scss";

const TableQuiz = (props) => {
  const { handleConfirmDelete, listQuiz, setFieldUpdating } = props;

  return (
    <>
      <div className="table-responsive-lg">
        <table className="table table-hover table-bordered mt-5">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Description</th>
              <th scope="col">Type</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {listQuiz && listQuiz.length > 0 ? (
              listQuiz
                .sort((a, b) => a.id - b.id)
                .map((quiz, index) => (
                  <tr key={index}>
                    <td>{quiz.id}</td>
                    <td>{quiz.name}</td>
                    <td>{quiz.description}</td>
                    <td>{quiz.difficulty}</td>
                    <td>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          setFieldUpdating(quiz);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleConfirmDelete(quiz)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan="5">No data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableQuiz;
