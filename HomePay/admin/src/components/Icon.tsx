/* eslint-disable react/no-danger */
/* eslint-disable react/void-dom-elements-no-children */
import React from "react";

const Icon = (ico: string, size = 50, className = "tx-gray-500", color?: string) => {
  return (
    <svg
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-${ico} wd-${size} ht-${size} ${className}`}
      color={color}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: `<use xlink:href="/assets/feather-sprite.svg#${ico}"/>` }}
    />
  );
};

export const IsSVG = (ico: string) => {
  if (ico.indexOf("png") > -1 || ico.indexOf("gif") > -1 || ico.indexOf("jpg") > -1) {
    return <img className="nav-item-ico" dangerouslySetInnerHTML={{ __html: ico }} alt="icon" />;
  }
  return Icon(ico, 24, "");
};

export default Icon;
