//import 'date-fns';
import React from 'react';
//import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

export default function ReadDate(props) {

// The first commit of Material-UI
const [selectedDate, setSelectedDate] = React.useState(new Date());

const handleDateChange = date => {
     console.log(date.currentTarget.value);
     setSelectedDate(date.currentTarget.value);
     props.getCompletedDate(date.currentTarget.value);

};


const bookshelfTimestamp = new Date(props.bookshelfTimestamp);
const formattedDate = bookshelfTimestamp.toISOString().slice(0,10);
console.log(formattedDate);

return (
     <TextField
         id="date"
         required
         label="Date Completed"
         type="date"
         defaultValue={formattedDate}
         className="book-date-field"
         InputLabelProps={{
           shrink: true,
         }}
         onChange={handleDateChange}
  />
);

}
