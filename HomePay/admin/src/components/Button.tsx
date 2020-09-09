import React, { useState, useEffect } from "react";

type Props = {
  text: string;
  callback: any;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  wait?: boolean;
};

const Button: React.FC<Props> = ({ callback, text = null, className = "", visible = true, disabled = false, wait = false, ...restProps }) => {
  const [showComponent, setShowComponent] = useState(visible);
  const [disabledComponent, setDisabledComponent] = useState(disabled);
  const [waitComponent, setWaitComponent] = useState(wait);

  useEffect(() => {
    setShowComponent(visible);
    setDisabledComponent(disabled);
    setWaitComponent(wait);
  }, [visible, disabled, wait]);

  return (
    <button {...restProps} type="submit" className={showComponent ? className : "hidden"} disabled={disabledComponent || waitComponent} onClick={() => callback}>
      {waitComponent ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span className="visible-xs visible-sm"> Processando...</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default Button;
