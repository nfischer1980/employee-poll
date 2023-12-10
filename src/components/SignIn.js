import { connect } from "react-redux";
import { useState } from "react";
import { login } from "../actions/authUser";
import { handleAddUser } from "../actions/users";
import { useNavigate, useLocation } from "react-router-dom";

const SignIn = (props) => {
  const [selectedUser, setSelectedUser] = useState("");
  const [newUser, setNewUser] = useState({
    name: "",
    id: "",
    password: "",
    avatarURL: "",
    department: "",
    answers: {},
    questions: [],
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location === undefined ? null : location.state;

  const avatars = ["cat", "dog", "fox", "gorilla", "koala", "lion", "tiger"];

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedUser(e.target.value);
    props.dispatch(login(e.target.value));
    navigate(from === null ? "/" : from);
  };

  const handleNewUserChange = (e) => {
    const { name, value, alt } = e.target;
    setNewUser({
      ...newUser,
      [name]: value ?? alt,
    });
  };

  const onSubmitNewUser = (e) => {
    e.preventDefault();
    props.dispatch(handleAddUser(newUser));
    setNewUser({
      name: "",
      id: "",
      password: "",
      avatarURL: "",
      department: "",
    });
    navigate(from === null ? "/" : from);
  };

  return (
    <div className="main-signin">
      <div className="signin-logas">
        <h2>Log As</h2>
        <label htmlFor="user-select">Choose a user</label>
        <select
          name="users"
          id="user-select"
          onChange={handleChange}
          value={selectedUser ?? "none"}
        >
          <option value="">user id</option>
          {props.users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
      <div className="signin-signup">
        <h2>Sign Up</h2>
        <form>
          <div className="set-id">
            <input
              type="text"
              name="id"
              value={newUser.id}
              placeholder="Choose Id"
              onChange={handleNewUserChange}
            />
          </div>
          <div className="set-name">
            <input
              type="text"
              name="name"
              value={newUser.name}
              placeholder="Name"
              onChange={handleNewUserChange}
            />
          </div>
          <div className="set-password">
            <input
              type="text"
              name="password"
              value={newUser.password}
              placeholder="password"
              onChange={handleNewUserChange}
            />
          </div>
          <div className="set-department">
            <select
              name="department"
              value={newUser.department}
              onChange={handleNewUserChange}
            >
              <option>Select a Department</option>
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div>
            <p>Select an avatar</p>
            {avatars.map((animal) => (
              <span
                key={animal}
                onClick={handleNewUserChange}
                className="select-animal"
              >
                <img
                  className="select-animal"
                  alt={animal}
                  src={`${animal}.PNG`}
                  width="40px"
                  height="40px"
                  value={animal}
                  name="avatarURL"
                />
              </span>
            ))}
          </div>
          <input type="submit" value="Create" onClick={onSubmitNewUser} />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authUser }) => ({
  users: Object.values(users),
  isAuthenticated: authUser !== null,
});

export default connect(mapStateToProps)(SignIn);
