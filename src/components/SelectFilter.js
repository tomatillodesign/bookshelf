import React, { Component } from 'react';
import Select from 'react-select';

class SelectFilter extends React.Component {

     constructor(props) {
          super(props);

     }


     setFilter = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               //this.props.changeAlreadyReadView(selectedOption);
          }

     }


     selectGenre = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setGenreFilter(selectedOption.value);
          } else {
               this.props.clearGenreFilter();
          }

     }


     selectTag = (selectedOption) => {
          if(selectedOption) {
               console.log(selectedOption);
               this.props.setTagFilter(selectedOption.value);
          } else {
               this.props.clearTagFilter();
          }

     }



     removeDuplicates(array) {
       return array.filter((a, b) => array.indexOf(a) === b)
     };


     render() {

          const books = this.props.books;

          // create empty variables
          let filterOptions = [];
          let placeholder = '';

          // set vars based on props //////////////////////////////////////////
          // RATING selections //////////////
          if( this.props.type === 'rating' ) {
               placeholder = 'Rating';
               filterOptions = [
                    { value: '5', label: '⭐⭐⭐⭐⭐ Life-Changing' },
                    { value: '4', label: '⭐⭐⭐⭐ Great and higher' },
                    { value: '3', label: '⭐⭐⭐ Good and higher' },
                    { value: '2', label: '⭐⭐ OK and higher' },
               ]


               return (
                 <Select
                    placeholder={placeholder}
                    options={filterOptions}
                    isClearable
                    isSearchable
                    onChange={this.setFilter}
                 />
               );


          }


          // GENRE selections //////////////
          if( this.props.type === 'genres' ) {

               const genresRaw = books.map(book => book.genre);
               let genres = genresRaw.filter(Boolean);
               genres = this.removeDuplicates(genres);
               genres.sort();

               let filterOptions = [];
               for( let i = 0; i < genres.length; i++ ) {
                    filterOptions.push({ value: genres[i], label: genres[i] });
               }

               placeholder = 'Genre';

               return (
                 <Select
                    placeholder={placeholder}
                    options={filterOptions}
                    isClearable
                    isSearchable
                    onChange={this.selectGenre}
                 />
               );

          }


          // TAGS selections //////////////
          if( this.props.type === 'tags' ) {
               placeholder = 'Tag';

               const tagsRaw = books.map(book => book.tags);
               let tags = tagsRaw.filter(Boolean).flat();

               tags = this.removeDuplicates(tags);
               console.log(tags);
               tags.sort((a, b) => a.toString().localeCompare(b, 'fr', {ignorePunctuation: true}));

               let filterOptions = [];
               for( let i = 0; i < tags.length; i++ ) {
                    filterOptions.push({ value: tags[i], label: tags[i] });
               }

               placeholder = 'Tags';

               return (
                 <Select
                    placeholder={placeholder}
                    options={filterOptions}
                    isClearable
                    isSearchable
                    onChange={this.selectTag}
                 />
               );

          }



     }

}

export default SelectFilter;
