import {} from "react";
import "./index.scss";

import { useNavigate } from "react-router-dom";
import { RECIEVE_ROUTE, SEND_ROUTE } from "../../AppRouter/consts";

const ReceiveSend = () => {
  const navigate = useNavigate();

  return (
    <div className="balance-change">
      <div className="balance-change__action">
        <img
          className="balance__button"
          src="/balance/arrow-down-right.svg"
          height={28}
          alt="receive"
          onClick={() => navigate(RECIEVE_ROUTE)}
        />
        <p className="action__text">Receive</p>
      </div>
      <div className="balance-change__action">
        <img
          className="balance__button"
          src="/balance/people-upload.svg"
          height={28}
          alt="receive"
          onClick={() => navigate(SEND_ROUTE)}
        />
        <p className="action__text">Send</p>
      </div>
    </div>
  );
};

export default ReceiveSend;
