import React, { Component } from 'react';
import Select from 'react-select';

class SelectUseGenres extends React.Component {

     constructor(props) {
          super(props);

     }


     setUseGenres = (selectedOption) => {
          if(selectedOption) {
               this.props.changeSettingsUseGenres(selectedOption);
          }

     }



     render() {

          const settingsUseGenres = this.props.useGenres;
          console.log(settingsUseGenres);

               var myGenreSettingsToPublish = null;
               if( settingsUseGenres === true ) { myGenreSettingsToPublish = 'Yes'; }
               if( settingsUseGenres === false ) { myGenreSettingsToPublish = 'No'; }

          let defaultUseGenres = {
               value: settingsUseGenres,
               label: myGenreSettingsToPublish
          };
          if( settingsUseGenres === null ) {
               defaultUseGenres = null;
          }

          const useGenres = [
               { value: true, label: 'Yes' },
               { value: false, label: 'No' },
          ];

          if( defaultUseGenres ) {

               return (
                 <Select
                    placeholder='Select One'
                    options={useGenres}
                    defaultValue={defaultUseGenres}
                    isSearchable
                    onChange={this.setUseGenres}
                 />
               );

          } else {

               return (
                 <Select
                    placeholder='Select One'
                    options={useGenres}
                    isSearchable
                    onChange={this.setUseGenres}
                 />
               );

          }

     }

}

export default SelectUseGenres;
