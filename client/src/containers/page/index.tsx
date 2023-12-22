import React, { FC, PropsWithChildren } from "react";
import style from "./index.module.css";

const Page: FC<PropsWithChildren> = ({ children }) => {
  return <div className={style.page}>{children}</div>;
};

export default Page;
