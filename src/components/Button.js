import React from "react";
import classNames from "classnames";
import "components/Button.scss";

export default function Button(props) {

   //CREATES BUTTON STYLES DEPENDING ON THE ACTION
   const buttonClass = classNames('button', {
      ' button--confirm': props.confirm,
      ' button--danger': props.danger
   });
 
   return (
      <button 
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
      >
         {props.children}
      </button>
   );
};