import { useNavigate } from "react-router-dom";

const NotFound = ({ reason }) => {
  const navigate = useNavigate();

  const GoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found">
      <h1>{reason}</h1>
      <button onClick={GoBack}>Click Me To Go Back</button>
    </div>
  );
};

export default NotFound;
