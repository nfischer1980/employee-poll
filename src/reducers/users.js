import {
  ADD_USER,
  RECEIVE_USERS,
  ADD_USER_ANSWER,
  ADD_USER_QUESTION,
} from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_USER:
      return {
        ...state,
        [action.user.id]: action.user,
      };
    case ADD_USER_ANSWER:
      let userWithNewAnswer = {
        ...state[action.answer.authedUser],
      };
      userWithNewAnswer.answers = {
        ...state[action.answer.authedUser].answers,
        [action.answer.qid]: action.answer.answer,
      };
      return {
        ...state,
        [action.answer.authedUser]: userWithNewAnswer,
      };
    case ADD_USER_QUESTION:
      let userWithNewQuestion = {
        ...state[action.question.author],
      };
      let questions = [];
      questions = [...userWithNewQuestion.questions, action.question.id];
      userWithNewQuestion.questions = questions;
      return {
        ...state,
        [action.question.author]: userWithNewQuestion,
      };
    default:
      return state;
  }
}
