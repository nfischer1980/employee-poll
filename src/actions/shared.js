import {
  getInitialData,
  saveQuestion,
  saveQuestionAnswer,
  saveUser,
} from "../utils/api";
import { receiveQuestions, answerQuestion, addQuestion } from "./questions";
import { receiveUsers, addUserAnswer, addUserQuestion, addUser } from "./users";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { login } from "./authUser";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveQuestions(questions));
      dispatch(receiveUsers(users));
      dispatch(hideLoading());
    });
  };
}

export function handleAnswerQuestion(answer) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveQuestionAnswer(answer)
      .then(() => dispatch(answerQuestion(answer)))
      .then(() => dispatch(addUserAnswer(answer)))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddQuestion(optionOne, optionTwo) {
  return (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    return saveQuestion({
      optionOneText: optionOne,
      optionTwoText: optionTwo,
      author: authUser,
    })
      .then((formattedQuestion) => {
        dispatch(addQuestion(formattedQuestion));
        dispatch(addUserQuestion(formattedQuestion));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function handleAddUser(user) {
  return (dispatch) => {
    //dispatch(showLoading());
    return (
      saveUser(user)
        .then(() => dispatch(addUser(user)))
        //.then((action) => dispatch(login(action.user.id)))
        .then(() => dispatch(hideLoading))
      //.then(() => dispatch(hideLoading()))
    );
  };
}
