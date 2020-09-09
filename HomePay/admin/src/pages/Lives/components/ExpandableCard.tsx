/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from "react";
import Icon from "components/Icon";

interface Props {
  icon: string;
  subject: string;
  level: string;
  name: string;
  isLive: boolean;
}

const ExpandableCard: React.FC<Props> = ({ isLive, icon, subject, level, name, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [setActive, setActiveState] = useState("");
  const [setHeight, setHeightState] = useState("0px");

  function toggleAccordion() {
    setHeightState(setActive === "actived" ? "0px" : `1000px`);
    setActiveState(setActive === "" ? "actived" : "");
    setIsOpen(!isOpen);
  }

  return (
    <div className="accordion__section mb-1">
      <li className={`list-group-item d-flex align-items-center accordion ${setActive}`} onClick={toggleAccordion}>
        <img src={icon} className="wd-30 rounded-circle mg-r-15" alt="" />
        <div>
          <h6 className="tx-18 tx-inverse tx-semibold mg-b-0">{name}</h6>
          <span className="d-block tx-11 text-muted">
            {level} {subject}
          </span>
        </div>
        {isLive && <div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>{Icon("video", 24, "blink", "red")}</div>}
      </li>
      <div style={{ maxHeight: `${setHeight}` }} className="accordion__content">
        {isOpen === true && <div className="accordion__text">{children}</div>}
      </div>
    </div>
  );
};

export default ExpandableCard;
