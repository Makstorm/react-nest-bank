import { FC, PropsWithChildren } from "react";
import "./index.scss";

const SectioTitle: FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="section-title">{children}</h3>;
};

export default SectioTitle;
