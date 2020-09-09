import React, { useState, useEffect, ButtonHTMLAttributes } from "react";
import { Link } from "react-router-dom";

interface Props extends ButtonHTMLAttributes<HTMLAnchorElement> {
  text: string;
  callback?: any;
  to: string;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  wait?: boolean;
}

const Redirect: React.FC<Props> = ({ callback, to, text = null, className = "", visible = true, disabled = false, wait = false, ...restProps }) => {
  const [showComponent, setShowComponent] = useState(visible);
  const [, setDisabledComponent] = useState(disabled);
  const [waitComponent, setWaitComponent] = useState(wait);

  useEffect(() => {
    setShowComponent(visible);
    setDisabledComponent(disabled);
    setWaitComponent(wait);
  }, [visible, disabled, wait]);

  return (
    <Link to={to} {...restProps} type="submit" className={showComponent ? className : "hidden"} onClick={() => callback}>
      {waitComponent ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span className="visible-xs visible-sm"> Aguarde...</span>
        </>
      ) : (
        text
      )}
    </Link>
  );
};

export default Redirect;
