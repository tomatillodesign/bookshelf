import React, { Fragment, useState } from "react";
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";

function BookDate(props) {

     const [selectedDate, handleDateChange] = useState(new Date());


  return (
    <>
    <KeyboardDatePicker
        clearable
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        disableFuture
        format={"MM/DD/YYYY"}
     />
    </>
  );
}

export default BookDate;
