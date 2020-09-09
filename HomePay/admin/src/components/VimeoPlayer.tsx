/* eslint-disable no-console */
import React, { useRef, useEffect, HTMLAttributes } from "react";
import Player from "@vimeo/player";
import { v4 as uuid } from "uuid";

interface Props extends HTMLAttributes<HTMLIFrameElement> {
  allow?: string;
  allowFullScreen?: boolean;
  allowTransparency?: boolean;
  frameBorder?: number | string;
  height?: number | string;
  marginHeight?: number;
  marginWidth?: number;
  name?: string;
  sandbox?: string;
  scrolling?: string;
  seamless?: boolean;
  src?: string;
  srcDoc?: string;
  width?: number | string;
  onEnded?: any;
  onStart?: any;
}

const VimeoPlayer: React.FC<Props> = ({ onEnded, onStart, ...attrs }) => {
  const frameRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const player = new Player(frameRef.current!);
    if (onStart) player.on("play", () => onStart);
    if (onEnded) player.on("ended", () => onEnded);
  }, [onEnded, onStart]);

  return <iframe title={uuid()} ref={frameRef} {...attrs} />;
};

export default VimeoPlayer;
