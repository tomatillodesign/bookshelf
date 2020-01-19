import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBooksMedical } from '@fortawesome/pro-light-svg-icons';

const BookButtonAlreadRead = (props) => (
     <button className="read-action already-read" title="Add to your Already Read shelf"><FontAwesomeIcon icon={faBooksMedical} /></button>
)

export default BookButtonAlreadRead;
