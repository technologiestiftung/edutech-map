import React from "react";
import styled from "styled-components";

const Icon = p => {
  const { isHomeschool, color } = p;
  return (
    <>
      {isHomeschool && (
        <svg width="20px" height="20px" viewBox="0 0 20 20">
          <g id="edutech-service" fill={color}>
            <circle
              id="Oval-Copy-34"
              opacity="0.200000003"
              cx="10"
              cy="10"
              r="10"
            ></circle>
            <polygon
              id="Star-Copy-7"
              points="10 13.3333333 6.08143165 15.3934466 6.82981161 11.0300566 3.65962322 7.9398867 8.04071583 7.30327669 10 3.33333333 11.9592842 7.30327669 16.3403768 7.9398867 13.1701884 11.0300566 13.9185683 15.3934466"
            ></polygon>
          </g>
        </svg>
      )}
      {!isHomeschool && (
        <svg width="20px" height="20px" viewBox="0 0 20 20">
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g id="Group-16" fill={color}>
              <circle id="Oval-Copy-34" cx="10" cy="10" r="5"></circle>
              <circle
                id="Oval-Copy-34"
                opacity="0.200000003"
                cx="10"
                cy="10"
                r="10"
              ></circle>
            </g>
          </g>
        </svg>
      )}
    </>
  );
};

export default Icon;
