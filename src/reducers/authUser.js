import { LOGIN, LOGOUT } from "../actions/authUser";

export default function authUser(state = null, action) {
  switch (action.type) {
    case LOGIN:
      return action.id;
    case LOGOUT:
      return null;
    default:
      return state;
  }
}
