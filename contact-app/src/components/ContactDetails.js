import React from "react";
import user from "../images/user.jpg";
import { Link, useParams } from "react-router-dom";

const ContactDetails = ({ contacts }) => {
    const { id } = useParams(); // Extracting id from the URL parameters
    const contact = contacts.find((contact) => contact.id === id); // Finding the contact by ID

    if (!contact) {
        return <div>Contact not found</div>; // Optional: Handling the case where the contact doesn't exist
    }

    const { name, email, phone, address } = contact; // Destructuring the contact data

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email} | {phone} | {address}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">
                        Back To Contact List
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetails;
