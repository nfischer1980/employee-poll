import { connect } from "react-redux";
import Question from "./Question";
import { useState } from "react";

const Dashboard = (props) => {
  const [questionType, setQuestionType] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    setQuestionType(e.target.value === "answered");
  };
  return (
    <div className="dashboard">
      <h3 className="center">Questions</h3>
      <div className="tab">
        <button
          data-testid="answered-button"
          className="tablinks"
          onClick={handleClick}
          value="answered"
        >
          Answered
        </button>
        <button
          data-testid="unanswered-button"
          className="tablinks"
          onClick={handleClick}
          value="unanswered"
        >
          Unanswered
        </button>
      </div>
      <div className="question-list">
        {props.questions
          .sort((a, b) => a.timestamp - b.timestamp)
          .filter(
            (question) =>
              [
                ...question.optionOne.votes,
                ...question.optionTwo.votes,
              ].includes(props.authUser) === questionType
          )
          .map((question) => (
            <Question
              key={question.id}
              id={question.id}
              author={question.author}
              timestamp={question.timestamp}
              optionOne={question.optionOne.text}
              optionTwo={question.optionTwo.text}
              avatar={props.users[question.author].avatarURL}
            />
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, questions, authUser }) => ({
  users: users,
  isAuthenticated: authUser !== null,
  questions: Object.values(questions),
  authUser,
});

export default connect(mapStateToProps)(Dashboard);
