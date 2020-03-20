import React, { Component } from 'react';
import Select from 'react-select';

class SelectRating extends React.Component {

     constructor(props) {
          super(props);

     }



     render() {

          const defaultRating = this.props.defaultRating;
          console.log(defaultRating);

               var myRatingToPublish = null;
               if( defaultRating === '5' ) { myRatingToPublish = '⭐⭐⭐⭐⭐ Life-Changing'; }
               if( defaultRating === '4' ) { myRatingToPublish = '⭐⭐⭐⭐ Great'; }
               if( defaultRating === '3' ) { myRatingToPublish = '⭐⭐⭐ Good'; }
               if( defaultRating === '2' ) { myRatingToPublish = '⭐⭐ OK'; }
               if( defaultRating === '1' ) { myRatingToPublish = "⭐ Bad / Didn't Finish"; }

          let defaultRatingPublish = {
               value: defaultRating,
               label: myRatingToPublish
          };
          if( defaultRating === null ) { defaultRatingPublish = null; }
          //console.log(defaultRating);

          const ratingOptions = [
               { value: '5', label: '⭐⭐⭐⭐⭐ Life-Changing' },
               { value: '4', label: '⭐⭐⭐⭐ Great' },
               { value: '3', label: '⭐⭐⭐ Good' },
               { value: '2', label: '⭐⭐ OK' },
               { value: '1', label: "⭐ Bad / Didn't Finish" }
          ];

          if( defaultRating ) {

               return (
                 <Select
                    placeholder='Set Rating'
                    options={ratingOptions}
                    defaultValue={defaultRatingPublish}
                    isClearable
                    isSearchable
                    onChange={this.props.setRating}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Set Rating'
                    options={ratingOptions}
                    isClearable
                    isSearchable
                    onChange={this.props.setRating}
                 />
               );

          }

     }

}

export default SelectRating;
