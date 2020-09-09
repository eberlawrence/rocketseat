import React from "react";
import { Link } from "react-router-dom";

type BreadcrumbItens = {
  link?: string;
  text: string;
};

type Props = {
  breadcrumb: Array<BreadcrumbItens>;
  title: string;
  description?: string;
};

const Breadcrumb: React.FC<Props> = (props) => {
  const { breadcrumb, title, description, children } = props;
  return (
    <>
      <div className="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
        <div>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb breadcrumb-style1 mg-b-10">
              {breadcrumb.map((item, key) => (
                <li key={item.text} className={`breadcrumb-item ${key === breadcrumb.length && "active"}`}>
                  <Link to={item.link ?? "#"}>{item.text}</Link>
                </li>
              ))}
            </ol>
          </nav>
          <h4 className="mg-b-0 tx-spacing--1">{title}</h4>
          {description && (
            <p className="df-lead" style={{ fontSize: "1rem" }}>
              {description}
            </p>
          )}
        </div>
        {children}
      </div>
    </>
  );
};

export default Breadcrumb;
