import { connect } from "react-redux";
import User from "./User";

const Leaderboard = (props) => {
  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <div className="leaderboard-array">
        <ul className="user-list" data-testid="user-list">
          {props.userIds.map((id, index) => (
            <li key={id} className="user-info">
              <div>
                <User id={id} position={index} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ users, authUser }) => ({
  userIds: Object.keys(users).sort(
    (a, b) =>
      Object.values(users[b].answers).length +
      users[b].questions.length -
      (Object.values(users[a].answers).length + users[a].questions.length)
  ),
  isAuthenticated: authUser !== null,
});

export default connect(mapStateToProps)(Leaderboard);
