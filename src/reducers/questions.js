import {
  RECEIVE_QUESTIONS,
  ANSWER_QUESTION,
  ADD_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ANSWER_QUESTION:
      const { answer } = action;
      let newQuestion = {};
      if (answer.answer === "optionOne") {
        newQuestion = {
          ...state[answer.qid],
          optionOne: {
            ...state[answer.qid].optionOne,
            votes: state[answer.qid].optionOne.votes.concat(answer.authedUser),
          },
        };
      } else {
        newQuestion = {
          ...state[answer.qid],
          optionTwo: {
            ...state[answer.qid].optionTwo,
            votes: state[answer.qid].optionTwo.votes.concat(answer.authedUser),
          },
        };
      }
      return {
        ...state,
        [answer.qid]: newQuestion,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    default:
      return state;
  }
}
