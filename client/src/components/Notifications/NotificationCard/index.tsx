import { FC } from "react";
import "./index.scss";

interface INotificationCardProp {
  danger: boolean;
  name: string;
  description?: string;
}

const NotificationCard: FC<INotificationCardProp> = ({
  danger,
  name,
  description,
}) => {
  const getImage = () => {
    switch (danger) {
      case false: {
        return "/notifications/bell-ringing.svg";
        break;
      }

      case true: {
        return "/notifications/danger.svg";
        break;
      }

      default: {
        return "/notifications/bell-ringing.svg";
      }
    }
  };

  return (
    <div className="notification-card">
      <div className="notification-card__title">
        <div className="circle">
          <img src={getImage()} alt="transaction_icon" />
        </div>
        <div className="text">
          <h4 className="text__name">{name}</h4>
          <p className="text__time-type">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
