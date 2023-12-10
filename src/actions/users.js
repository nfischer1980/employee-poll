import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveUser } from "../utils/api";
import { login } from "./authUser";

export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_USER = "ADD_USER";
export const ADD_USER_ANSWER = "ADD_USER_ANSWER";
export const ADD_USER_QUESTION = "ADD_USER_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

function addUser(user) {
  return {
    type: ADD_USER,
    user,
  };
}

export function handleAddUser(user) {
  return (dispatch) => {
    dispatch(showLoading());
    return saveUser(user)
      .then((newUser) => dispatch(addUser(newUser)))
      .then((action) => dispatch(login(action.user.id)))
      .then(() => dispatch(hideLoading));
  };
}

export function addUserAnswer(answer) {
  return {
    type: ADD_USER_ANSWER,
    answer,
  };
}

export function addUserQuestion(question) {
  return {
    type: ADD_USER_QUESTION,
    question,
  };
}
