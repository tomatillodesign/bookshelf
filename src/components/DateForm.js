import React, { Component } from 'react';
import NewDatePicker from './NewDatePicker';


class DateForm extends React.Component {

     constructor(props) {
          super(props);
          this.state = {
               madeChange: false,
            };
     }

     handleChange = (event) => {
          event.preventDefault();
          console.log("HANDLE DATE CHANGE");
     }

     handleDateSubmit = (event) => {
          event.preventDefault();
          console.log("HANDLE DATE SUBMIT");

     }

     render() {

               return (
                    <form id="new-date-form" onSubmit={this.handleDateSubmit} >
                      <NewDatePicker />
                      {this.state.madeChange === true &&
                           <button className="add-tags">Update Tags</button>
                      }
                    </form>
               );

          }

}

export default DateForm;
