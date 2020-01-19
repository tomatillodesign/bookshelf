import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBooksMedical } from '@fortawesome/pro-solid-svg-icons';

const BookButtonToRead = (props) => (
     <button className="read-action to-read" title="Add to your To Read shelf"><FontAwesomeIcon icon={faBooksMedical} /></button>
)

export default BookButtonToRead;
