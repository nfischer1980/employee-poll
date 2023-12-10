import Avatar from "react-avatar";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Question = ({ id, author, timestamp, optionOne, OptionTwo, avatar }) => {
  let text = optionOne + " or ...";
  return (
    <Link to={`/questions/${id}`} className="question">
      <div className="question-info" data-testid="question-extract">
        <Avatar alt={author} src={`${avatar}.PNG`} size="40" />
        <p>
          {author} - {timestamp}
        </p>
        <p>{text}</p>
      </div>
    </Link>
  );
};

export default connect()(Question);
