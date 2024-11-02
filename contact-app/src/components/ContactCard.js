import React from "react";
import user from '../images/user.png';
import { Link } from "react-router-dom";

const ContactCard=(props)=>{
    const {id, name, email, phone, address}=props.contact;

    return(
        <div className="item">
        <img className="ui avatar image" src={user} alt="user"/> 
        <div className="content">
          <Link to={{pathname:`/contact/${id}`, 
            state:{contact:props.contact}}}>
            <div className="header">{name}</div>
            <div>{email}</div>
            <div>{phone}</div>
            <div>{address}</div>
          </Link>
        </div>
        <i className="trash alternate outline icon"
         style={{color:"red",marginTop:"7px", marginLeft:"10px", float:'right'}}
         onClick={()=>props.clickHandler(id)}
         ></i>
         <Link to={{pathname:`/edit/${props.contact.id}`}}>
         
          <i className="edit alternate outline icon"
          style={{color:"blue",marginTop:"7px" ,float:'right'}}
          
          ></i>
         </Link>
    </div>
    );
}
export default ContactCard;