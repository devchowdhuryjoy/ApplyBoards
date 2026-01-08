

import { useParams } from "react-router-dom";

const AgentFinalApply = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Agent Final Apply Page</h2>
      <p>Received ID: {id}</p>
    </div>
  );
};

export default AgentFinalApply;

