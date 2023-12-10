import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authUser";
import Avatar from "react-avatar";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
  const navigate = useNavigate();

  console.log(props);

  const handleLogOut = (e) => {
    e.preventDefault();
    props.dispatch(logout());
    navigate("/signin");
  };

  return (
    <nav className="navbar">
      <div className="nav-poll">
        <ul className="nav-list">
          {props.isAuthenticated && (
            <li className="nav-item">
              <Link data-testid="home-link" className="nav-link" to="/">
                Home
              </Link>
            </li>
          )}
          {props.isAuthenticated && (
            <li className="nav-item">
              <Link data-testid="add-link" className="nav-link" to="/add">
                New Question
              </Link>
            </li>
          )}
          {props.isAuthenticated && (
            <li className="nav-item">
              <Link
                data-testid="leaderboard-link"
                className="nav-link"
                to="/leaderboard"
              >
                Leaderboard
              </Link>
            </li>
          )}
          <li className="nav-item">
            {!props.isAuthenticated && (
              <Link data-testid="signin-link" className="nav-link" to="/SignIn">
                Sign In
              </Link>
            )}
          </li>
          <li className="nav-item">
            {props.isAuthenticated && (
              <a
                data-testid="logout-link"
                className="nav-link"
                href="/signin"
                onClick={handleLogOut}
              >
                Logout
              </a>
            )}
          </li>
          <li className="nav-item nav-link">
            {props.isAuthenticated && (
              <p data-testid="username-link">
                {props.users[props.authUser]?.name}
              </p>
            )}
          </li>
          <li className="nav-item">
            {props.isAuthenticated && (
              <Avatar
                alt={props.users[props.authUser]?.name}
                src={`${props.users[props.authUser]?.avatarURL}.PNG`}
                size="40"
              />
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

function mapStateToProps({ users, authUser }) {
  return {
    authUser,
    users,
    isAuthenticated: authUser !== null,
  };
}

export default connect(mapStateToProps)(Nav);
