import { connect } from "react-redux";

const User = (props) => {
  const { id, name, avatarURL, answers, questions } = props.user;

  return (
    <div
      className={
        id === props.authUser ? "leaderboard-authuser" : "leaderboard-user"
      }
    >
      <h3 data-testid="user-rank">{props.index + 1}</h3>
      <img
        className="select-animal"
        alt={avatarURL}
        src={`${avatarURL}.PNG`}
        width="40px"
        height="40px"
      />
      <h2>{name}</h2>
      <h3>Questions: {questions.length}</h3>
      <h3>Answers: {Object.values(answers).length}</h3>
    </div>
  );
};

const mapStateToProps = ({ users, authUser }, { id, position }) => {
  const user = users[id];

  return {
    authUser,
    user,
    index: position,
  };
};

export default connect(mapStateToProps)(User);
