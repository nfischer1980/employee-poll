import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleAddQuestion } from "../actions/shared";

const NewQuestion = (props) => {
  const navigate = useNavigate();
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const handleOptionOneChange = (e) => {
    const option = e.target.value;
    setOptionOne(option);
  };

  const handleOptionTwoChange = (e) => {
    const option = e.target.value;
    setOptionTwo(option);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    props.dispatch(handleAddQuestion(optionOne, optionTwo));

    setOptionOne("");
    setOptionTwo("");

    navigate("/");
  };

  return (
    <div className="question">
      <form className="new-question" onSubmit={handleSubmit}>
        <h5>Would you rather?</h5>
        <div>
          <label htmlFor="optionOne">Option One</label>
          <input
            data-testid="optionOne-input"
            type="text"
            name="optionOne"
            id="optionOne"
            value={optionOne}
            onChange={handleOptionOneChange}
            required
          />
        </div>
        <div>
          <label htmlFor="optionTwo">Option Two</label>
          <input
            data-testid="optionTwo-input"
            type="text"
            name="optionTwo"
            id="optionTwo"
            value={optionTwo}
            onChange={handleOptionTwoChange}
            required
          />
        </div>
        <button className="btn" type="submit" data-testid="submit-question">
          Submit
        </button>
      </form>
    </div>
  );
};

export default connect()(NewQuestion);
