import { LOGIN, LOGOUT } from "../actions/authUser";
import { ADD_USER } from "../actions/users";

export default function authUser(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.id;
    case LOGOUT:
      return null;
    case ADD_USER:
      console.log(action);
      return action.user.id;
    default:
      return state;
  }
}
