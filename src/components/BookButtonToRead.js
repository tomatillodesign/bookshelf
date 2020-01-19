import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBooksMedical } from '@fortawesome/pro-solid-svg-icons';
import { faBookAlt } from '@fortawesome/pro-light-svg-icons';

const BookButtonToRead = (props) => (
     <button className="read-action to-read" title="Add to your To Read shelf"><FontAwesomeIcon icon={faBookAlt} /></button>
)

export default BookButtonToRead;
