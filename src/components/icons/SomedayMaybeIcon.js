import React from "react";
import styled from "styled-components";

export default function SomedayMaybeIcon(props) {
  return (
    <svg
      className={props.className}
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <defs>
        <path d="M0 0h24v24H0V0z" id="a" />
      </defs>
      <clipPath id="b">
        <use overflow="visible" xlinkHref="#a" />
      </clipPath>
      <path
        clipPath="url(#b)"
        d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.2 14.2L11 13V7h1.5v5.2l4.5 2.7-.8 1.3z"
      />
    </svg>
  );
}
