import * as React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { PieChart } from "@mui/x-charts/PieChart";

const ModalResult = (props) => {
  const { show, setShow, dataModal } = props;
  const [dataChartPie, setDataChartPie] = React.useState([]);

  React.useEffect(() => {
    let data = [
      {
        id: "correct",
        value: dataModal.countCorrect,
        label: "Correct",
      },
      {
        id: "wrong",
        value: dataModal.countTotal - dataModal.countCorrect,
        label: "Wrong",
      },
    ];
    // If value wrong or correct is 0, remove it
    data = data.filter((item) => item.value !== 0);
    setDataChartPie(data);
  }, [dataModal]);

  const handleClose = async () => {
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
          <Modal.Title>Your Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="result">
            <div className="result-content">
              <div className="result-title">
                Total questions: <b>{dataModal.countTotal}</b>{" "}
              </div>
            </div>
            <div className="result-content">
              <div className="result-title">
                Correct answers: <b>{dataModal.countCorrect}</b>{" "}
              </div>
            </div>
            <div className="result-content">
              <div className="result-title">
                Wrong answers:{" "}
                <b>{dataModal.countTotal - dataModal.countCorrect}</b>{" "}
              </div>
            </div>
          </div>
          <div className="chart-pie">
            <PieChart
              series={[
                {
                  data: dataChartPie,
                  innerRadius: 16,
                  highlightScope: { faded: "global", highlighted: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              height={200}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary">Comfirm</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
