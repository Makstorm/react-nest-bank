import { FC, useEffect } from "react";
import "./index.scss";
import Skeleton from "react-loading-skeleton";
import { userAPI } from "../../../store/services/UserService";

const Balance: FC = () => {
  const { data, isLoading, refetch } = userAPI.useFetchUserDataQuery("");

  useEffect(() => {
    refetch();
    // Refetch data when the component mounts or when the page gains focus
    const onFocus = () => {
      refetch();
    };

    const intervalId = setInterval(() => refetch(), 10000);

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
      clearInterval(intervalId);
    };
  }, [refetch]);

  return (
    <p className="balance">
      {isLoading && <Skeleton height={34} width={20} />}
      {`$ ${data?.balance}`}
    </p>
  );
};

export default Balance;
