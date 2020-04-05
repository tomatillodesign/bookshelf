import React, { Component } from 'react';
import DatePicker from 'react-date-picker';

class NewDatePicker extends Component {
  state = {
    date: new Date(),
    madeChange: false,
  }

  onChange = date => {
       this.setState({
            date,
            madeChange: true
       });
 }

 handleDateSubmit = (event) => {
      event.preventDefault();
      console.log("HANDLE DATE SUBMIT");
      console.log(this.state.date);
      const newDateTimestamp = Date.parse(this.state.date);
      console.log(newDateTimestamp);

      this.setState({
           madeChange: false
      });

      this.props.setBookTimestamp(newDateTimestamp, this.props.book);
}

  render() {
    return (
      <div>
      <form id="new-date-form" onSubmit={this.handleDateSubmit} >
        <DatePicker
          locale={"en-US"}
          maxDate={new Date()}
          required
          onChange={this.onChange}
          value={this.state.date}
        />
        {this.state.madeChange === true &&
             <button className="save-date">Save Date</button>
        }
        </form>
      </div>
    );
  }
}

export default NewDatePicker;
