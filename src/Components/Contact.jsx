import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCircleUser, faTrash , faEnvelope } from '@fortawesome/free-solid-svg-icons'
import "./Contact.css";


export default function contact(props) {
    return (

        <div className="scale-up-hor-center container componente-contact my-4" >
            <div className="row justify-content-center ">
                <div className="col p-2">  <h5> <FontAwesomeIcon icon={faCircleUser} className = "me-3" /> {props.name} </h5></div>
                <div className="col p-2"><h5> <FontAwesomeIcon icon={faEnvelope} className = "me-3"  /> {props.email} </h5> </div>
                <div className="col p-2 text-end">
                    <h4>
                <FontAwesomeIcon 
                icon={faTrash} 
                className = "me-3 text-danger"  
                onClick={() => props.remove(props.id)}
                />
                </h4>
             

            </div>
            </div>
        </div>



    )

}