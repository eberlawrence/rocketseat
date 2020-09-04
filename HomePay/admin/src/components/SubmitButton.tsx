import React, { useState, useEffect, ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  visible?: boolean;
  disabled?: boolean;
  wait?: boolean;
}

const SubmitButton: React.FC<Props> = ({ text = null, className = "", visible = true, disabled = false, wait = false, ...restProps }) => {
  // const { text = null, className = null, visible = true, disabled = false, wait = false, ...restProps } = props;

  const [showComponent, setShowComponent] = useState(visible);
  const [disabledComponent, setDisabledComponent] = useState(disabled);
  const [waitComponent, setWaitComponent] = useState(wait);

  useEffect(() => {
    setShowComponent(visible);
    setDisabledComponent(disabled);
    setWaitComponent(wait);
  }, [visible, disabled, wait]);

  return (
    <button {...restProps} type="submit" className={showComponent ? className : "hidden"} disabled={disabledComponent || waitComponent}>
      {waitComponent ? (
        <>
          <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
          <span className="visible-xs visible-sm"> Aguarde...</span>
        </>
      ) : (
        text
      )}
    </button>
  );
};

export default SubmitButton;
