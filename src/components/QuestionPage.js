import { connect } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { handleAnswerQuestion } from "../actions/shared";
import { useState } from "react";
import NotFound from "./NotFound";

const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};

const QuestionPage = (props) => {
  const questionExists = !(
    props.question === null || props.question === undefined
  );
  console.log("question exists: ", questionExists);

  const handleAnswerClick = (e) => {
    //answer question
    const { name } = e.target;
    props.dispatch(
      handleAnswerQuestion({
        answer: name,
        authedUser: props.authUser,
        qid: props.id,
      })
    );
    setHasAnswer(!hasAnswer);
  };

  const [hasAnswer, setHasAnswer] = useState(props.answered);
  if (!questionExists) {
    console.log("Displaying Not Found");
    return (
      <div>
        <NotFound reason="Invalid Question" />
      </div>
    );
  } else {
    return (
      <div className="question">
        <div className="question-info">
          <h4>Question Page</h4>
          <div className="author-infor">
            <img
              className="select-animal"
              alt={props.author.id}
              src={`../${props.author.avatarURL}.PNG`}
              width="40px"
              height="40px"
            />
            <span>{props.author.id}</span>
          </div>
          <div className="questions">
            <h5>Would You Rather</h5>
            {!hasAnswer && (
              <div>
                <button
                  data-testid="optionOne-button"
                  name="optionOne"
                  onClick={handleAnswerClick}
                >
                  {props.question.optionOne.text}
                </button>
                <p>or</p>
                <button
                  data-testid="optionTwo-button"
                  name="optionTwo"
                  onClick={handleAnswerClick}
                >
                  {props.question.optionTwo.text}
                </button>
              </div>
            )}
            {hasAnswer && (
              <div>
                <div
                  className={
                    props.question.optionOne.votes.includes(props.authUser)
                      ? "chosen-option"
                      : "other-option"
                  }
                >
                  <span>{props.question.optionOne.text}</span>
                  <p>
                    Number of Votes: {props.question.optionOne.votes.length}
                  </p>
                  <ul>
                    {props.question.optionOne.votes.map((vote, index) => (
                      <li
                        className={
                          vote === props.authUser ? "user-name" : "other-name"
                        }
                        key={vote + index}
                      >
                        {vote}
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className={
                    props.question.optionTwo.votes.includes(props.authUser)
                      ? "chosen-option"
                      : "other-option"
                  }
                >
                  <span>{props.question.optionTwo.text}</span>
                  <p>
                    Number of Votes: {props.question.optionTwo.votes.length}
                  </p>
                  <ul>
                    {props.question.optionTwo.votes.map((vote, index) => (
                      <li
                        className={
                          vote === props.authUser ? "user-name" : "other-name"
                        }
                        key={vote + index}
                      >
                        {vote}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};

const mapStateToProps = ({ authUser, questions, users }, props) => {
  const { question_id } = props.router.params;
  const question = questions[question_id];
  const answered = users[authUser]?.answers[question_id] !== undefined;
  let author = "";
  if (question !== undefined) {
    author = users[question.author];
  }

  return {
    id: question_id,
    author: author,
    question: question,
    authUser,
    user: users[authUser],
    answered,
  };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));
