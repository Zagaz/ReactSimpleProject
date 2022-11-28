import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhoneVolume, faUser , faTrash } from '@fortawesome/free-solid-svg-icons'
import "./contact.css";


export default function contact(props) {
    return (

        <div className="container componente-contact my-4" >
            <div className="row">
                <div className="col p-2">  <h5> <FontAwesomeIcon icon={faUser} className = "me-3" /> {props.name} </h5></div>
                <div className="col p-2"><h5> <FontAwesomeIcon icon={faPhoneVolume} className = "me-3"  /> {props.telephone} </h5> </div>
                <div className="col p-2 text-end">
                    <h4>
                <FontAwesomeIcon 
                icon={faTrash} 
                className = "me-3 text-danger"  
                onClick={() => props.remover(props.id)}
                />
                </h4>
             

            </div>
            </div>
        </div>



    )

}