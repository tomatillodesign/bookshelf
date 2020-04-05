import React from "react";

const Label = (props) => (
  <label htmlFor={props.name}>{props.children}</label>
);

export default Label;
