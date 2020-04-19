import React from 'react';


class AuthorList extends React.Component {

     constructor(props) {
          super(props);

          this.state = {

            };

     }

     // removeDuplicates(array) {
     //   return array.filter((a, b) => array.indexOf(a) === b)
     // };

     removeDuplicates(array) {
  array.splice(0, array.length, ...(new Set(array)))
};

     render() {

          const books = this.props.books;
          const rawAuthors = books.map((book, index) => ( book.authors )).flat();
          const removeDupAuthors = this.removeDuplicates(rawAuthors);
          console.log(rawAuthors);

          return(
               <>
               <h2>AuthorList</h2>
               <ul>
                    { rawAuthors.map((author,index) => ( <li>{author}</li> ) ) }
               </ul>
               </>
          );

     }

}

export default AuthorList;
