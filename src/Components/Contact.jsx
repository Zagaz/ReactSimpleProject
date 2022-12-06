import React from "react";

export default function Contact(props) {
  return (
    <div>
      {props.name} - {props.telephone}
      <button onClick={()=>{ props.remove(props.id)}}> Remove </button>
    </div>
  );
}
