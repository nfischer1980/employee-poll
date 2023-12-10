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

export function addUser(user) {
  return {
    type: ADD_USER,
    user,
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
