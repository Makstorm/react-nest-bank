import React, { FC } from "react";

import "./index.scss";

interface IPageInfoTitle {
  title: string;
  subtitle: string;
}

const PageInfoTitle: FC<IPageInfoTitle> = ({ title, subtitle }) => {
  return (
    <div className="page-info">
      <h1 className="page-info__title">{title}</h1>
      <p className="page-info__subtitle">{subtitle}</p>
    </div>
  );
};

export default PageInfoTitle;
